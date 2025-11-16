import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';

const Cookies = () => {
  const { t } = useTranslation(['legal', 'meta']);
  const breadcrumbData = useBreadcrumb();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title={t('meta:cookies.title')}
        description={t('meta:cookies.description')}
        canonical="/cookies"
        keywords={t('meta:cookies.keywords')}
      />
      {breadcrumbData && <StructuredData type="breadcrumb" data={breadcrumbData} />}
      <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
        <Header />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 mb-4 text-center">{t('cookies.title')}</h1>
            <p className="text-muted text-center mb-5">{t('cookies.lastUpdated')}</p>

            <div className="mb-4">
              <p>{t('cookies.intro')}</p>
            </div>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.what.title')}</h2>
              <p>{t('cookies.sections.what.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.why.title')}</h2>
              <p>{t('cookies.sections.why.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.types.title')}</h2>
              <p>{t('cookies.sections.types.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.firstParty.title')}</h2>
              <ul>
                {(t('cookies.sections.firstParty.list', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.thirdParty.title')}</h2>
              <p>{t('cookies.sections.thirdParty.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.similar.title')}</h2>
              <p>{t('cookies.sections.similar.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.manage.title')}</h2>
              <p>{t('cookies.sections.manage.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.disabling.title')}</h2>
              <p>{t('cookies.sections.disabling.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.updates.title')}</h2>
              <p>{t('cookies.sections.updates.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.legal.title')}</h2>
              <p>{t('cookies.sections.legal.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.international.title')}</h2>
              <p>{t('cookies.sections.international.content')}</p>
            </section>

            <section className="mb-5">
              <h2 className="h4 mb-3">{t('cookies.sections.contact.title')}</h2>
              <p>{t('cookies.sections.contact.content')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default Cookies;
