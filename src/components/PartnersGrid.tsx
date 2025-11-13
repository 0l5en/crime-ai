import PartnerVenueCard, { PartnerVenueData } from "./PartnerVenueCard";

interface PartnersGridProps {
  partners: PartnerVenueData[];
}

const PartnersGrid = ({ partners }: PartnersGridProps) => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">
          {partners.map((partner) => (
            <div key={partner.id} className="col-12 col-md-6 col-lg-4">
              <PartnerVenueCard venue={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersGrid;
