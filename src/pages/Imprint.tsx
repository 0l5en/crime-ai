import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Imprint = () => {
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
            <h1 className="display-4 mb-4 text-center">{t('imprint.title')}</h1>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.company.title')}</h2>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>{t('imprint.sections.company.name')}</strong></p>
                <p className="mb-2">{t('imprint.sections.company.address')}</p>
                <p className="mb-2">{t('imprint.sections.company.city')}</p>
                <p className="mb-0">{t('imprint.sections.company.country')}</p>
              </div>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.contact.title')}</h2>
              <div className="bg-light p-4 rounded">
                <p className="mb-2"><strong>Email:</strong> {t('imprint.sections.contact.email')}</p>
                <p className="mb-0"><strong>Telefon:</strong> {t('imprint.sections.contact.phone')}</p>
              </div>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.representative.title')}</h2>
              <p>{t('imprint.sections.representative.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.register.title')}</h2>
              <div className="bg-light p-4 rounded">
                <p className="mb-2">{t('imprint.sections.register.court')}</p>
                <p className="mb-0">{t('imprint.sections.register.number')}</p>
              </div>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.vat.title')}</h2>
              <p>{t('imprint.sections.vat.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.dispute.title')}</h2>
              <p>{t('imprint.sections.dispute.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.liability.title')}</h2>
              <p>{t('imprint.sections.liability.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.copyright.title')}</h2>
              <p>{t('imprint.sections.copyright.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.privacy.title')}</h2>
              <p>{t('imprint.sections.privacy.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('imprint.sections.accessibility.title')}</h2>
              <p>{t('imprint.sections.accessibility.content')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Imprint;
