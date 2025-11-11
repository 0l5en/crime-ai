import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const VenuesPricing = () => {
  const { t } = useTranslation('venues');
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    navigate('/venue-register');
  };

  return (
    <section className="py-4 py-md-5 d-flex align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <div className="container px-3">
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-lg-10 text-center">
            <h2 className="fw-bold mb-3 mb-md-4" style={{ 
              color: '#2d3748',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)'
            }}>
              {t('pricing.title')}
            </h2>
            <p className="mb-4 mb-md-5 px-2" style={{ 
              color: '#4a5568',
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              lineHeight: '1.7'
            }}>
              {t('pricing.subtitle')}
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row align-items-stretch">
              {/* Left Side - Pricing Card & Description */}
              <div className="col-lg-5 mb-3 mb-lg-0">
                <div 
                  className="text-center mb-3 mb-md-4"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    border: '3px solid var(--bs-danger)',
                    boxShadow: '0 8px 30px rgba(203, 25, 28, 0.15)',
                    padding: 'clamp(1.5rem, 4vw, 3rem)'
                  }}
                >
                  <h3 className="fw-bold mb-3 mb-md-4 text-danger" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.75rem)' }}>
                    {t('pricing.plan.name')}
                  </h3>
                  
                  <div className="mb-3 mb-md-4">
                    <span className="fw-bold" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#2d3748' }}>{t('pricing.plan.price')}</span>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#4a5568' }}> {t('pricing.plan.period')}</span>
                  </div>
                  
                  <p className="mb-0" style={{ color: '#4a5568', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>
                    {t('pricing.plan.trial')}
                  </p>
                </div>

                {/* Description Section */}
                <div className="px-2 px-md-3">
                  <h4 className="fw-bold mb-2 mb-md-3" style={{ color: 'var(--bs-danger)', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
                    {t('pricing.enhance.title')}
                  </h4>
                  <p className="mb-2 mb-md-3" style={{ color: '#4a5568', lineHeight: '1.8', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                    {t('pricing.enhance.description1')}
                  </p>
                  <p className="mb-0" style={{ color: '#4a5568', lineHeight: '1.8', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                    {t('pricing.enhance.description2')}
                  </p>
                </div>
              </div>

              {/* Right Side - Features and CTA */}
              <div className="col-lg-6 offset-lg-1 d-flex flex-column">
                <div 
                  className="flex-grow-1"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    border: '2px solid rgba(203, 25, 28, 0.2)',
                    padding: 'clamp(1.5rem, 4vw, 3rem)'
                  }}
                >
                  <h5 className="fw-bold mb-3 mb-md-4 text-danger" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
                    {t('pricing.includes')}
                  </h5>
                  
                  <ul className="list-unstyled mb-4 mb-md-5">
                    {['exclusive', 'unlimited', 'profile', 'referral', 'public', 'analytics', 'support'].map((feature, index) => (
                      <li key={index} className="mb-2 mb-md-3 d-flex align-items-start">
                        <div 
                          className="me-2 me-md-3 mt-1 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ 
                            width: 'clamp(20px, 5vw, 24px)', 
                            height: 'clamp(20px, 5vw, 24px)', 
                            backgroundColor: 'var(--bs-danger)',
                            boxShadow: '0 2px 8px rgba(203, 25, 28, 0.3)'
                          }}
                        >
                          <Check size={window.innerWidth < 768 ? 12 : 14} style={{ color: 'white' }} strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: '#2d3748', lineHeight: '1.5' }}>
                          {t(`pricing.features.${feature}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    onClick={scrollToContact}
                    className="w-100 fw-bold mb-2 mb-md-3"
                    style={{
                      backgroundColor: 'var(--bs-danger)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      padding: 'clamp(0.75rem, 2vw, 1rem)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px rgba(203, 25, 28, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#a8161a';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(203, 25, 28, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bs-danger)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(203, 25, 28, 0.3)';
                    }}
                  >
                    {t('pricing.cta')}
                  </button>
                  
                  <p className="text-center mb-0" style={{ color: '#718096', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>
                    {t('pricing.noCommitment')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesPricing;