import Header from "@/components/Header";
import { useCountUserProfiles } from "@/hooks/useCountUserProfiles";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { components } from "@/openapi/crimeAiSchema";
import {
  ChevronDown, ChevronUp,
  Crown,
  Filter,
  Home,
  Search,
  Shield,
  User,
  UserCheck
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button, Collapse, Form, Modal } from "react-bootstrap";

type UserProfileDto = components['schemas']['UserProfileDto'];
type UserProfileFilterDto = components['schemas']['UserProfileFilterDto'];

const AdminUserManagement = () => {
  const [userProfileFilterDto, setUserProfileFilterDto] = useState<UserProfileFilterDto>({ firstResult: 0, maxResults: 10 });
  const { data: resultSetUserProfileDto, isPending: resultSetUserProfileDtoPending } = useUserProfiles(userProfileFilterDto);
  const { data: resultCountUserProfileDto, isPending: resultCountUserProfileDtoPending } = useCountUserProfiles(userProfileFilterDto);
  const pending = resultSetUserProfileDtoPending || resultCountUserProfileDtoPending;
  const inputRef = useRef(null);

  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfileDto | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const toggleExpand = (userName: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userName)) {
      newExpanded.delete(userName);
    } else {
      newExpanded.add(userName);
    }
    setExpandedUsers(newExpanded);
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete mutation
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleEditRoleSave = () => {
    // TODO: Implement update role mutation
    setShowEditRoleModal(true);
    setSelectedUser(null);
  };

  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'admin':
        return <Shield size={16} className="me-1" />;
      case 'standard':
        return <UserCheck size={16} className="me-1" />;
      case 'vacation-rental':
        return <Home size={16} className="me-1" />;
      default:
        return null;
    }
  };

  const getGroupBadgeClass = (group: string) => {
    switch (group) {
      case 'admin':
        return 'bg-danger';
      case 'standard':
        return 'bg-primary';
      case 'vacation-rental':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const updateSearchFilter = () => {
    setUserProfileFilterDto(current => ({ ...current, search: inputRef.current.value }));
  }

  useEffect(() => {
    if (inputRef.current && !pending) {
      inputRef.current.focus();
    }
  }, [pending]);

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />
      <div className="container py-5">

        {/* Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="display-5 fw-bold mb-2">
                  User Management
                </h1>
                <p className="analytics-text-secondary mb-0">
                  Manage users, roles, and permissions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter/Search Section */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="input-group">
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Search by username or email..."
                disabled={pending}
                onKeyDown={(e) => e.key === 'Enter' && updateSearchFilter()}
                style={{
                  height: '48px'
                }}
              />
              <button className="btn btn-secondary" onClick={() => updateSearchFilter()}><Search /></button>
            </div>
          </div>

          <div className="col-md-3">
            <div className="position-relative">
              <Filter
                className="position-absolute"
                size={20}
                style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8b92a7' }}
              />
              <select
                className="form-select ps-5"
                disabled={pending}
                value={userProfileFilterDto.groupName}
                onChange={(e) => setUserProfileFilterDto(current => ({ ...current, groupName: e.target.value !== 'all' ? e.target.value : undefined }))}
                style={{
                  height: '48px'
                }}
              >
                <option value="all">All Groups</option>
                <option value="admin">Admin</option>
                <option value="standard">Standard</option>
                <option value="vacation-rental">Vacation Rental</option>
              </select>
            </div>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              disabled={pending}
              value={userProfileFilterDto.enabled !== undefined ? userProfileFilterDto.enabled ? 'active' : 'inactive' : 'all'}
              onChange={(e) => setUserProfileFilterDto(current => ({ ...current, enabled: e.target.value === 'all' ? undefined : e.target.value === 'active' ? true : false }))}
              style={{
                height: '48px'
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="col-md-2 d-flex justify-content-end">
            <h1 className="me-1">{resultCountUserProfileDto && resultCountUserProfileDto.count}</h1>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="row g-4">
          {resultSetUserProfileDto && resultSetUserProfileDto.items?.map((user) => {
            const isExpanded = expandedUsers.has(user.userName);

            return (
              <div key={user.userName} className="col-12">
                <div className="card card-hover">
                  <div className="card-body">

                    {/* Card Header - Always Visible */}
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex align-items-center gap-3">
                        {/* Avatar */}
                        <div className="analytics-user-avatar">
                          <User size={32} />
                        </div>

                        {/* User Info */}
                        <div>
                          <h5 className="mb-1 fw-bold">{user.userName}</h5>
                          <small className="analytics-text-secondary">{user.email}</small>
                        </div>
                      </div>

                      {/* Status & Badges */}
                      <div className="d-flex align-items-center gap-2">
                        {user.groups.length > 0 &&
                          <>
                            <span className={`d-flex align-items-center badge ${getGroupBadgeClass(user.groups[0])}`}>
                              {getGroupIcon(user.groups[0])}
                              {user.groups[0]}
                            </span>
                            {user.groups.find(group => group === 'premium') && (
                              <Crown size={20} style={{ color: '#fbbf24' }} />
                            )}
                          </>
                        }
                        <span className={'analytics-status-dot' + (user.enabled ? '-enabled' : '-disabled')}></span>
                      </div>
                    </div>

                    {/* Collapsible Details */}
                    <Collapse in={isExpanded}>
                      <div className="mt-3 border " style={{ borderRadius: '10px' }}>
                        <div className="p-4">
                          <div className="row g-2">
                            <div className="col-6">
                              <small className="analytics-text-secondary d-block mb-1">Username</small>
                              <p className="mb-0 small">{user.userName}</p>
                            </div>
                            <div className="col-6">
                              <small className="analytics-text-secondary d-block mb-1">Registered</small>
                              <p className="mb-0 small">{formatDate(new Date(user.createdAt))}</p>
                            </div>
                            <div className="col-6">
                              <small className="analytics-text-secondary d-block mb-1">Total Cases</small>
                              <p className="mb-0 fw-bold">10</p>
                            </div>
                            <div className="col-6">
                              <small className="analytics-text-secondary d-block mb-1">Cases Solved</small>
                              <p className="mb-0 fw-bold">5</p>
                            </div>
                            <div className="col-6">
                              <small className="analytics-text-secondary d-block mb-1">Success Rate</small>
                              <p className="mb-0 fw-bold" style={{ color: 71 >= 70 ? '#10b981' : '#ef4444' }}>
                                71%
                              </p>
                            </div>
                            <div className="col-6">
                              <small className="analytics-text-secondary d-block mb-1">Status</small>
                              <p className="mb-0">
                                <span className={`badge ${user.enabled ? 'bg-success' : 'bg-secondary'}`}>
                                  {user.enabled ? 'Active' : 'Inactive'}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Collapse>

                    {/* Expand/Collapse Button */}
                    <button
                      className="btn btn-link w-100 text-center"
                      onClick={() => toggleExpand(user.userName)}
                      style={{ textDecoration: 'none', color: '#ef4444' }}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={18} className="me-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={18} className="me-1" />
                          Show More
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {resultSetUserProfileDto && resultSetUserProfileDto.items?.length === 0 && (
          <div className="text-center py-5">
            <User size={64} className="mb-3" style={{ color: '#8b92a7' }} />
            <h3 className="analytics-text-secondary">No users found</h3>
            <p className="analytics-text-secondary">Try adjusting your filters</p>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #2a2f3e' }}>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#1a1f2e' }}>
          <p>Are you sure you want to delete user <strong>{selectedUser?.userName}</strong>?</p>
          <p className="text-muted mb-0">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#1a1f2e', borderTop: '1px solid #2a2f3e' }}>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Role Modal */}
      <Modal
        show={showEditRoleModal}
        onHide={() => setShowEditRoleModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: '#1a1f2e', borderBottom: '1px solid #2a2f3e' }}>
          <Modal.Title>Edit User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#1a1f2e' }}>
          <p className="mb-3">Change role for user <strong>{selectedUser?.userName}</strong></p>
          <Form.Group>
            <Form.Label>Select Role</Form.Label>
            <Form.Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                backgroundColor: '#0a0e1a',
                border: '1px solid #2a2f3e',
                color: '#fff'
              }}
            >
              <option value="admin">Admin</option>
              <option value="standard">Standard</option>
              <option value="vacation-rental">Vacation Rental</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#1a1f2e', borderTop: '1px solid #2a2f3e' }}>
          <Button variant="secondary" onClick={() => setShowEditRoleModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditRoleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default AdminUserManagement;
