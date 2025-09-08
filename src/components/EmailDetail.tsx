import { NotificationDto } from "@/hooks/useNotifications";
import { useUpdateNotification } from "@/hooks/useUpdateNotification";
import { format, formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { CheckCircle, Clock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import AutopsyReportCard from "./AutopsyReportCard";

interface EmailDetailProps {
  email: NotificationDto | null;
}

const EmailDetail = ({ email }: EmailDetailProps) => {
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
  const updateNotification = useUpdateNotification();

  if (!email) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted">
        <Mail size={64} className="mb-3 opacity-50" />
        <h5>E-Mail auswählen</h5>
        <p>Wählen Sie eine E-Mail aus der Liste aus, um deren Inhalt anzuzeigen.</p>
      </div>
    );
  }

  const handleMarkAsRead = async () => {
    if (email.read || isMarkingAsRead) return;

    setIsMarkingAsRead(true);
    try {
      await updateNotification.mutateAsync({
        ...email,
        read: true
      });
    } catch (error) {
      console.error("Error marking email as read:", error);
    } finally {
      setIsMarkingAsRead(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        full: format(date, "dd.MM.yyyy 'um' HH:mm", { locale: de }),
        relative: formatDistanceToNow(date, { addSuffix: true, locale: de })
      };
    } catch {
      return { full: "Unbekannt", relative: "Unbekannt" };
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
              <p>Inhalt für diesen Berichtstyp ist noch nicht implementiert.</p>
            </Card.Body>
          </Card>
        );
    }
  };

  const dateTime = formatDateTime(email.createdAt);

  return (
    <div className="email-detail h-100">
      <div className="email-header p-4 bg-white border-bottom sticky-top">
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
            {!email.read && (
              <Badge bg="primary" className="me-2">
                Ungelesen
              </Badge>
            )}

            {!email.read && (
              <Button
                variant="outline-success"
                size="sm"
                onClick={handleMarkAsRead}
                disabled={isMarkingAsRead}
                className="d-flex align-items-center"
              >
                <CheckCircle size={16} className="me-1" />
                {isMarkingAsRead ? "Wird markiert..." : "Als gelesen markieren"}
              </Button>
            )}
          </div>
        </div>

        <div className="email-meta">
          <small className="text-muted">
            Gesendet am {dateTime.full}
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