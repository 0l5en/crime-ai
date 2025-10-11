import { useNotifications, NotificationDto } from "@/hooks/useNotifications";
import EmailListItem from "./EmailListItem";
import { Alert, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface EmailListProps {
  selectedEmail: NotificationDto | null;
  onSelectEmail: (email: NotificationDto) => void;
}

const EmailList = ({ selectedEmail, onSelectEmail }: EmailListProps) => {
  const { data: notifications, isLoading, error } = useNotifications();
  const { t } = useTranslation('emails');

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-4">
        <Spinner animation="border" size="sm" />
        <span className="ms-2">{t('loading')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {t('error')}
      </Alert>
    );
  }

  const emails = notifications?.items || [];

  if (emails.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center p-4 text-muted" style={{ height: '200px' }}>
        <i className="bi bi-inbox fs-1 mb-2"></i>
        <h6>{t('inboxEmpty')}</h6>
        <small>{t('noEmailsYet')}</small>
      </div>
    );
  }

  // Sort emails by creation date (newest first)
  const sortedEmails = [...emails].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="email-list">
      <div className="p-3 border-bottom" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
        <h5 className="mb-0">{t('inbox')}</h5>
        <small className="text-muted">{emails.length} {emails.length !== 1 ? t('emails') : t('email')}</small>
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