import { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { Lock } from 'lucide-react';
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
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Get user initials for avatar
  const initials = user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';
  
  // Get locale for date formatting
  const dateLocales = { de, en: enUS, fr, it };
  const currentLocale = dateLocales[i18n.language as keyof typeof dateLocales] || enUS;
  
  // Format registration date
  const registrationDate = userProfile?.createdAt 
    ? format(new Date(userProfile.createdAt), 'PP', { locale: currentLocale })
    : '-';

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
                </div>

                {/* Quick Stats */}
                <div className="profile-stats">
                  <div className="profile-stat-item">
                    <span className="profile-stat-label">{t('memberSince')}</span>
                    <span className="profile-stat-value">{registrationDate}</span>
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

                  {/* Password Change Section */}
                  <div className="mb-4">
                    <label className="form-label text-white d-flex align-items-center gap-2">
                      <Lock size={16} /> {t('password')}
                    </label>
                    
                    <div className="mb-3">
                      <label className="form-label text-white-50 small">{t('changePasswordModal.currentPassword')}</label>
                      <input 
                        type="password" 
                        className="form-control profile-input" 
                        placeholder="••••••••"
                        disabled
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label text-white-50 small">{t('changePasswordModal.newPassword')}</label>
                      <input 
                        type="password" 
                        className="form-control profile-input" 
                        placeholder="••••••••"
                        disabled
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label text-white-50 small">{t('changePasswordModal.confirmPassword')}</label>
                      <input 
                        type="password" 
                        className="form-control profile-input" 
                        placeholder="••••••••"
                        disabled
                      />
                    </div>
                    
                    <button 
                      className="btn btn-danger w-100"
                      disabled
                    >
                      {t('changePasswordModal.update')}
                    </button>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

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
