import { Facebook, Twitter, Linkedin, Mail, Link2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SocialShareButtonsProps {
  url?: string;
}

const SocialShareButtons = ({ url = "https://detectivesgame.com" }: SocialShareButtonsProps) => {
  const { t } = useTranslation('caseDashboard');
  const [copied, setCopied] = useState(false);

  const shareText = t('share.text');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`,
    email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(url)}`
  };

  const buttonClass = "btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center gap-1 px-2 py-1";
  const iconSize = 16;

  return (
    <div className="mt-3">
      <p className="text-muted small mb-2">{t('share.title')}</p>
      <div className="d-flex justify-content-center gap-2 flex-wrap">
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          title="Facebook"
        >
          <Facebook size={iconSize} />
        </a>
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          title="Twitter/X"
        >
          <Twitter size={iconSize} />
        </a>
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          title="LinkedIn"
        >
          <Linkedin size={iconSize} />
        </a>
        <a
          href={shareUrls.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          title="WhatsApp"
        >
          <MessageCircle size={iconSize} />
        </a>
        <a
          href={shareUrls.email}
          className={buttonClass}
          title="Email"
        >
          <Mail size={iconSize} />
        </a>
        <button
          onClick={handleCopyLink}
          className={`${buttonClass} ${copied ? 'btn-success' : ''}`}
          title={copied ? t('share.copied') : t('share.copyLink')}
        >
          <Link2 size={iconSize} />
          {copied && <span className="small">{t('share.copied')}</span>}
        </button>
      </div>
    </div>
  );
};

export default SocialShareButtons;
