import { useCaseSubscription } from '@/hooks/useCaseSubscription';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  caseId: string;
  userId?: string;
  difficulty?: 'Leicht' | 'Mittel' | 'Schwer';
  estimatedTime?: string;
  onClick?: () => void;
  hideDescription?: boolean;
  averageRating?: number;
  ratingCount?: number;
  showSubscriptionInfo?: boolean;
  subscriptionId?: string;
}

const GameCard = ({
  title,
  description,
  imageUrl,
  caseId,
  userId,
  difficulty = 'Mittel',
  estimatedTime = '30-45 min',
  onClick,
  hideDescription = false,
  averageRating,
  ratingCount,
  showSubscriptionInfo = false,
  subscriptionId
}: GameCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation('cases');
  const { t: tDashboard } = useTranslation('vacationRentalDashboard');

  const { data: subscription, isLoading: subscriptionLoading } = useCaseSubscription(
    showSubscriptionInfo ? caseId : undefined
  );

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(`/case/${caseId}`);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Leicht': return 'text-success';
      case 'Mittel': return 'text-warning';
      case 'Schwer': return 'text-danger';
      default: return 'text-secondary';
    }
  };

  return (
    <div
      className="card border-secondary card-hover h-100"
      onClick={handleCardClick}
      data-testid="case-card"
      data-case-id={caseId}
      style={{ cursor: 'pointer' }}
    >
      <img className="card-img-top" src={imageUrl} alt="Crime case image"></img>
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title mb-0" data-testid="case-title">{title}</h5>
          {showSubscriptionInfo && subscriptionId && (
            <span className="badge bg-info text-dark ms-2 flex-shrink-0">
              ID: {subscriptionId.slice(0, 8)}
            </span>
          )}
        </div>

        {!hideDescription && (
          <p className="card-text text-muted flex-grow-1 mb-4" data-testid="case-description" style={{ textAlign: 'justify' }}>
            {description}
          </p>
        )}

        {/* Subscription Info oder Rating Display */}
        {showSubscriptionInfo ? (
          <div className="mt-auto">
            {/* Subscription Status */}
            {subscription?.testPeriodEnd && new Date(subscription.testPeriodEnd).getTime() > new Date().getTime() && (
              <p className="text-warning small mb-2">
                <i className="bi bi-clock me-1"></i>
                {tDashboard('subscription.trialEnds')} {formatDate(subscription.testPeriodEnd)}
              </p>
            )}
            {subscription?.subscriptionPeriodEnd && !subscription?.canceled && (
              <p className="text-success small mb-2">
                <i className="bi bi-check-circle me-1"></i>
                {tDashboard('subscription.activeUntil')} {formatDate(subscription.subscriptionPeriodEnd)}
              </p>
            )}
            {subscription?.canceled && (
              <p className="text-danger small mb-2">
                <i className="bi bi-x-circle me-1"></i>
                {tDashboard('subscription.canceled')}{' '}{subscription?.subscriptionPeriodEnd && formatDate(subscription.subscriptionPeriodEnd)}
              </p>
            )}

            {/* Manage Button - immer anzeigen */}
            <a
              href="https://billing.stripe.com/p/login/dRm5kDfTF1He6gf3Dv67S00"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-lg w-100 mt-3 fs-5"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="bi bi-gear me-2"></i>
              {tDashboard('subscription.manageButton')}
            </a>
          </div>
        ) : (
          <>
            {/* Rating Display - nur wenn vorhanden */}
            {(averageRating !== undefined && averageRating > 0) || (ratingCount !== undefined && ratingCount > 0) ? (
              <div className="mt-auto">
                <StarRating
                  rating={averageRating || 0}
                  readonly={true}
                  size={16}
                  showCount={true}
                  count={ratingCount || 0}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;
