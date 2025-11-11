import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import flyerTemplate from '@/assets/venueflyer-template.png';

interface FlyerDownloadCardProps {
  caseId: string;
  title: string;
}

const FlyerDownloadCard = ({ caseId, title }: FlyerDownloadCardProps) => {
  const { t } = useTranslation('vacationRentalDashboard');
  const [flyerDataUrl, setFlyerDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);

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
        const qrSize = 180;
        const padding = 30;
        const qrX = padding;
        const qrY = padding;

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
            
            <button
              onClick={handleDownload}
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
              disabled={!flyerDataUrl}
            >
              <Download size={20} />
              {t('promotionTab.downloadFlyer')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FlyerDownloadCard;
