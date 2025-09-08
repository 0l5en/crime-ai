import { NotificationDto } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { FileText, Stethoscope } from "lucide-react";

interface EmailListItemProps {
  email: NotificationDto;
  isSelected: boolean;
  onClick: () => void;
}

const EmailListItem = ({ email, isSelected, onClick }: EmailListItemProps) => {
  const getIcon = () => {
    switch (email.notificationContextType) {
      case "AUTOPSY_REPORT":
        return <Stethoscope size={16} className="text-primary" />;
      default:
        return <FileText size={16} className="text-secondary" />;
    }
  };

  const getTypeLabel = () => {
    switch (email.notificationContextType) {
      case "AUTOPSY_REPORT":
        return "Autopsiebericht";
      default:
        return "Bericht";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true, 
        locale: de 
      });
    } catch {
      return "Unbekannt";
    }
  };

  const truncateSubject = (subject: string, maxLength: number = 40) => {
    if (subject.length <= maxLength) return subject;
    return subject.substring(0, maxLength) + "...";
  };

  return (
    <div
      className={`list-group-item list-group-item-action p-3 border-0 ${
        isSelected ? 'active' : ''
      } ${!email.read ? 'border-start border-primary border-3' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="d-flex align-items-start">
        <div className="me-2 mt-1">
          {getIcon()}
        </div>
        
        <div className="flex-grow-1 min-w-0">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <h6 className={`mb-0 ${!email.read ? 'fw-bold' : ''}`}>
              {email.nameOfSender}
            </h6>
            <small className={`text-muted ${!email.read ? 'fw-bold' : ''}`}>
              {formatDate(email.createdAt)}
            </small>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-1">
            <p className={`mb-0 text-truncate ${!email.read ? 'fw-bold' : ''}`} 
               title={email.subject}>
              {truncateSubject(email.subject)}
            </p>
            {!email.read && (
              <span className="badge bg-primary rounded-pill ms-2">
                <i className="bi bi-circle-fill" style={{ fontSize: '6px' }}></i>
              </span>
            )}
          </div>
          
          <small className="text-muted">
            {getTypeLabel()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default EmailListItem;