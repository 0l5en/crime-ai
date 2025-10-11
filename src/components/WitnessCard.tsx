import { useTranslation } from 'react-i18next';

interface WitnessCardProps {
  name: string;
  age: number;
  profession: string;
  maritalStatus: string;
  relationshipToCase: string;
  imageColor?: string;
  imageUrl?: string;
  onInterrogate?: () => void;
}

const WitnessCard = ({
  name,
  age,
  profession,
  maritalStatus,
  relationshipToCase,
  imageColor = 'bg-gradient-secondary',
  imageUrl,
  onInterrogate
}: WitnessCardProps) => {
  const { t } = useTranslation('caseDashboard');
  
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <div
      className="card border-secondary card-hover h-100 d-flex flex-column"
      data-testid="witness-card"
      data-witness-name={name}
    >
      <div className="card-header pb-3">
        <div className="d-flex align-items-center">
          <div className="me-3" style={{ width: '4rem', height: '4rem' }}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="rounded-circle object-fit-cover"
                style={{ width: '4rem', height: '4rem' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('d-none');
                }}
              />
            ) : null}
            <div className={`${imageColor} h-100 w-100 d-flex align-items-center justify-content-center rounded-circle ${imageUrl ? 'd-none' : ''}`}>
              <span className="fw-semibold">
                {getInitials(name)}
              </span>
            </div>
          </div>
          <div className="flex-grow-1">
            <h5 className="card-title mb-1" data-testid="witness-name">{name}</h5>
            <span className="badge text-bg-secondary" data-testid="witness-age">
              {age} {t('cards.years')}
            </span>
          </div>
        </div>
      </div>

      <div className="card-body d-flex flex-column gap-3 flex-grow-1">
        <div>
          <h4 className="small fw-medium text-muted mb-1">{t('cards.profession')}</h4>
          <p className="mb-0" data-testid="witness-profession">{profession}</p>
        </div>

        <div>
          <h4 className="small fw-medium text-muted mb-1">{t('cards.maritalStatus')}</h4>
          <p className="mb-0" data-testid="witness-marital-status">{maritalStatus}</p>
        </div>

        <div>
          <h4 className="small fw-medium text-muted mb-1">{t('cards.relationshipToCase')}</h4>
          <p className="small mb-0" data-testid="witness-relationship">{relationshipToCase}</p>
        </div>

        {onInterrogate && (
          <div className="pt-2 mt-auto">
            <button
              onClick={onInterrogate}
              className="btn btn-primary w-100"
              style={{ fontSize: '1.1rem', padding: '0.625rem 1rem' }}
              data-testid="witness-interrogate-button"
            >
              {t('cards.interrogate')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WitnessCard;
