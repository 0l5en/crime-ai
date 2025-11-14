import React from "react";
import { MapPin, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <div
      className="position-relative d-flex flex-column h-100"
      style={{
        border: isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(203, 25, 28, 0.2)',
        borderRadius: '20px',
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'white',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(220, 38, 38, 0.4)' : 'var(--bs-danger)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 35px rgba(203, 25, 28, 0.2)';
        e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#fff5f5';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 25, 28, 0.2)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'white';
      }}
    >
      {/* Image Section with Heart Icon */}
      <div 
        className="position-relative"
        style={{
          width: '100%',
          height: '240px',
          overflow: 'hidden'
        }}
      >
        <img
          src={venue.image}
          alt={venue.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: isDark ? 'brightness(0.9)' : 'none'
          }}
        />
        {/* Heart Icon - Top Right */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="position-absolute top-0 end-0 m-3 btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: '40px',
            height: '40px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
        >
          <Heart 
            size={20} 
            fill={isLiked ? 'var(--bs-danger)' : 'none'} 
            color={isLiked ? 'var(--bs-danger)' : 'white'} 
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow-1 d-flex flex-column">
        {/* Title */}
        <h3 className={isDark ? "fw-bold mb-2 text-light" : "fw-bold mb-2"} style={{
          color: isDark ? undefined : '#2d3748',
          fontSize: '1.35rem'
        }}>
          {venue.name}
        </h3>
        
        {/* Location */}
        <div className="d-flex align-items-center mb-3">
          <MapPin size={16} className="me-1" style={{ color: 'var(--bs-primary)' }} />
          <span className={isDark ? "text-light" : ""} style={{ 
            fontSize: '0.9rem',
            color: isDark ? undefined : '#718096',
            opacity: isDark ? 0.8 : 1
          }}>
            {venue.location}, {venue.country}
          </span>
        </div>

        {/* Description */}
        <p className={isDark ? "mb-3 text-light" : "mb-3"} style={{
          color: isDark ? undefined : '#4a5568',
          opacity: isDark ? 0.8 : 1,
          lineHeight: '1.6',
          fontSize: '0.95rem'
        }}>
          {venue.description}
        </p>

        {/* Testimonial Quote */}
        <div 
          className="p-3 mb-3"
          style={{
            backgroundColor: isDark ? 'rgba(203, 25, 28, 0.1)' : 'rgba(203, 25, 28, 0.05)',
            borderLeft: '3px solid var(--bs-danger)',
            borderRadius: '8px'
          }}
        >
          <p className={isDark ? "mb-2 fst-italic text-light" : "mb-2 fst-italic"} style={{
            fontSize: '0.9rem',
            color: isDark ? undefined : '#2d3748',
            opacity: isDark ? 0.9 : 1,
            lineHeight: '1.5'
          }}>
            "{venue.testimonial}"
          </p>
          <div className="d-flex align-items-center gap-2">
            <img 
              src={venue.ownerAvatar} 
              alt={venue.ownerName}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--bs-danger)'
              }}
            />
            <div className={isDark ? "text-light" : ""} style={{ 
              fontSize: '0.85rem',
              color: isDark ? undefined : '#718096',
              opacity: isDark ? 0.7 : 1
            }}>
              <div className="fw-semibold" style={{ 
                color: isDark ? '#e2e8f0' : '#2d3748',
                opacity: 1
              }}>
                {venue.ownerName}
              </div>
              <div>{venue.registeredSince}</div>
            </div>
          </div>
        </div>

        {/* View Property Button */}
        <div className="mt-auto">
          <a 
            href={`https://${venue.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-100"
            style={{
              background: 'var(--bs-primary)',
              color: 'white',
              borderRadius: '10px',
              padding: '0.75rem',
              fontWeight: '500',
              border: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {t('partner.website')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnerVenueCard;
