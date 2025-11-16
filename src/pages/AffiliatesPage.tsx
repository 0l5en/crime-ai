import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import AffiliatesHero from "@/components/AffiliatesHero";
import AffiliatesCalculator from "@/components/AffiliatesCalculator";
import AffiliatesHowItWorks from "@/components/AffiliatesHowItWorks";
import AffiliatesBenefits from "@/components/AffiliatesBenefits";
import AffiliatesCTA from "@/components/AffiliatesCTA";

const AffiliatesPage = () => {
  const { t } = useTranslation(['affiliates', 'meta']);
  const breadcrumbData = useBreadcrumb();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title={t('meta:affiliates.title')}
        description={t('meta:affiliates.description')}
        canonical="/affiliates"
        keywords={t('meta:affiliates.keywords')}
      />
      {breadcrumbData && <StructuredData type="breadcrumb" data={breadcrumbData} />}
      
      <div
        className="min-vh-100"
        style={{ 
          backgroundColor: '#181d35'
        }}
      >
        <Header />
        <AffiliatesHero />
        <AffiliatesCalculator />
        <AffiliatesHowItWorks />
        <AffiliatesBenefits />
        <AffiliatesCTA />
        <Footer />
      </div>
    </>
  );
};

export default AffiliatesPage;
