import { NotificationDto } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
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
        return "Autopsy Report";
      default:
        return "Report";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true, 
        locale: enUS 
      });
    } catch {
      return "Unknown";
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailListItem;