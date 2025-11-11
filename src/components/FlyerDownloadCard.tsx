import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useTranslation } from 'react-i18next';
import { Download, Printer } from 'lucide-react';
import flyerTemplate from '@/assets/venueflyer-template.png';

interface FlyerDownloadCardProps {
  caseId: string;
  title: string;
}

const FlyerDownloadCard = ({ caseId, title }: FlyerDownloadCardProps) => {
  const { t } = useTranslation('vacationRentalDashboard');
  const [flyerDataUrl, setFlyerDataUrl] = useState<string>('');
  const [printTemplateDataUrl, setPrintTemplateDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [isGeneratingPrint, setIsGeneratingPrint] = useState(false);

  useEffect(() => {
    const generateFlyer = async () => {
      try {
        setIsGenerating(true);
        
        // Generate case URL
        const caseUrl = `${window.location.origin}/case/${caseId}`;
        
        // Generate QR code with transparent background
        const qrCodeDataUrl = await QRCode.toDataURL(caseUrl, {
          width: 200,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#00000000' // Transparent background
          }
        });

        // Load flyer template image
        const templateImg = new Image();
        templateImg.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          templateImg.onload = resolve;
          templateImg.onerror = reject;
          templateImg.src = flyerTemplate;
        });

        // Create canvas with template dimensions
        const canvas = document.createElement('canvas');
        canvas.width = templateImg.width;
        canvas.height = templateImg.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        // Draw template image
        ctx.drawImage(templateImg, 0, 0);

        // Load and draw QR code on top-left
        const qrImg = new Image();
        await new Promise((resolve, reject) => {
          qrImg.onload = resolve;
          qrImg.onerror = reject;
          qrImg.src = qrCodeDataUrl;
        });

        // Position QR code in top-left corner
        const qrSize = 150;
        const qrX = 20;
        const qrY = 20;

        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

        // Convert canvas to data URL
        const finalDataUrl = canvas.toDataURL('image/png', 1.0);
        setFlyerDataUrl(finalDataUrl);
        setIsGenerating(false);
      } catch (error) {
        console.error('Error generating flyer:', error);
        setIsGenerating(false);
      }
    };

    generateFlyer();
  }, [caseId]);

  const generatePrintTemplate = async () => {
    if (!flyerDataUrl) return;

    try {
      setIsGeneratingPrint(true);

      // A4 dimensions at 300 DPI
      const A4_WIDTH_MM = 210;
      const A4_HEIGHT_MM = 297;
      const DPI = 300;
      const MM_TO_INCH = 0.0393701;

      const A4_WIDTH_PX = Math.round(A4_WIDTH_MM * MM_TO_INCH * DPI); // 2480 px
      const A4_HEIGHT_PX = Math.round(A4_HEIGHT_MM * MM_TO_INCH * DPI); // 3508 px
      const FLYER_SECTION_HEIGHT = A4_HEIGHT_PX / 5; // 701 px per flyer

      // Create canvas with A4 dimensions
      const canvas = document.createElement('canvas');
      canvas.width = A4_WIDTH_PX;
      canvas.height = A4_HEIGHT_PX;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Fill with white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, A4_WIDTH_PX, A4_HEIGHT_PX);

      // Load flyer image
      const flyerImg = new Image();
      await new Promise((resolve, reject) => {
        flyerImg.onload = resolve;
        flyerImg.onerror = reject;
        flyerImg.src = flyerDataUrl;
      });

      // Calculate aspect ratio
      const flyerAspectRatio = flyerImg.height / flyerImg.width;
      const scaledHeight = A4_WIDTH_PX * flyerAspectRatio;

      // Draw 5 flyers
      for (let i = 0; i < 5; i++) {
        const yOffset = i * FLYER_SECTION_HEIGHT;
        
        // Center vertically within section if needed
        const yPosition = yOffset + (FLYER_SECTION_HEIGHT - scaledHeight) / 2;
        
        // Draw flyer scaled to full width
        ctx.drawImage(flyerImg, 0, yPosition, A4_WIDTH_PX, scaledHeight);

        // Draw dashed cut line (except after last flyer)
        if (i < 4) {
          ctx.setLineDash([10, 5]);
          ctx.strokeStyle = '#CCCCCC';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, yOffset + FLYER_SECTION_HEIGHT);
          ctx.lineTo(A4_WIDTH_PX, yOffset + FLYER_SECTION_HEIGHT);
          ctx.stroke();
          ctx.setLineDash([]); // Reset line dash
        }
      }

      // Convert to data URL
      const printDataUrl = canvas.toDataURL('image/png', 1.0);
      setPrintTemplateDataUrl(printDataUrl);
      setIsGeneratingPrint(false);

      // Auto-download
      const link = document.createElement('a');
      link.href = printDataUrl;
      link.download = `print-template-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating print template:', error);
      setIsGeneratingPrint(false);
    }
  };

  const handleDownload = () => {
    if (!flyerDataUrl) return;

    const link = document.createElement('a');
    link.href = flyerDataUrl;
    link.download = `flyer-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">{title}</h5>
        <p className="text-muted mb-3">
          {t('promotionTab.flyerDescription')}
        </p>
        
        {isGenerating ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">{t('promotionTab.flyerPreview')}...</p>
          </div>
        ) : (
          <>
            {flyerDataUrl && (
              <div className="mb-3">
                <img 
                  src={flyerDataUrl} 
                  alt={`${title} Flyer`}
                  className="img-fluid rounded border"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            )}
            
            <div className="d-flex flex-column gap-2">
              <button
                onClick={handleDownload}
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                disabled={!flyerDataUrl}
              >
                <Download size={20} />
                {t('promotionTab.downloadFlyer')}
              </button>
              
              <button
                onClick={generatePrintTemplate}
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                disabled={!flyerDataUrl || isGeneratingPrint}
              >
                <Printer size={20} />
                {isGeneratingPrint ? t('loading') : t('promotionTab.downloadPrintTemplate')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FlyerDownloadCard;
