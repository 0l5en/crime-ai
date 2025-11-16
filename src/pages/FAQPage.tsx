import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useTheme } from "@/hooks/useTheme";

const FAQPage = () => {
  const { theme } = useTheme();
  const { t } = useTranslation('meta');
  const breadcrumbData = useBreadcrumb();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <SEO 
        title={t('faq.title')}
        description={t('faq.description')}
        canonical="/faq"
        keywords={t('faq.keywords')}
      />
      {breadcrumbData && <StructuredData type="breadcrumb" data={breadcrumbData} />}
      <div
        className="min-vh-100" 
        style={{ backgroundColor: theme === 'dark' ? '#000000' : 'var(--bs-body-bg)' }}
      >
        <Header />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

export default FAQPage;