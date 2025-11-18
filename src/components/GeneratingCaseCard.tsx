import { components } from '@/openapi/crimeAiSchema';
import { useTranslation } from 'react-i18next';
import { toLocalizedString } from './ui/DateTimeFormatter';
import { Clock, Mail, QrCode, Sparkles, AlertCircle } from 'lucide-react';

type CaseGeneratorFormVacationRentalDto = components['schemas']['CaseGeneratorFormVacationRentalDto'];

interface GeneratingCaseCardProps {
  caseGeneratorFormVacationRentalDto: CaseGeneratorFormVacationRentalDto;
}

const GeneratingCaseCard = ({ caseGeneratorFormVacationRentalDto }: GeneratingCaseCardProps) => {
  const { t } = useTranslation('vacationRentalDashboard');
  const formattedDate = toLocalizedString(caseGeneratorFormVacationRentalDto.createdAt);

  const isWaitingForPayment = !!caseGeneratorFormVacationRentalDto.create.formBasic.paymentLink;

  return (
    <div className="card border-secondary h-100 overflow-hidden" style={{ minHeight: '400px' }}>
      {/* Header with gradient background */}
      <div className="position-relative" style={{ 
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)',
        padding: '1.5rem'
      }}>
        <div className="d-flex align-items-center gap-2 mb-2">
          <Sparkles className="text-danger" size={28} />
          <h3 className="text-danger mb-0 fw-bold">{t('generatingCard.title')}</h3>
        </div>
        <p className="text-danger mb-0 small fw-semibold">
          {isWaitingForPayment ? t('generatingCard.statusWaitingForPayment') : t('generatingCard.statusInProgress')}
        </p>
      </div>

      <div className="card-body p-4 d-flex flex-column" style={{ minHeight: '350px' }}>
        {/* Venue Information */}
        <div className="mb-4">
          <div className="mb-3">
            <div className="text-muted small mb-1">{t('form.fields.venueName.label')}</div>
            <div className="fw-semibold">{caseGeneratorFormVacationRentalDto.create.formBasic.venueName}</div>
          </div>
          <div className="mb-3">
            <div className="text-muted small mb-1">{t('form.fields.fullAddress.label')}</div>
            <div className="fw-semibold">{caseGeneratorFormVacationRentalDto.create.formBasic.fullAddress}</div>
          </div>
          <div>
            <div className="text-muted small mb-1">{t('generatingCard.created')}</div>
            <div className="fw-semibold">{formattedDate}</div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Payment Action or Generation Info */}
        {isWaitingForPayment ? (
          <div className="alert alert-warning d-flex align-items-start gap-3 mb-4" role="alert">
            <AlertCircle size={24} className="flex-shrink-0 mt-1" />
            <div>
              <h6 className="alert-heading mb-2">{t('generatingCard.paymentRequired')}</h6>
              <p className="mb-3 small">{t('generatingCard.paymentDescription')}</p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => window.location.href = caseGeneratorFormVacationRentalDto.create.formBasic.paymentLink}
              >
                {t('generatingCard.completePayment')}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Generation Process Info */}
            <div className="mb-4 flex-grow-1">
              <div className="d-flex align-items-start gap-3 mb-3">
                <Clock size={20} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="fw-semibold mb-1">{t('generatingCard.duration.title')}</div>
                  <div className="text-muted small">{t('generatingCard.duration.description')}</div>
                </div>
              </div>
              
              <div className="d-flex align-items-start gap-3 mb-3">
                <Mail size={20} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="fw-semibold mb-1">{t('generatingCard.notification.title')}</div>
                  <div className="text-muted small">{t('generatingCard.notification.description')}</div>
                </div>
              </div>
              
              <div className="d-flex align-items-start gap-3">
                <QrCode size={20} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="fw-semibold mb-1">{t('generatingCard.qrCode.title')}</div>
                  <div className="text-muted small">{t('generatingCard.qrCode.description')}</div>
                </div>
              </div>
            </div>

            {/* Progress Indicator - positioned at bottom */}
            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="small text-muted">{t('generatingCard.progress')}</span>
                <span className="small fw-semibold text-primary">{t('generatingCard.inProgress')}</span>
              </div>
              <div className="progress" style={{ height: '48px' }}>
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                  role="progressbar" 
                  style={{ width: '45%' }}
                  aria-valuenow={45} 
                  aria-valuemin={0} 
                  aria-valuemax={100}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneratingCaseCard;
