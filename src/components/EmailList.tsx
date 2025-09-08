import { useNotifications, NotificationDto } from "@/hooks/useNotifications";
import EmailListItem from "./EmailListItem";
import { Alert, Spinner } from "react-bootstrap";

interface EmailListProps {
  selectedEmail: NotificationDto | null;
  onSelectEmail: (email: NotificationDto) => void;
}

const EmailList = ({ selectedEmail, onSelectEmail }: EmailListProps) => {
  const { data: notifications, isLoading, error } = useNotifications();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-4">
        <Spinner animation="border" size="sm" />
        <span className="ms-2">E-Mails werden geladen...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        Fehler beim Laden der E-Mails. Bitte versuchen Sie es erneut.
      </Alert>
    );
  }

  const emails = notifications?.items || [];

  if (emails.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center p-4 text-muted" style={{ height: '200px' }}>
        <i className="bi bi-inbox fs-1 mb-2"></i>
        <h6>Posteingang leer</h6>
        <small>Sie haben noch keine E-Mails erhalten.</small>
      </div>
    );
  }

  // Sort emails by creation date (newest first)
  const sortedEmails = [...emails].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="email-list">
      <div className="p-3 border-bottom bg-white">
        <h5 className="mb-0">Posteingang</h5>
        <small className="text-muted">{emails.length} E-Mail{emails.length !== 1 ? 's' : ''}</small>
      </div>
      
      <div className="list-group list-group-flush">
        {sortedEmails.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            isSelected={selectedEmail?.id === email.id}
            onClick={() => onSelectEmail(email)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmailList;