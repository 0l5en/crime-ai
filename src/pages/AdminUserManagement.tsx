import Header from "@/components/Header";
import { useState } from "react";
import { 
  User, Crown, Edit, Trash2, ChevronDown, ChevronUp, 
  Search, Filter, Shield, UserCheck, Home 
} from "lucide-react";
import { Modal, Button, Form, Collapse } from "react-bootstrap";

interface UserData {
  id: string;
  username: string;
  email: string;
  roles: string[];
  registeredAt: Date;
  accountType: 'free' | 'premium';
  lastActivity: Date;
  totalCases: number;
  solvedCases: number;
  successRate: number;
  isActive: boolean;
}

// Placeholder data for initial display
const mockUsers: UserData[] = [
  {
    id: '1',
    username: 'admin_user',
    email: 'admin@detectivesgame.com',
    roles: ['admin'],
    registeredAt: new Date('2024-01-15'),
    accountType: 'premium',
    lastActivity: new Date('2025-01-10'),
    totalCases: 45,
    solvedCases: 38,
    successRate: 84,
    isActive: true,
  },
  {
    id: '2',
    username: 'john_detective',
    email: 'john@example.com',
    roles: ['standard'],
    registeredAt: new Date('2024-06-20'),
    accountType: 'premium',
    lastActivity: new Date('2025-01-09'),
    totalCases: 23,
    solvedCases: 19,
    successRate: 83,
    isActive: true,
  },
  {
    id: '3',
    username: 'sarah_holmes',
    email: 'sarah@example.com',
    roles: ['standard'],
    registeredAt: new Date('2024-08-10'),
    accountType: 'free',
    lastActivity: new Date('2025-01-08'),
    totalCases: 12,
    solvedCases: 8,
    successRate: 67,
    isActive: true,
  },
  {
    id: '4',
    username: 'rental_manager',
    email: 'rental@example.com',
    roles: ['vacation-rental'],
    registeredAt: new Date('2024-09-05'),
    accountType: 'premium',
    lastActivity: new Date('2025-01-07'),
    totalCases: 8,
    solvedCases: 6,
    successRate: 75,
    isActive: true,
  },
  {
    id: '5',
    username: 'mystery_solver',
    email: 'mystery@example.com',
    roles: ['standard'],
    registeredAt: new Date('2024-11-12'),
    accountType: 'free',
    lastActivity: new Date('2024-12-20'),
    totalCases: 5,
    solvedCases: 2,
    successRate: 40,
    isActive: false,
  },
  {
    id: '6',
    username: 'elite_detective',
    email: 'elite@example.com',
    roles: ['standard'],
    registeredAt: new Date('2024-03-22'),
    accountType: 'premium',
    lastActivity: new Date('2025-01-11'),
    totalCases: 67,
    solvedCases: 61,
    successRate: 91,
    isActive: true,
  },
];

const AdminUserManagement = () => {
  const [users] = useState<UserData[]>(mockUsers);
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const toggleExpand = (userId: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const handleDeleteClick = (user: UserData) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleEditRoleClick = (user: UserData) => {
    setSelectedUser(user);
    setSelectedRole(user.roles[0]);
    setShowEditRoleModal(true);
  };

  const handleDeleteConfirm = () => {
    // TODO: Implement delete mutation
    console.log('Deleting user:', selectedUser?.id);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleEditRoleSave = () => {
    // TODO: Implement update role mutation
    console.log('Updating role for user:', selectedUser?.id, 'to', selectedRole);
    setShowEditRoleModal(true);
    setSelectedUser(null);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
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

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.roles.includes(roleFilter);
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive) ||
      (statusFilter === 'premium' && user.accountType === 'premium') ||
      (statusFilter === 'free' && user.accountType === 'free');
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <>
      <Header />
      <div className="analytics-page">
        <div className="container-fluid" style={{ maxWidth: '1600px' }}>
          
          {/* Header */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h1 className="display-5 fw-bold mb-2 analytics-text-primary">
                    User Management
                  </h1>
                  <p className="analytics-text-secondary mb-0">
                    Manage users, roles, and permissions
                  </p>
                </div>
                <div className="analytics-kpi-badge">
                  {filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'}
                </div>
              </div>
            </div>
          </div>

          {/* Filter/Search Section */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="position-relative">
                <Search 
                  className="position-absolute" 
                  size={20} 
                  style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8b92a7' }}
                />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by username or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backgroundColor: '#1a1f2e',
                    border: '1px solid #2a2f3e',
                    color: '#fff',
                    height: '48px'
                  }}
                />
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
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  style={{
                    backgroundColor: '#1a1f2e',
                    border: '1px solid #2a2f3e',
                    color: '#fff',
                    height: '48px'
                  }}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="standard">Standard</option>
                  <option value="vacation-rental">Vacation Rental</option>
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  backgroundColor: '#1a1f2e',
                  border: '1px solid #2a2f3e',
                  color: '#fff',
                  height: '48px'
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="premium">Premium</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>

          {/* User Cards Grid */}
          <div className="row g-4">
            {filteredUsers.map((user) => {
              const isExpanded = expandedUsers.has(user.id);
              
              return (
                <div key={user.id} className="col-lg-6">
                  <div className="card analytics-user-card">
                    <div className="card-body">
                      
                      {/* Card Header - Always Visible */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center gap-3">
                          {/* Avatar */}
                          <div className="analytics-user-avatar">
                            <User size={32} />
                          </div>
                          
                          {/* User Info */}
                          <div>
                            <h5 className="mb-1 fw-bold">{user.username}</h5>
                            <small className="analytics-text-secondary">{user.email}</small>
                          </div>
                        </div>
                        
                        {/* Status & Badges */}
                        <div className="d-flex align-items-center gap-2">
                          <span className={`badge ${getRoleBadgeClass(user.roles[0])}`}>
                            {getRoleIcon(user.roles[0])}
                            {user.roles[0]}
                          </span>
                          {user.accountType === 'premium' && (
                            <Crown size={20} style={{ color: '#fbbf24' }} />
                          )}
                          {user.isActive && <span className="analytics-status-dot"></span>}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="d-flex gap-2 mb-3">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditRoleClick(user)}
                        >
                          <Edit size={14} className="me-1" /> Edit Role
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <Trash2 size={14} className="me-1" /> Delete
                        </button>
                      </div>
                      
                      {/* Collapsible Details */}
                      <Collapse in={isExpanded}>
                        <div>
                          <div className="analytics-user-details">
                            <div className="row g-3">
                              <div className="col-6">
                                <small className="analytics-text-secondary d-block mb-1">User ID</small>
                                <p className="mb-0 small">{user.id}</p>
                              </div>
                              <div className="col-6">
                                <small className="analytics-text-secondary d-block mb-1">Registered</small>
                                <p className="mb-0 small">{formatDate(user.registeredAt)}</p>
                              </div>
                              <div className="col-6">
                                <small className="analytics-text-secondary d-block mb-1">Last Activity</small>
                                <p className="mb-0 small">{formatDate(user.lastActivity)}</p>
                              </div>
                              <div className="col-6">
                                <small className="analytics-text-secondary d-block mb-1">Account Type</small>
                                <p className="mb-0">
                                  <span className={`badge ${user.accountType === 'premium' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                                    {user.accountType === 'premium' ? 'Premium' : 'Free'}
                                  </span>
                                </p>
                              </div>
                              <div className="col-6">
                                <small className="analytics-text-secondary d-block mb-1">Total Cases</small>
                                <p className="mb-0 fw-bold">{user.totalCases}</p>
                              </div>
                              <div className="col-6">
                                <small className="analytics-text-secondary d-block mb-1">Cases Solved</small>
                                <p className="mb-0 fw-bold">{user.solvedCases}</p>
                              </div>
                              <div className="col-6">
                                <small className="analytics-text-secondary d-block mb-1">Success Rate</small>
                                <p className="mb-0 fw-bold" style={{ color: user.successRate >= 70 ? '#10b981' : '#ef4444' }}>
                                  {user.successRate}%
                                </p>
                              </div>
                              <div className="col-6">
                                <small className="analytics-text-secondary d-block mb-1">Status</small>
                                <p className="mb-0">
                                  <span className={`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                      
                      {/* Expand/Collapse Button */}
                      <button 
                        className="btn btn-link w-100 text-center p-2 mt-2"
                        onClick={() => toggleExpand(user.id)}
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
          {filteredUsers.length === 0 && (
            <div className="text-center py-5">
              <User size={64} className="mb-3" style={{ color: '#8b92a7' }} />
              <h3 className="analytics-text-secondary">No users found</h3>
              <p className="analytics-text-secondary">Try adjusting your filters</p>
            </div>
          )}

        </div>
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
          <p>Are you sure you want to delete user <strong>{selectedUser?.username}</strong>?</p>
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
          <p className="mb-3">Change role for user <strong>{selectedUser?.username}</strong></p>
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
    </>
  );
};

export default AdminUserManagement;
