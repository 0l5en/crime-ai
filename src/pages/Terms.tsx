import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  const { t } = useTranslation('terms');
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 mb-4 text-center">{t('title')}</h1>
            <p className="text-muted text-center mb-5">
              <strong>{t('lastUpdated')}</strong> {t('date')}
            </p>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.acceptance.title')}</h2>
              <p>{t('sections.acceptance.content1')}</p>
              <p>{t('sections.acceptance.content2')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.description.title')}</h2>
              <p>{t('sections.description.intro')}</p>
              <ul>
                <li><strong>{t('sections.description.items.cases').split(':')[0]}:</strong> {t('sections.description.items.cases').split(':').slice(1).join(':')}</li>
                <li><strong>{t('sections.description.items.generator').split(':')[0]}:</strong> {t('sections.description.items.generator').split(':').slice(1).join(':')}</li>
                <li><strong>{t('sections.description.items.forensics').split(':')[0]}:</strong> {t('sections.description.items.forensics').split(':').slice(1).join(':')}</li>
                <li><strong>{t('sections.description.items.vacation').split(':')[0]}:</strong> {t('sections.description.items.vacation').split(':').slice(1).join(':')}</li>
                <li><strong>{t('sections.description.items.venue').split(':')[0]}:</strong> {t('sections.description.items.venue').split(':').slice(1).join(':')}</li>
                <li><strong>{t('sections.description.items.social').split(':')[0]}:</strong> {t('sections.description.items.social').split(':').slice(1).join(':')}</li>
                <li><strong>{t('sections.description.items.premium').split(':')[0]}:</strong> {t('sections.description.items.premium').split(':').slice(1).join(':')}</li>
                <li><strong>{t('sections.description.items.qr').split(':')[0]}:</strong> {t('sections.description.items.qr').split(':').slice(1).join(':')}</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.accounts.title')}</h2>
              <p>{t('sections.accounts.intro')}</p>
              <ul>
                <li>{t('sections.accounts.items.accurate')}</li>
                <li>{t('sections.accounts.items.maintain')}</li>
                <li>{t('sections.accounts.items.security')}</li>
                <li>{t('sections.accounts.items.responsibility')}</li>
                <li>{t('sections.accounts.items.notify')}</li>
              </ul>
              <p>{t('sections.accounts.age')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.payments.title')}</h2>
              <p>{t('sections.payments.intro')}</p>
              <ul>
                <li>{t('sections.payments.items.fees')}</li>
                <li>{t('sections.payments.items.renewal')}</li>
                <li>{t('sections.payments.items.refund')}</li>
              </ul>
              <p>{t('sections.payments.policy')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.referral.title')}</h2>
              <p>{t('sections.referral.intro')}</p>
              <ul>
                <li>{t('sections.referral.items.compliance')}</li>
                <li>{t('sections.referral.items.prohibition')}</li>
                <li>{t('sections.referral.items.modification')}</li>
                <li>{t('sections.referral.items.verification')}</li>
              </ul>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.conduct.title')}</h2>
              <p>{t('sections.conduct.intro')}</p>
              <ul>
                <li>{t('sections.conduct.items.laws')}</li>
                <li>{t('sections.conduct.items.rights')}</li>
                <li>{t('sections.conduct.items.malicious')}</li>
                <li>{t('sections.conduct.items.multiple')}</li>
                <li>{t('sections.conduct.items.inappropriate')}</li>
                <li>{t('sections.conduct.items.cheat')}</li>
                <li>{t('sections.conduct.items.reverse')}</li>
              </ul>
              <p>{t('sections.conduct.investigation')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.ip.title')}</h2>
              <p>{t('sections.ip.content1')}</p>
              <p>{t('sections.ip.content2')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.privacy.title')}</h2>
              <p>{t('sections.privacy.content1')}</p>
              <p>{t('sections.privacy.content2')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.availability.title')}</h2>
              <p>{t('sections.availability.intro')}</p>
              <ul>
                <li>{t('sections.availability.items.modify')}</li>
                <li>{t('sections.availability.items.update')}</li>
                <li>{t('sections.availability.items.maintenance')}</li>
                <li>{t('sections.availability.items.features')}</li>
              </ul>
              <p>{t('sections.availability.notice')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.liability.title')}</h2>
              <p>{t('sections.liability.content1')}</p>
              <p>{t('sections.liability.content2')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.termination.title')}</h2>
              <p>{t('sections.termination.content1')}</p>
              <p>{t('sections.termination.content2')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.dispute.title')}</h2>
              <p>{t('sections.dispute.content1')}</p>
              <p>{t('sections.dispute.content2')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.severability.title')}</h2>
              <p>{t('sections.severability.content')}</p>
            </div>

            <div className="mb-5">
              <h2 className="h3 mb-3">{t('sections.contact.title')}</h2>
              <p>{t('sections.contact.intro')}</p>
              <div className="bg-light p-3 rounded">
                <p className="mb-1"><strong>{t('sections.contact.support')}</strong></p>
                <p className="mb-1">{t('sections.contact.email')}</p>
                <p className="mb-0">{t('sections.contact.website')}</p>
              </div>
            </div>

            <div className="text-center mt-5 pt-4 border-top">
              <p className="text-muted">
                {t('sections.closing')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;