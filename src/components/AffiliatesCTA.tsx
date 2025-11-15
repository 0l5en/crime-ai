import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const AffiliatesCTA = () => {
  const { t } = useTranslation('affiliates');

  return (
    <section 
      className="py-5"
      style={{
        background: 'linear-gradient(135deg, #181d35 0%, #1a2744 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(64, 249, 155, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-50%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(64, 249, 155, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
      />

      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 
              className="display-4 fw-bold text-light mb-4"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: '1.2'
              }}
            >
              {t('cta.title')}
            </h2>
            
            <p 
              className="lead text-light mb-5"
              style={{
                opacity: 0.9,
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: '1.6'
              }}
            >
              {t('cta.subtitle')}
            </p>

            <Link
              to="/register"
              className="btn btn-lg px-5 py-3 mb-4 d-inline-flex align-items-center gap-2"
              style={{
                backgroundColor: '#40F99B',
                color: '#181d35',
                border: 'none',
                fontWeight: '600',
                fontSize: '1.2rem',
                boxShadow: '0 15px 40px rgba(64, 249, 155, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(64, 249, 155, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(64, 249, 155, 0.4)';
              }}
            >
              {t('cta.button')}
              <ArrowRight size={24} />
            </Link>

            <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
              {t('cta.guarantee').split(' • ').map((item, index) => (
                <div 
                  key={index}
                  className="d-flex align-items-center gap-2"
                >
                  <CheckCircle2 size={20} style={{ color: '#40F99B' }} />
                  <span className="text-light" style={{ opacity: 0.8 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliatesCTA;
