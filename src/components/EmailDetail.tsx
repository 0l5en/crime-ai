import { NotificationDto } from "@/hooks/useNotifications";
import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Clock, Mail, Reply, User } from "lucide-react";
import { Button, Card } from "react-bootstrap";
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
              <span>{email.nameOfSender}</span>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <Button
              variant="outline-primary"
              size="sm"
              className="d-flex align-items-center"
              onClick={() => console.log('Reply clicked')} // Placeholder functionality
            >
              <Reply size={16} className="me-1" />
              Reply
            </Button>
          </div>
        </div>

      </div>

      <div className="email-content p-4">
        {getEmailContent()}
      </div>
    </div>
  );
};

export default EmailDetail;