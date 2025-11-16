import { components } from '@/openapi/crimeAiSchema';
import { useTranslation } from 'react-i18next';
import { toLocalizedString } from './ui/DateTimeFormatter';

type CaseGeneratorFormVacationRentalDto = components['schemas']['CaseGeneratorFormVacationRentalDto'];

interface GeneratingCaseCardProps {
  caseGeneratorFormVacationRentalDto: CaseGeneratorFormVacationRentalDto;
}

const GeneratingCaseCard = ({ caseGeneratorFormVacationRentalDto }: GeneratingCaseCardProps) => {
  const { t } = useTranslation('vacationRentalDashboard');
  const formattedDate = toLocalizedString(caseGeneratorFormVacationRentalDto.createdAt);

  const statusLabel = caseGeneratorFormVacationRentalDto.create.formBasic.paymentLink
    ? t('generatingCard.statusWaitingForPayment')
    : t('generatingCard.statusInProgress');

  return (
    <div className="card border-secondary card-hover h-100" style={{ minHeight: '400px' }}>
      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div className="flex-grow-1">
          <div className="card-text text-muted">
            <strong>{t('form.fields.venueName.label')}:</strong> {caseGeneratorFormVacationRentalDto.create.formBasic.venueName}
          </div>
          <div className="card-text text-muted">
            <strong>{t('form.fields.fullAddress.label')}:</strong> {caseGeneratorFormVacationRentalDto.create.formBasic.fullAddress}
          </div>
          <div className="card-text text-muted mt-4">
            <strong>{t('generatingCard.created')}:</strong> {formattedDate}
          </div>
          <div className="card-text text-muted">
            <strong>{t('generatingCard.status')}:</strong> {statusLabel}
          </div>

          {caseGeneratorFormVacationRentalDto.create.formBasic.paymentLink ? (
            <div className="card-text text-muted mt-4 d-flex align-items-center">
              <strong>{t('generatingCard.subscription')}:</strong> <button className='btn btn-link p-0 ms-2' onClick={() => window.location.href = caseGeneratorFormVacationRentalDto.create.formBasic.paymentLink}>{t('generatingCard.nowComplete')}</button>
            </div>
          ) : (
            <div className="card-text text-muted mt-4">
              {t('generatingCard.description')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratingCaseCard;
