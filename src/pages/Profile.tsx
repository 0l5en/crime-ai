import Header from '@/components/Header';
import { useUserContext } from '@/contexts/UserContext';
import { useMyUserProfile } from '@/hooks/useMyUserProfile';
import { useMyUserProfilePassword } from '@/hooks/useMyUserProfilePassword';
import { format } from 'date-fns';
import { de, enUS, fr, it } from 'date-fns/locale';
import { Facebook, Lock, Mail, Share2, Twitter } from 'lucide-react';
import { useState } from 'react';
import { Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t, i18n } = useTranslation('profile');
  const user = useUserContext();
  const { data: userProfile } = useMyUserProfile();
  const requestUpdatePasswordMail = useMyUserProfilePassword();
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

              {/* Share Section */}
              <Card className="profile-card mt-4">
                <div className="card-body">
                  <h5 className="text-white mb-3 d-flex align-items-center gap-2">
                    <Share2 size={18} />
                    {t('shareSection.title')}
                  </h5>
                  <p className="analytics-text-secondary small mb-3">
                    {t('shareSection.description')}
                  </p>

                  <div className="d-grid gap-2">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(t('shareSection.shareText') + ' https://detectivesgame.com')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-whatsapp"></i>
                      WhatsApp
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://detectivesgame.com')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                    >
                      <Facebook size={16} />
                      Facebook
                    </a>

                    {/* Twitter/X */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://detectivesgame.com')}&text=${encodeURIComponent(t('shareSection.shareText'))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-info d-flex align-items-center justify-content-center gap-2"
                    >
                      <Twitter size={16} />
                      X (Twitter)
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:?subject=${encodeURIComponent(t('shareSection.emailSubject'))}&body=${encodeURIComponent(t('shareSection.shareText') + ' https://detectivesgame.com')}`}
                      className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                    >
                      <Mail size={16} />
                      E-Mail
                    </a>
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

                    <button
                      className="btn btn-danger w-100"
                      disabled={requestUpdatePasswordMail.isPending}
                      onClick={() => requestUpdatePasswordMail.mutate()}
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
