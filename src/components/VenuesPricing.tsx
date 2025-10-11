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
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10 text-center">
            <h2 className="display-4 fw-bold mb-4" style={{ color: 'var(--bs-light)' }}>{t('pricing.title')}</h2>
            <p className="lead mb-5 text-light" style={{ opacity: '0.9' }}>
              {t('pricing.subtitle')}
            </p>
          </div>
        </div>

        <div className="row justify-content-center align-items-start">
          {/* Left Side - Pricing Card */}
          <div className="col-lg-5 mb-4">
            <div 
              className="p-4 text-center"
              style={{
                backgroundColor: 'var(--bs-danger)',
                borderRadius: '16px',
                color: 'white'
              }}
            >
              <h3 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>
                {t('pricing.plan.name')}
              </h3>
              
              <div className="mb-3">
                <span className="display-4 fw-bold">{t('pricing.plan.price')}</span>
                <span className="fs-5"> {t('pricing.plan.period')}</span>
              </div>
              
              <p className="mb-0" style={{ opacity: '0.9' }}>
                {t('pricing.plan.trial')}
              </p>
            </div>

            {/* Description Section */}
            <div className="mt-5">
              <h4 className="fw-bold mb-3" style={{ color: 'var(--bs-light)' }}>
                {t('pricing.enhance.title')}
              </h4>
              <p className="text-light" style={{ opacity: '0.9', lineHeight: '1.7' }}>
                {t('pricing.enhance.description1')}
              </p>
              <p className="text-light" style={{ opacity: '0.9', lineHeight: '1.7' }}>
                {t('pricing.enhance.description2')}
              </p>
            </div>
          </div>

          {/* Right Side - Features and CTA */}
          <div className="col-lg-5 offset-lg-1">
            <div className="mb-4">
              <h5 className="fw-bold mb-4" style={{ color: 'var(--bs-light)' }}>
                {t('pricing.includes')}
              </h5>
              
              <ul className="list-unstyled">
                {['exclusive', 'unlimited', 'profile', 'referral', 'public', 'analytics', 'support'].map((feature, index) => (
                  <li key={index} className="mb-3 d-flex align-items-start">
                    <div 
                      className="me-3 mt-1 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        backgroundColor: 'var(--bs-danger)' 
                      }}
                    >
                      <Check size={12} style={{ color: 'white' }} />
                    </div>
                    <span className="text-light" style={{ fontSize: '0.95rem', opacity: '0.9' }}>
                      {t(`pricing.features.${feature}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button 
              onClick={scrollToContact}
              className="w-100 py-3 fw-semibold mb-3"
              style={{
                backgroundColor: 'var(--bs-danger)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#a8161a';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bs-danger)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {t('pricing.cta')}
            </button>
            
            <p className="text-light small text-center mb-0" style={{ opacity: '0.7' }}>
              {t('pricing.noCommitment')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesPricing;