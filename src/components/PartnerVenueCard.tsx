import { MapPin, Calendar, Briefcase, ExternalLink, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface PartnerVenueData {
  id: string;
  name: string;
  location: string;
  country: string;
  registeredSince: string;
  caseCount: number;
  description: string;
  testimonial: string;
  ownerName: string;
  ownerAvatar: string;
  website?: string;
  address: string;
  features: string[];
  image?: string;
}

interface PartnerVenueCardProps {
  venue: PartnerVenueData;
}

const PartnerVenueCard = ({ venue }: PartnerVenueCardProps) => {
  const { t } = useTranslation('partners');

  return (
    <div 
      className="card h-100 border-0 shadow-sm"
      style={{
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      {/* Venue Image */}
      {venue.image && (
        <div style={{ height: '300px', overflow: 'hidden' }}>
          <img 
            src={venue.image} 
            alt={venue.name}
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      
      {/* Header with Badge */}
      <div 
        className="card-header border-0 text-white position-relative"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-variant)) 100%)',
          padding: '1.5rem'
        }}
      >
        <div className="position-absolute top-0 end-0 m-3">
          <span 
            className="badge d-flex align-items-center gap-1"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 0.75rem',
              fontSize: '0.75rem'
            }}
          >
            <Award size={14} />
            {t('partner.badge')}
          </span>
        </div>
        <h3 className="h4 mb-2">{venue.name}</h3>
        <div className="d-flex align-items-center gap-2 text-white opacity-75">
          <MapPin size={16} />
          <span>{venue.location}, {venue.country}</span>
        </div>
      </div>

      <div className="card-body p-4">
        {/* Stats */}
        <div className="row g-3 mb-4">
          <div className="col-6">
            <div className="d-flex align-items-center gap-2 text-muted">
              <Calendar size={18} className="text-danger" />
              <div>
                <div className="small text-muted">{t('partner.registeredSince')}</div>
                <div className="fw-semibold">{venue.registeredSince}</div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center gap-2 text-muted">
              <Briefcase size={18} className="text-danger" />
              <div>
                <div className="small text-muted">{t('partner.cases')}</div>
                <div className="fw-semibold">{venue.caseCount} {t('partner.cases')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4">{venue.description}</p>

        {/* Features */}
        {venue.features && venue.features.length > 0 && (
          <div className="mb-4">
            <h5 className="h6 fw-semibold mb-3">{t('partner.features')}</h5>
            <ul className="list-unstyled mb-0">
              {venue.features.map((feature, idx) => (
                <li key={idx} className="mb-2 d-flex align-items-start gap-2">
                  <span className="text-danger" style={{ marginTop: '2px' }}>✓</span>
                  <span className="small">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Testimonial */}
        <div 
          className="p-3 rounded mb-4"
          style={{
            background: 'hsl(var(--muted))',
            borderLeft: '3px solid hsl(var(--primary))'
          }}
        >
          <p className="mb-2 small fst-italic">"{venue.testimonial}"</p>
          <div className="d-flex align-items-center gap-2">
            <img 
              src={venue.ownerAvatar} 
              alt={venue.ownerName}
              className="rounded-circle"
              style={{ width: '32px', height: '32px', objectFit: 'cover' }}
            />
            <div>
              <div className="small fw-semibold">{venue.ownerName}</div>
              <div className="small text-muted">{venue.name}</div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-top pt-3">
          <div className="small text-muted mb-2">
            <MapPin size={14} className="d-inline me-1" />
            {venue.address}
          </div>
          {venue.website && (
            <a 
              href={`https://${venue.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-2"
            >
              <ExternalLink size={16} />
              {t('partner.website')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerVenueCard;
