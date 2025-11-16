import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Calculator } from "lucide-react";

const AffiliatesCalculator = () => {
  const { t } = useTranslation('affiliates');
  const [directReferrals, setDirectReferrals] = useState(10);
  const [referralsPerPerson, setReferralsPerPerson] = useState(5);

  // Calculate earnings for each level
  const calculateLevel = (level: number): { users: number; commission: number; earnings: number } => {
    const commissions = [0.50, 0.40, 0.30, 0.20, 0.10];
    const users = level === 1 
      ? directReferrals 
      : directReferrals * Math.pow(referralsPerPerson, level - 1);
    const commission = commissions[level - 1];
    const earnings = users * commission;
    
    return { users, commission, earnings };
  };

  const levels = [1, 2, 3, 4, 5].map(level => ({
    level,
    ...calculateLevel(level)
  }));

  const totalEarnings = levels.reduce((sum, level) => sum + level.earnings, 0);

  return (
    <section 
      id="calculator-section"
      className="py-5"
      style={{
        background: 'linear-gradient(180deg, #0f1629 0%, #12182d 100%)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <div className="d-flex justify-content-center mb-3">
            <Calculator size={48} style={{ color: '#40F99B' }} />
          </div>
          <h2 className="display-5 fw-bold text-light mb-3">
            {t('calculator.title')}
          </h2>
          <p className="lead text-light" style={{ opacity: 0.8 }}>
            {t('calculator.subtitle')}
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div 
              className="p-4 p-md-5"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(64, 249, 155, 0.2)'
              }}
            >
              <div className="row mb-5">
                {/* Sliders - Left Side */}
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <div className="mb-4">
                    <label className="form-label text-light fw-semibold mb-3">
                      {t('calculator.directReferrals')}: <span style={{ color: '#40F99B', fontSize: '1.2rem' }}>{directReferrals}</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="100"
                      value={directReferrals}
                      onChange={(e) => setDirectReferrals(Number(e.target.value))}
                      style={{
                        accentColor: '#40F99B'
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-light fw-semibold mb-3">
                      {t('calculator.referralsPerPerson')}: <span style={{ color: '#40F99B', fontSize: '1.2rem' }}>{referralsPerPerson}</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="50"
                      value={referralsPerPerson}
                      onChange={(e) => setReferralsPerPerson(Number(e.target.value))}
                      style={{
                        accentColor: '#40F99B'
                      }}
                    />
                  </div>
                </div>

                {/* Total Earnings Display - Right Side */}
                <div className="col-lg-6 d-flex align-items-center">
                  <div 
                    className="text-center p-4 w-100"
                    style={{
                      background: 'linear-gradient(135deg, rgba(64, 249, 155, 0.1), rgba(45, 212, 191, 0.1))',
                      borderRadius: '15px',
                      border: '2px solid rgba(64, 249, 155, 0.3)'
                    }}
                  >
                    <div className="text-light mb-2" style={{ opacity: 0.8, fontSize: '1.1rem' }}>
                      {t('calculator.totalMonthly')}
                    </div>
                    <div 
                      style={{
                        color: '#40F99B',
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: '700',
                        lineHeight: '1',
                        textShadow: '0 0 30px rgba(64, 249, 155, 0.5)'
                      }}
                    >
                      €{totalEarnings.toFixed(2)}
                    </div>
                    <div className="text-light mt-2" style={{ opacity: 0.7, fontSize: '1rem' }}>
                      {t('calculator.perMonth')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown Table */}
              <div>
                <h4 className="text-light mb-4 fw-semibold">
                  {t('calculator.breakdown')}
                </h4>
                <div 
                  className="table-responsive"
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(64, 249, 155, 0.2)'
                  }}
                >
                  <table className="table table-dark mb-0" style={{ 
                    backgroundColor: 'transparent'
                  }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid rgba(64, 249, 155, 0.3)' }}>
                        <th style={{ color: '#40F99B', fontWeight: '600' }}>{t('calculator.level')}</th>
                        <th style={{ color: '#40F99B', fontWeight: '600' }}>{t('calculator.users')}</th>
                        <th style={{ color: '#40F99B', fontWeight: '600' }}>{t('calculator.commission')}</th>
                        <th style={{ color: '#40F99B', fontWeight: '600' }} className="text-end">{t('calculator.earnings')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {levels.map((level) => (
                        <tr key={level.level} style={{ 
                          borderBottom: '1px solid rgba(64, 249, 155, 0.1)'
                        }}>
                          <td className="text-light fw-semibold">Level {level.level}</td>
                          <td className="text-light">{level.users.toLocaleString()}</td>
                          <td className="text-light">€{level.commission.toFixed(2)}</td>
                          <td className="text-end" style={{ 
                            color: '#40F99B',
                            fontWeight: '600',
                            fontSize: '1.05rem'
                          }}>
                            €{level.earnings.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ 
                        borderTop: '2px solid rgba(64, 249, 155, 0.3)',
                        backgroundColor: 'rgba(64, 249, 155, 0.1)'
                      }}>
                        <td colSpan={3} className="text-light fw-bold" style={{ fontSize: '1.1rem' }}>
                          Total
                        </td>
                        <td className="text-end fw-bold" style={{ 
                          color: '#40F99B',
                          fontSize: '1.3rem'
                        }}>
                          €{totalEarnings.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliatesCalculator;
