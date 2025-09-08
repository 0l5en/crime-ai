import { Mail } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { useNavigate } from "react-router-dom";

const NotificationBadge = () => {
  const { data: notifications, isLoading, error } = useNotifications();
  const navigate = useNavigate();

  // Don't render anything if loading or error
  if (isLoading || error) {
    return null;
  }

  const unreadCount = notifications?.items?.filter(n => !n.read).length || 0;

  return (
    <div className="position-relative" onClick={() => navigate('/emails')}>
      <Mail 
        size={20} 
        className="text-light" 
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
    </div>
  );
};

export default NotificationBadge;