import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GeneratingCaseCardProps {
  attemptId: number;
  created: string;
}

const GeneratingCaseCard = ({ attemptId, created }: GeneratingCaseCardProps) => {
  const { t } = useTranslation('vacationRentalDashboard');
  const createdDate = new Date(created);
  const formattedDate = format(createdDate, 'dd.MM.yyyy HH:mm');

  return (
    <div className="card bg-dark border-secondary text-light h-100" style={{ minHeight: '400px' }}>
      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center mb-3">
            <Loader2 className="me-2 animate-spin" size={20} />
            <h5 className="card-title mb-0 text-light">{t('generatingCard.title', { id: attemptId })}</h5>
          </div>
          <p className="card-text text-muted mb-2">
            <strong>{t('generatingCard.status')}:</strong> {t('generatingCard.statusInProgress')}
          </p>
          <p className="card-text text-muted mb-4">
            <strong>{t('generatingCard.created')}:</strong> {formattedDate}
          </p>
          <p className="card-text text-muted" style={{ textAlign: 'justify' }}>
            {t('generatingCard.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneratingCaseCard;
