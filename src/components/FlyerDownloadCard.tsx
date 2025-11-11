import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useTranslation } from 'react-i18next';
import { Download, Printer } from 'lucide-react';
import flyerTemplate from '@/assets/venueflyer-template.png';

interface FlyerDownloadCardProps {
  caseId: string;
  title: string;
}

type ColorVariant = 'original' | 'accent' | 'teal' | 'purple' | 'green' | 'pink' | 'navy' | 'gold';

const FlyerDownloadCard = ({ caseId, title }: FlyerDownloadCardProps) => {
  const { t } = useTranslation('vacationRentalDashboard');
  const [colorVariant, setColorVariant] = useState<ColorVariant>('original');
  const [flyerDataUrl, setFlyerDataUrl] = useState<string>('');
  const [printTemplateDataUrl, setPrintTemplateDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [isGeneratingPrint, setIsGeneratingPrint] = useState(false);

  // Helper functions for color conversion
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return { h: h * 360, s, l };
  };

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const applyColorFilter = (imageData: ImageData, targetColor: ColorVariant): ImageData => {
    if (targetColor === 'original') return imageData;

    const data = imageData.data;
    
    // Target colors
    const targetColors = {
      accent: { r: 220, g: 53, b: 69 }, // #dc3545 - Red
      teal: { r: 13, g: 202, b: 240 }, // #0dcaf0 - Cyan/Teal
      purple: { r: 130, g: 59, b: 216 }, // #823bd8 - Purple
      green: { r: 25, g: 135, b: 84 }, // #198754 - Green
      pink: { r: 214, g: 51, b: 132 }, // #d63384 - Pink
      navy: { r: 13, g: 110, b: 253 }, // #0d6efd - Navy Blue
      gold: { r: 255, g: 193, b: 7 }, // #ffc107 - Gold/Yellow
    };

    const target = targetColors[targetColor];
    const targetHsl = rgbToHsl(target.r, target.g, target.b);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const hsl = rgbToHsl(r, g, b);

      // Detect orange tones (Hue 20-40°, Saturation > 30%)
      if (hsl.h >= 20 && hsl.h <= 40 && hsl.s > 0.3) {
        // Replace with target color, preserving lightness and adjusting saturation
        const newRgb = hslToRgb(targetHsl.h, hsl.s, hsl.l);
        data[i] = newRgb.r;
        data[i + 1] = newRgb.g;
        data[i + 2] = newRgb.b;
      }
    }

    return imageData;
  };

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

        // Apply color filter if not original
        if (colorVariant !== 'original') {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const filteredImageData = applyColorFilter(imageData, colorVariant);
          ctx.putImageData(filteredImageData, 0, 0);
        }

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
  }, [caseId, colorVariant]);

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

        {/* Color Variant Selection */}
        <div className="mb-3">
          <label className="form-label fw-semibold">{t('promotionTab.colorVariant')}</label>
          <div className="d-grid gap-2" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
            <button
              type="button"
              onClick={() => setColorVariant('original')}
              className={`btn rounded-circle p-0 ${colorVariant === 'original' ? 'border-dark border-3' : 'border border-2'}`}
              style={{ 
                aspectRatio: '1',
                minWidth: '32px',
                backgroundColor: '#FF8C42',
                boxShadow: colorVariant === 'original' ? '0 0 0 2px white, 0 0 0 4px #212529' : 'none'
              }}
              title="Orange (Original)"
            />
            <button
              type="button"
              onClick={() => setColorVariant('accent')}
              className={`btn rounded-circle p-0 ${colorVariant === 'accent' ? 'border-dark border-3' : 'border border-2'}`}
              style={{ 
                aspectRatio: '1',
                minWidth: '32px',
                backgroundColor: '#dc3545',
                boxShadow: colorVariant === 'accent' ? '0 0 0 2px white, 0 0 0 4px #212529' : 'none'
              }}
              title="Red"
            />
            <button
              type="button"
              onClick={() => setColorVariant('teal')}
              className={`btn rounded-circle p-0 ${colorVariant === 'teal' ? 'border-dark border-3' : 'border border-2'}`}
              style={{ 
                aspectRatio: '1',
                minWidth: '32px',
                backgroundColor: '#0dcaf0',
                boxShadow: colorVariant === 'teal' ? '0 0 0 2px white, 0 0 0 4px #212529' : 'none'
              }}
              title="Teal"
            />
            <button
              type="button"
              onClick={() => setColorVariant('purple')}
              className={`btn rounded-circle p-0 ${colorVariant === 'purple' ? 'border-dark border-3' : 'border border-2'}`}
              style={{ 
                aspectRatio: '1',
                minWidth: '32px',
                backgroundColor: '#823bd8',
                boxShadow: colorVariant === 'purple' ? '0 0 0 2px white, 0 0 0 4px #212529' : 'none'
              }}
              title="Purple"
            />
            <button
              type="button"
              onClick={() => setColorVariant('green')}
              className={`btn rounded-circle p-0 ${colorVariant === 'green' ? 'border-dark border-3' : 'border border-2'}`}
              style={{ 
                aspectRatio: '1',
                minWidth: '32px',
                backgroundColor: '#198754',
                boxShadow: colorVariant === 'green' ? '0 0 0 2px white, 0 0 0 4px #212529' : 'none'
              }}
              title="Green"
            />
            <button
              type="button"
              onClick={() => setColorVariant('pink')}
              className={`btn rounded-circle p-0 ${colorVariant === 'pink' ? 'border-dark border-3' : 'border border-2'}`}
              style={{ 
                aspectRatio: '1',
                minWidth: '32px',
                backgroundColor: '#d63384',
                boxShadow: colorVariant === 'pink' ? '0 0 0 2px white, 0 0 0 4px #212529' : 'none'
              }}
              title="Pink"
            />
            <button
              type="button"
              onClick={() => setColorVariant('navy')}
              className={`btn rounded-circle p-0 ${colorVariant === 'navy' ? 'border-dark border-3' : 'border border-2'}`}
              style={{ 
                aspectRatio: '1',
                minWidth: '32px',
                backgroundColor: '#0d6efd',
                boxShadow: colorVariant === 'navy' ? '0 0 0 2px white, 0 0 0 4px #212529' : 'none'
              }}
              title="Navy Blue"
            />
            <button
              type="button"
              onClick={() => setColorVariant('gold')}
              className={`btn rounded-circle p-0 ${colorVariant === 'gold' ? 'border-dark border-3' : 'border border-2'}`}
              style={{ 
                aspectRatio: '1',
                minWidth: '32px',
                backgroundColor: '#ffc107',
                boxShadow: colorVariant === 'gold' ? '0 0 0 2px white, 0 0 0 4px #212529' : 'none'
              }}
              title="Gold"
            />
          </div>
        </div>
        
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
