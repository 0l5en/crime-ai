import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  const { t } = useTranslation('legal');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 mb-4 text-center">{t('privacy.title')}</h1>
            <p className="text-muted text-center mb-5">{t('privacy.lastUpdated')}</p>
            
            <div className="mb-4">
              <p>{t('privacy.intro')}</p>
            </div>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.collection.title')}</h2>
              <p>{t('privacy.sections.collection.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.usage.title')}</h2>
              <p>{t('privacy.sections.usage.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.sharing.title')}</h2>
              <p>{t('privacy.sections.sharing.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.security.title')}</h2>
              <p>{t('privacy.sections.security.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.retention.title')}</h2>
              <p>{t('privacy.sections.retention.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.rights.title')}</h2>
              <p>{t('privacy.sections.rights.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.cookies.title')}</h2>
              <p>{t('privacy.sections.cookies.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.children.title')}</h2>
              <p>{t('privacy.sections.children.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.international.title')}</h2>
              <p>{t('privacy.sections.international.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.thirdParty.title')}</h2>
              <p>{t('privacy.sections.thirdParty.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.changes.title')}</h2>
              <p>{t('privacy.sections.changes.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.gdpr.title')}</h2>
              <p>{t('privacy.sections.gdpr.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('privacy.sections.contact.title')}</h2>
              <p>{t('privacy.sections.contact.content')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
