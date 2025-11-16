import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GameShowcase from "@/components/GameShowcase";
import GameFeatures from "@/components/GameFeatures";
import GameReviews from "@/components/GameReviews";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation('meta');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title={t('home.title')}
        description={t('home.description')}
        canonical="/"
        keywords={t('home.keywords')}
      />
      <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
        <Header />
        <Hero />
        <GameShowcase />
        <GameFeatures />
        <GameReviews />
        <Footer />
      </div>
    </>
  );
};

export default Index;
