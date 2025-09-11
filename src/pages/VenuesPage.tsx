import Header from "@/components/Header";
import VenuesHero from "@/components/VenuesHero";
import WhatAreVenueCases from "@/components/WhatAreVenueCases";
import HowItWorks from "@/components/HowItWorks";
import VenueBenefits from "@/components/VenueBenefits";
import GuestBenefits from "@/components/GuestBenefits";
import VenuesCTA from "@/components/VenuesCTA";

const VenuesPage = () => {
  return (
    <div className="min-vh-100 bg-dark">
      <Header />
      <VenuesHero />
      <WhatAreVenueCases />
      <HowItWorks />
      <VenueBenefits />
      <GuestBenefits />
      <VenuesCTA />
    </div>
  );
};

export default VenuesPage;