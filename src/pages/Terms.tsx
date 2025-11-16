import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';

const Terms = () => {
  const { t } = useTranslation(['legal', 'meta']);
  const breadcrumbData = useBreadcrumb();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title={t('meta:terms.title')}
        description={t('meta:terms.description')}
        canonical="/terms"
        keywords={t('meta:terms.keywords')}
      />
      {breadcrumbData && <StructuredData type="breadcrumb" data={breadcrumbData} />}
      <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
        <Header />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 mb-4 text-center">{t('terms.title')}</h1>
            <p className="text-muted text-center mb-5">{t('terms.lastUpdated')}</p>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.acceptance.title')}</h2>
              <p>{t('terms.sections.acceptance.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.service.title')}</h2>
              <p>{t('terms.sections.service.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.accounts.title')}</h2>
              <p>{t('terms.sections.accounts.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.payments.title')}</h2>
              <p>{t('terms.sections.payments.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.ip.title')}</h2>
              <p>{t('terms.sections.ip.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.conduct.title')}</h2>
              <p>{t('terms.sections.conduct.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.termination.title')}</h2>
              <p>{t('terms.sections.termination.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.disclaimer.title')}</h2>
              <p>{t('terms.sections.disclaimer.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.limitation.title')}</h2>
              <p>{t('terms.sections.limitation.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.changes.title')}</h2>
              <p>{t('terms.sections.changes.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.governing.title')}</h2>
              <p>{t('terms.sections.governing.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('terms.sections.contact.title')}</h2>
              <p>{t('terms.sections.contact.content')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default Terms;
