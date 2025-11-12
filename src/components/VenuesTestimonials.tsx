import { Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import thomasAvatar from '@/assets/thomas-avatar.jpg';
import lauraAvatar from '@/assets/laura-avatar.jpg';
import marcusAvatar from '@/assets/marcus-avatar.jpg';

const VenuesTestimonials = () => {
  const { t } = useTranslation('venues');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const testimonials = [
    { avatar: thomasAvatar, key: '1' },
    { avatar: lauraAvatar, key: '2' },
    { avatar: marcusAvatar, key: '3' }
  ];

  return (
    <section className="py-4 py-md-5 d-flex align-items-center" style={{ 
      minHeight: '100vh', 
      backgroundColor: isDark ? '#1a1a2e' : '#F7FAFC' 
    }}>
      <div className="container px-3">
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-lg-10 text-center">
            <h2 className={isDark ? "fw-bold mb-3 mb-md-4 text-light" : "fw-bold mb-3 mb-md-4"} style={{ 
              color: isDark ? undefined : '#2d3748',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)'
            }}>
              {t('testimonials.title')}
            </h2>
          </div>
        </div>

        <div className="row g-3 g-md-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-lg-4">
              <div
                className="h-100 position-relative d-flex flex-column"
                style={{
                  border: isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(203, 25, 28, 0.2)',
                  borderRadius: '20px',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'white',
                  transition: 'all 0.3s ease',
                  padding: 'clamp(1.5rem, 4vw, 3rem)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(220, 38, 38, 0.4)' : 'var(--bs-danger)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
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
                {/* Avatar and Quote Icon */}
                <div className="mb-3 mb-md-4 d-flex align-items-center justify-content-between">
                  <img 
                    src={testimonial.avatar} 
                    alt="Author"
                    style={{
                      width: 'clamp(50px, 12vw, 60px)',
                      height: 'clamp(50px, 12vw, 60px)',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--bs-danger)'
                    }}
                  />
                  <div 
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={{
                      top: 'clamp(-20px, -4vw, -30px)',
                      right: 'clamp(1rem, 3vw, 2rem)',
                      width: 'clamp(40px, 10vw, 60px)',
                      height: 'clamp(40px, 10vw, 60px)',
                      backgroundColor: isDark ? 'rgba(220, 38, 38, 0.2)' : '#fff5f5',
                      borderRadius: '50%',
                      border: '3px solid var(--bs-danger)',
                      boxShadow: '0 4px 15px rgba(203, 25, 28, 0.3)'
                    }}
                  >
                    <Quote size={window.innerWidth < 768 ? 20 : 28} style={{ color: 'var(--bs-danger)' }} />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-2 mb-md-3 d-flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: '#ffc107', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>★</span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p 
                  className={isDark ? "mb-4 mb-md-5 flex-grow-1 text-light" : "mb-4 mb-md-5 flex-grow-1"}
                  style={{ 
                    color: isDark ? undefined : '#2d3748',
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    lineHeight: '1.7',
                    fontStyle: 'italic'
                  }}
                >
                  "{t(`testimonials.items.${testimonial.key}.quote`)}"
                </p>

                {/* Author Info */}
                <div className="d-flex align-items-center">
                  <div className="ms-3 text-start">
                    <p className={isDark ? "fw-bold mb-0 text-light" : "fw-bold mb-0"} style={{ 
                      color: isDark ? undefined : '#2d3748', 
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' 
                    }}>
                      {t(`testimonials.items.${testimonial.key}.author`)}
                    </p>
                    <p className={isDark ? "mb-0 text-light" : "mb-0"} style={{ 
                      color: isDark ? undefined : '#4a5568',
                      opacity: isDark ? 0.75 : 1, 
                      fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' 
                    }}>
                      {t(`testimonials.items.${testimonial.key}.venue`)}
                    </p>
                  </div>
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
