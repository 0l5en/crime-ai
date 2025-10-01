import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <footer className="bg-body py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <h5 className="mb-0 me-2">DetectivesGame</h5>
              <span className="badge bg-primary rounded-pill px-2 py-1" style={{ fontSize: '0.7rem' }}>
                BETA
              </span>
            </div>
            <p className="mb-3 mb-md-0 text-secondary" style={{ fontSize: '1.0rem' }}>
              {t('footer.description')}
            </p>
            <div className="d-flex gap-3 mb-3 mb-md-0">
              <a href="#" className="text-secondary" style={{ fontSize: '1.2rem' }}>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary" style={{ fontSize: '1.2rem' }}>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary" style={{ fontSize: '1.2rem' }}>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary" style={{ fontSize: '1.2rem' }}>
                <Github size={20} />
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-md-end">
              <div className="d-flex gap-4 mb-2 flex-wrap justify-content-center justify-content-md-end">
                <a href="/terms" className="text-secondary text-decoration-none" style={{ fontSize: '0.8rem' }}>
                  {t('footer.terms')}
                </a>
                <a href="/privacy" className="text-secondary text-decoration-none" style={{ fontSize: '0.8rem' }}>
                  {t('footer.privacy')}
                </a>
                <a href="/cookies" className="text-secondary text-decoration-none" style={{ fontSize: '0.8rem' }}>
                  {t('footer.cookies')}
                </a>
                <a href="/imprint" className="text-secondary text-decoration-none" style={{ fontSize: '0.8rem' }}>
                  {t('footer.imprint')}
                </a>
                <a href="#" className="text-secondary text-decoration-none" style={{ fontSize: '0.8rem' }}>
                  {t('footer.contact')}
                </a>
              </div>
              <p className="mb-0 text-secondary text-center text-md-end" style={{ fontSize: '0.7rem' }}>
                {t('footer.copyright')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;