import Header from "@/components/Header";
import VenuesHero from "@/components/VenuesHero";
import WhyVenueOwners from "@/components/WhyVenueOwners";
import HowItWorks from "@/components/HowItWorks";
import VenuesPricing from "@/components/VenuesPricing";
import VenuesFAQ from "@/components/VenuesFAQ";
import VenuesTestimonials from "@/components/VenuesTestimonials";
import VenuesCTA from "@/components/VenuesCTA";

const VenuesPage = () => {
  return (
    <div className="min-vh-100 bg-dark">
      <Header />
      <VenuesHero />
      <WhyVenueOwners />
      <HowItWorks />
      <VenuesPricing />
      <VenuesFAQ />
      <VenuesTestimonials />
      <VenuesCTA />
    </div>
  );
};

export default VenuesPage;