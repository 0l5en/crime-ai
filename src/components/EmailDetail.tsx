import { NotificationDto } from "@/hooks/useNotifications";
import { useUpdateNotification } from "@/hooks/useUpdateNotification";
import { useAutopsyReports } from "@/hooks/useAutopsyReports";
import { useCrimeScene } from "@/hooks/useCrimeScene";
import { formatDistanceToNow, format } from "date-fns";
import { de } from "date-fns/locale";
import { Button, Card, Alert, Spinner, Badge } from "react-bootstrap";
import { Mail, Clock, User, CheckCircle } from "lucide-react";
import { useState } from "react";

interface EmailDetailProps {
  email: NotificationDto | null;
}

const EmailDetail = ({ email }: EmailDetailProps) => {
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
  const updateNotification = useUpdateNotification();

  // Extract IDs from email for content loading
  const reportAuthorId = email ? parseInt(email.recipientId) : undefined;
  const victimId = 1; // This would need to be extracted from the email context
  
  const { data: autopsyReports, isLoading: loadingAutopsy } = useAutopsyReports(
    email?.notificationContextType === "AUTOPSY_REPORT" ? reportAuthorId : undefined,
    email?.notificationContextType === "AUTOPSY_REPORT" ? victimId : undefined
  );

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
        if (loadingAutopsy) {
          return (
            <div className="d-flex justify-content-center p-4">
              <Spinner animation="border" size="sm" />
              <span className="ms-2">Autopsiebericht wird geladen...</span>
            </div>
          );
        }
        
        if (autopsyReports?.items && autopsyReports.items.length > 0) {
          const report = autopsyReports.items[0];
          return (
            <Card className="mt-3">
              <Card.Header>
                <h6 className="mb-0">Autopsiebericht</h6>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <strong>Todesursache:</strong>
                    <p>{report.causeOfDeath || "Nicht angegeben"}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Todeszeitpunkt:</strong>
                    <p>{report.timeOfDeathFrom && report.timeOfDeathTo 
                      ? `${report.timeOfDeathFrom} - ${report.timeOfDeathTo}` 
                      : "Nicht angegeben"}</p>
                  </div>
                </div>
                <div>
                  <strong>Äußere Untersuchung:</strong>
                  <p>{report.externalExamination || "Keine Angaben"}</p>
                </div>
                <div>
                  <strong>Innere Untersuchung:</strong>
                  <p>{report.internalExamination || "Keine Angaben"}</p>
                </div>
                <div>
                  <strong>Schlussfolgerungen:</strong>
                  <p>{report.conclusionsAndAssessment || "Keine Schlussfolgerungen"}</p>
                </div>
              </Card.Body>
            </Card>
          );
        }
        
        return (
          <Alert variant="info" className="mt-3">
            Autopsiebericht ist noch nicht verfügbar oder wird gerade erstellt.
          </Alert>
        );
        
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