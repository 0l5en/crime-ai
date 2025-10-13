import { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { Lock, Crown, Copy, Check, FileText, CheckCircle, TrendingUp, Users } from 'lucide-react';
import Header from '@/components/Header';
import { useUserContext } from '@/contexts/UserContext';

const Profile = () => {
  const user = useUserContext();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get user initials for avatar
  const initials = user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';
  
  // TODO: Replace with actual premium status check
  const isPremium = user.hasAnyRole('admin'); // Placeholder
  
  // Generate referral link
  const referralLink = `${window.location.origin}/?ref=${user.email}`;
  
  // TODO: Replace with actual API data
  const registrationDate = "Jan 2024";
  const lastActivity = "Today";

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <Container>
          {/* Page Header */}
          <Row className="mb-4">
            <Col>
              <h1 className="text-white">My Profile</h1>
              <p className="analytics-text-secondary">Manage your account settings</p>
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
                    Change Avatar
                  </button>
                </div>

                {/* Basic Info */}
                <div className="profile-info">
                  <h3>{user.name || 'User'}</h3>
                  <p className="text-muted">{user.email}</p>

                  {/* Subscription Badge */}
                  <span className={`badge ${isPremium ? 'profile-badge-premium' : 'profile-badge-free'}`}>
                    {isPremium ? 'Premium' : 'Free'}
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="profile-stats">
                  <div className="profile-stat-item">
                    <span className="profile-stat-label">Member Since</span>
                    <span className="profile-stat-value">{registrationDate}</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="profile-stat-label">Last Activity</span>
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
                  <h4 className="mb-4 text-white">Account Settings</h4>

                  {/* Email (read-only) */}
                  <div className="mb-4">
                    <label className="form-label text-white">Email Address</label>
                    <input
                      type="email"
                      className="form-control profile-input"
                      value={user.email}
                      disabled
                    />
                  </div>

                  {/* Change Password Button */}
                  <div className="mb-4">
                    <label className="form-label text-white">Password</label>
                    <button
                      className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      <Lock size={16} /> Change Password
                    </button>
                  </div>
                </div>
              </Card>

              {/* Subscription Card */}
              <Card className="profile-card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0 text-white">Subscription</h4>
                    <span className={`badge ${isPremium ? 'profile-badge-premium' : 'profile-badge-free'}`}>
                      {isPremium ? 'Premium Member' : 'Free Plan'}
                    </span>
                  </div>

                  {!isPremium && (
                    <>
                      <p className="analytics-text-secondary mb-3">
                        Upgrade to Premium to unlock exclusive cases, advanced features, and more!
                      </p>
                      <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2">
                        <Crown size={16} /> Upgrade to Premium
                      </button>
                    </>
                  )}

                  {isPremium && (
                    <div className="profile-premium-info">
                      <p className="analytics-text-secondary mb-2">
                        You're currently enjoying all Premium features!
                      </p>
                      <button className="btn btn-outline-secondary w-100">
                        Manage Subscription
                      </button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Referral Card */}
              <Card className="profile-card mb-4">
                <div className="card-body">
                  <h4 className="mb-3 text-white">Referral Link</h4>
                  <p className="analytics-text-secondary mb-3">
                    Share your unique link and earn rewards!
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
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </Card>

              {/* Statistics Card */}
              <Card className="profile-card">
                <div className="card-body">
                  <h4 className="mb-4 text-white">Your Statistics</h4>

                  <Row className="g-3">
                    <Col sm={6}>
                      <div className="profile-stat-box">
                        <div className="profile-stat-icon">
                          <FileText size={24} />
                        </div>
                        <div className="profile-stat-content">
                          <span className="profile-stat-value">24</span>
                          <span className="profile-stat-label">Cases Played</span>
                        </div>
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div className="profile-stat-box">
                        <div className="profile-stat-icon">
                          <CheckCircle size={24} />
                        </div>
                        <div className="profile-stat-content">
                          <span className="profile-stat-value">18</span>
                          <span className="profile-stat-label">Cases Solved</span>
                        </div>
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div className="profile-stat-box">
                        <div className="profile-stat-icon">
                          <TrendingUp size={24} />
                        </div>
                        <div className="profile-stat-content">
                          <span className="profile-stat-value">75%</span>
                          <span className="profile-stat-label">Success Rate</span>
                        </div>
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div className="profile-stat-box">
                        <div className="profile-stat-icon">
                          <Users size={24} />
                        </div>
                        <div className="profile-stat-content">
                          <span className="profile-stat-value">3</span>
                          <span className="profile-stat-label">Referrals</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Change Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm New Password</label>
              <input type="password" className="form-control" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
            Cancel
          </button>
          <button className="btn btn-danger">
            Update Password
          </button>
        </Modal.Footer>
      </Modal>

      {/* Change Avatar Modal */}
      <Modal show={showAvatarModal} onHide={() => setShowAvatarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <p className="text-muted mb-3">Avatar upload functionality will be available soon.</p>
            <div className="profile-avatar-large mx-auto">
              {initials}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowAvatarModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
