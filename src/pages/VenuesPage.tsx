import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import VenuesHero from "@/components/VenuesHero";
import WhyVenueOwners from "@/components/WhyVenueOwners";
import HowItWorks from "@/components/HowItWorks";
import VenuesPricing from "@/components/VenuesPricing";
import VenuesFAQ from "@/components/VenuesFAQ";
import VenuesTestimonials from "@/components/VenuesTestimonials";
import VenuesCTA from "@/components/VenuesCTA";
import { useTranslation } from "react-i18next";

const VenuesPage = () => {
  const { t } = useTranslation('meta');
  
  return (
    <>
      <SEO 
        title={t('venues.title')}
        description={t('venues.description')}
        canonical="/venues"
        keywords={t('venues.keywords')}
      />
      <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
        <Header />
        <VenuesHero />
        <WhyVenueOwners />
        <HowItWorks />
        <VenuesPricing />
        <VenuesFAQ />
        <VenuesTestimonials />
        <VenuesCTA />
        <Footer />
      </div>
    </>
  );
};

export default VenuesPage;