import { NotificationDto } from "@/hooks/useNotifications";
import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Clock, Mail, User } from "lucide-react";
import { Card } from "react-bootstrap";
import AutopsyReportCard from "./AutopsyReportCard";

interface EmailDetailProps {
  email: NotificationDto | null;
}

const EmailDetail = ({ email }: EmailDetailProps) => {

  if (!email) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted">
        <Mail size={64} className="mb-3 opacity-50" />
        <h5>Select an Email</h5>
        <p>Select an email from the list to view its content.</p>
      </div>
    );
  }

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        full: format(date, "MM/dd/yyyy 'at' HH:mm", { locale: enUS }),
        relative: formatDistanceToNow(date, { addSuffix: true, locale: enUS })
      };
    } catch {
      return { full: "Unknown", relative: "Unknown" };
    }
  };

  const getEmailContent = () => {
    switch (email.notificationContextType) {
      case "AUTOPSY_REPORT":
        return <AutopsyReportCard notification={email} />
      default:
        return (
          <Card className="mt-3">
            <Card.Body>
              <p>Content for this report type is not yet implemented.</p>
            </Card.Body>
          </Card>
        );
    }
  };

  const dateTime = formatDateTime(email.createdAt);

  return (
    <div className="email-detail h-100">
      <div className="email-header p-4 border-bottom sticky-top" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 className="mb-1">{email.subject}</h4>
            <div className="d-flex align-items-center text-muted">
              <User size={16} className="me-2" />
              <span className="me-3">{email.nameOfSender}</span>
              <Clock size={16} className="me-2" />
              <span title={dateTime.full}>{dateTime.relative}</span>
            </div>
          </div>

          <div className="d-flex align-items-center">
            {/* Removed manual mark as read functionality - emails are auto-marked when clicked */}
          </div>
        </div>

        <div className="email-meta">
          <small className="text-muted">
            Sent on {dateTime.full}
          </small>
        </div>
      </div>

      <div className="email-content p-4">
        {getEmailContent()}
      </div>
    </div>
  );
};

export default EmailDetail;