import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

interface QRCodeCardProps {
  caseId: string;
  title: string;
}

const QRCodeCard = ({ caseId, title }: QRCodeCardProps) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const caseUrl = `https://detectivesgame.com/case/${caseId}`;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(caseUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [caseUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `QR_${title.replace(/[^a-z0-9]/gi, '_')}_${caseId}.png`;
    link.href = qrCodeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card border-secondary h-100">
      <div className="card-body d-flex flex-column text-center">
        <h5 className="card-title mb-3">{title}</h5>

        {qrCodeDataUrl && (
          <div className="flex-grow-1 d-flex align-items-center justify-content-center mb-3">
            <div className="p-3 rounded">
              <img
                src={qrCodeDataUrl}
                alt={`QR Code for ${title}`}
                className="img-fluid"
                style={{ maxWidth: '200px' }}
              />
            </div>
          </div>
        )}

        <div className="mt-auto">
          <p className="text-muted small mb-3">
            Scan to access case directly
          </p>
          <button
            onClick={handleDownload}
            className="btn btn-danger btn-sm w-100"
            disabled={!qrCodeDataUrl}
          >
            <i className="bi bi-download me-2"></i>
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeCard;