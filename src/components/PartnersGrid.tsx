import PartnerVenueCard, { PartnerVenueData } from "./PartnerVenueCard";

interface PartnersGridProps {
  partners: PartnerVenueData[];
}

const PartnersGrid = ({ partners }: PartnersGridProps) => {
  return (
    <div className="container py-5">
      <div className="row g-4">
        {partners.map((partner) => (
          <div key={partner.id} className="col-12 col-md-6 col-lg-4">
            <PartnerVenueCard venue={partner} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersGrid;
