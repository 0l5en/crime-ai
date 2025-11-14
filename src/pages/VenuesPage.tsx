import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VenuesHero from "@/components/VenuesHero";
import WhyVenueOwners from "@/components/WhyVenueOwners";
import HowItWorks from "@/components/HowItWorks";
import VenuesPricing from "@/components/VenuesPricing";
import VenuesFAQ from "@/components/VenuesFAQ";
import VenuesTestimonials from "@/components/VenuesTestimonials";
import VenuesCTA from "@/components/VenuesCTA";

const VenuesPage = () => {
  return (
    <div className="venues-page min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
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
  );
};

export default VenuesPage;