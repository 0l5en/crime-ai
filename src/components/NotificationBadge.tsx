import { useNotifications } from "@/hooks/useNotifications";
import { Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NotificationBadge = () => {
  const { data: notifications, isLoading, error } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isOnEmailPage = location.pathname === '/emails';

  const handleClick = () => {
    if (isOnEmailPage) {
      navigate(-1);
    } else {
      navigate('/emails');
    }
  };

  // Don't render anything if loading or error
  if (isLoading || error) {
    return null;
  }

  const unreadCount = notifications?.items?.filter(n => !n.read).length || 0;

  return (
    <button 
      className="nav-button position-relative"
      onClick={handleClick}
      style={{
        backgroundColor: isOnEmailPage ? 'hsl(var(--accent))' : 'transparent',
        transition: 'background-color 0.2s ease'
      }}
    >
      <Mail
        size={20}
        style={{ cursor: 'pointer' }}
      />
      {unreadCount > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{
            fontSize: '0.65rem',
            minWidth: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {unreadCount > 99 ? '99+' : unreadCount}
          <span className="visually-hidden">unread notifications</span>
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;