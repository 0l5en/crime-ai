import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliatesHero from "@/components/AffiliatesHero";
import AffiliatesCalculator from "@/components/AffiliatesCalculator";
import AffiliatesHowItWorks from "@/components/AffiliatesHowItWorks";
import AffiliatesBenefits from "@/components/AffiliatesBenefits";
import AffiliatesCTA from "@/components/AffiliatesCTA";

const AffiliatesPage = () => {
  const { t, i18n } = useTranslation('affiliates');

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('hero.title')} - DetectivesGame</title>
        <meta name="description" content={t('hero.subtitle')} />
        <meta property="og:title" content={`${t('hero.title')} - DetectivesGame`} />
        <meta property="og:description" content={t('hero.subtitle')} />
        <meta name="keywords" content="affiliate program, passive income, recurring income, referral system, online income, DetectivesGame partner" />
      </Helmet>
      
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
