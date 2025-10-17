import { useTranslation } from 'react-i18next';

interface AddCaseCardProps {
  onClick: () => void;
}

const AddCaseCard = ({ onClick }: AddCaseCardProps) => {
  const { t } = useTranslation('vacationRentalDashboard');
  
  return (
    <div
      className="card border-secondary card-hover h-100 d-flex align-items-center justify-content-center"
      onClick={onClick}
      style={{ cursor: 'pointer', minHeight: '400px' }}
    >
      <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
        <div className="mb-3">
          <i className="bi bi-plus-circle display-1 text-danger"></i>
        </div>
        <h5 className="card-title mb-2">{t('addCaseCard.title')}</h5>
        <p className="card-text text-muted">
          {t('addCaseCard.description')}
        </p>
      </div>
    </div>
  );
};

export default AddCaseCard;