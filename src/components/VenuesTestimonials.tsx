import { Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import lauraAvatar from '@/assets/laura-avatar.jpg';
import marcusAvatar from '@/assets/marcus-avatar.jpg';
import thomasAvatar from '@/assets/thomas-avatar.jpg';

const VenuesTestimonials = () => {
  const { t } = useTranslation('venues');
  
  const avatars: { [key: string]: string } = {
    sarah: lauraAvatar,
    marcus: marcusAvatar,
    elena: thomasAvatar
  };

  return (
    <section className="py-4 py-md-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container px-3">
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-lg-10 text-center">
            <h2 className="fw-bold mb-3 mb-md-4" style={{ 
              color: 'var(--bs-light)',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)'
            }}>
              {t('testimonials.title')}
            </h2>
            <p className="text-light px-2" style={{ 
              opacity: '0.85',
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              lineHeight: '1.7'
            }}>
              {t('testimonials.subtitle')}
            </p>
          </div>
        </div>

        <div className="row g-3 g-md-4">
          {['sarah', 'marcus', 'elena'].map((testimonialKey, index) => (
            <div key={index} className="col-lg-4">
              <div 
                className="h-100 position-relative d-flex flex-column"
                style={{
                  border: '1px solid rgba(203, 25, 28, 0.2)',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  padding: 'clamp(1.5rem, 4vw, 3rem)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bs-danger)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(203, 25, 28, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(203, 25, 28, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Avatar and Quote Icon */}
                <div className="mb-3 mb-md-4 d-flex align-items-center justify-content-between">
                  <img 
                    src={avatars[testimonialKey]} 
                    alt={t(`testimonials.items.${testimonialKey}.name`)}
                    style={{
                      width: 'clamp(50px, 12vw, 60px)',
                      height: 'clamp(50px, 12vw, 60px)',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--bs-danger)'
                    }}
                  />
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 'clamp(40px, 10vw, 48px)',
                      height: 'clamp(40px, 10vw, 48px)',
                      backgroundColor: 'rgba(203, 25, 28, 0.15)',
                      borderRadius: '50%'
                    }}
                  >
                    <Quote size={window.innerWidth < 768 ? 20 : 24} style={{ color: 'var(--bs-danger)' }} />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-2 mb-md-3 d-flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={window.innerWidth < 768 ? 16 : 20}
                      style={{ color: '#ffc107', fill: '#ffc107' }}
                      className="me-1"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="mb-3 mb-md-4 flex-grow-1">
                  <p 
                    className="text-light mb-0" 
                    style={{ 
                      fontStyle: 'italic', 
                      lineHeight: '1.7',
                      fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                      opacity: '0.9'
                    }}
                  >
                    "{t(`testimonials.items.${testimonialKey}.text`)}"
                  </p>
                </blockquote>

                {/* Author Info */}
                <div 
                  className="pt-3 pt-md-4 mt-auto"
                  style={{ borderTop: '2px solid var(--bs-danger)' }}
                >
                  <h6 
                    className="mb-2 fw-bold" 
                    style={{ color: 'var(--bs-light)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
                  >
                    {t(`testimonials.items.${testimonialKey}.name`)}
                  </h6>
                  <p 
                    className="text-light mb-1" 
                    style={{ opacity: '0.8', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
                  >
                    {t(`testimonials.items.${testimonialKey}.venue`)}
                  </p>
                  <p 
                    className="text-light mb-0" 
                    style={{ opacity: '0.6', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}
                  >
                    {t(`testimonials.items.${testimonialKey}.location`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenuesTestimonials;