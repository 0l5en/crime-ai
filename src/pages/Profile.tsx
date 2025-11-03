import { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { Lock, Crown, Copy, Check } from 'lucide-react';
import Header from '@/components/Header';
import { useUserContext } from '@/contexts/UserContext';
import { useTranslation } from 'react-i18next';
import { useMyUserProfile } from '@/hooks/useMyUserProfile';
import { format } from 'date-fns';
import { de, enUS, fr, it } from 'date-fns/locale';

const Profile = () => {
  const { t, i18n } = useTranslation('profile');
  const user = useUserContext();
  const { data: userProfile } = useMyUserProfile();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get user initials for avatar
  const initials = user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';
  
  // TODO: Replace with actual premium status check
  const isPremium = user.hasAnyRole('admin'); // Placeholder
  
  // Generate referral link
  const referralLink = `${window.location.origin}/?ref=${user.email}`;
  
  // Get locale for date formatting
  const dateLocales = { de, en: enUS, fr, it };
  const currentLocale = dateLocales[i18n.language as keyof typeof dateLocales] || enUS;
  
  // Format registration date
  const registrationDate = userProfile?.createdAt 
    ? format(new Date(userProfile.createdAt), 'PP', { locale: currentLocale })
    : '-';
  
  // TODO: Replace with actual last activity data
  const lastActivity = t('lastActivity') === 'Last Activity' ? 'Today' : 'Heute';

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <div className="profile-page" style={{ backgroundColor: '#000000' }}>
        <Container>
          {/* Page Header */}
          <Row className="mb-4">
            <Col>
              <h1 className="text-white">{t('title')}</h1>
              <p className="analytics-text-secondary">{t('subtitle')}</p>
            </Col>
          </Row>

          {/* Profile Content - 2 Column Layout */}
          <Row className="g-4">
            {/* Left Column: Avatar & Basic Info */}
            <Col lg={4}>
              <Card className="profile-card">
                {/* Avatar Section */}
                <div className="profile-avatar-section">
                  <div className="profile-avatar-large">
                    {initials}
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-danger mt-3"
                    onClick={() => setShowAvatarModal(true)}
                  >
                    {t('changeAvatar')}
                  </button>
                </div>

                {/* Basic Info */}
                <div className="profile-info">
                  <h3>{user.name || 'User'}</h3>
                  <p className="text-muted">{user.email}</p>

                  {/* Subscription Badge */}
                  <span className={`badge ${isPremium ? 'profile-badge-premium' : 'profile-badge-free'}`}>
                    {isPremium ? t('premiumMember') : t('freePlan')}
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="profile-stats">
                  <div className="profile-stat-item">
                    <span className="profile-stat-label">{t('memberSince')}</span>
                    <span className="profile-stat-value">{registrationDate}</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-label">{t('lastActivity')}</span>
                    <span className="profile-stat-value">{lastActivity}</span>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Right Column: Settings & Actions */}
            <Col lg={8}>
              {/* Account Settings Card */}
              <Card className="profile-card mb-4">
                <div className="card-body">
                  <h4 className="mb-4 text-white">{t('accountSettings')}</h4>

                  {/* Email (read-only) */}
                  <div className="mb-4">
                    <label className="form-label text-white">{t('emailAddress')}</label>
                    <input
                      type="email"
                      className="form-control profile-input"
                      value={user.email}
                      disabled
                    />
                  </div>

                  {/* Change Password Button */}
                  <div className="mb-4">
                    <label className="form-label text-white">{t('password')}</label>
                    <button
                      className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      <Lock size={16} /> {t('changePassword')}
                    </button>
                  </div>
                </div>
              </Card>

              {/* Subscription Card */}
              <Card className="profile-card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0 text-white">{t('subscription')}</h4>
                    <span className={`badge ${isPremium ? 'profile-badge-premium' : 'profile-badge-free'}`}>
                      {isPremium ? t('premiumMember') : t('freePlan')}
                    </span>
                  </div>

                  {!isPremium && (
                    <>
                      <p className="analytics-text-secondary mb-3">
                        {t('upgradeText')}
                      </p>
                      <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2">
                        <Crown size={16} /> {t('upgradeToPremium')}
                      </button>
                    </>
                  )}

                  {isPremium && (
                    <div className="profile-premium-info">
                      <p className="analytics-text-secondary mb-2">
                        {t('premiumInfo')}
                      </p>
                      <button className="btn btn-outline-secondary w-100">
                        {t('manageSubscription')}
                      </button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Referral Card */}
              <Card className="profile-card mb-4">
                <div className="card-body">
                  <h4 className="mb-3 text-white">{t('referralLink')}</h4>
                  <p className="analytics-text-secondary mb-3">
                    {t('referralText')}
                  </p>

                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control profile-input"
                      value={referralLink}
                      readOnly
                    />
                    <button
                      className="btn btn-danger d-flex align-items-center gap-2"
                      onClick={copyReferralLink}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? t('copied') : t('copy')}
                    </button>
                  </div>
                </div>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>

      {/* Change Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('changePasswordModal.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">{t('changePasswordModal.currentPassword')}</label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('changePasswordModal.newPassword')}</label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('changePasswordModal.confirmPassword')}</label>
              <input type="password" className="form-control" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
            {t('changePasswordModal.cancel')}
          </button>
          <button className="btn btn-danger">
            {t('changePasswordModal.update')}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Change Avatar Modal */}
      <Modal show={showAvatarModal} onHide={() => setShowAvatarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('changeAvatarModal.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <p className="text-muted mb-3">{t('changeAvatarModal.message')}</p>
            <div className="profile-avatar-large mx-auto">
              {initials}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowAvatarModal(false)}>
            {t('changeAvatarModal.close')}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
