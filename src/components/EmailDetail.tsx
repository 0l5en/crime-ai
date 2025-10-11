import { NotificationDto } from "@/hooks/useNotifications";
import { format, formatDistanceToNow } from "date-fns";
import { enUS, de, it, fr } from "date-fns/locale";
import { Clock, Mail, Reply, User } from "lucide-react";
import { Button, Card } from "react-bootstrap";
import AutopsyReportCard from "./AutopsyReportCard";
import { useTranslation } from "react-i18next";

interface EmailDetailProps {
  email: NotificationDto | null;
}

const EmailDetail = ({ email }: EmailDetailProps) => {
  const { t, i18n } = useTranslation('emails');
  
  const getLocale = () => {
    switch (i18n.language) {
      case 'de': return de;
      case 'it': return it;
      case 'fr': return fr;
      default: return enUS;
    }
  };

  if (!email) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted">
        <Mail size={64} className="mb-3 opacity-50" />
        <h5>{t('selectEmail')}</h5>
        <p>{t('selectEmailDescription')}</p>
      </div>
    );
  }

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        full: format(date, "MM/dd/yyyy 'at' HH:mm", { locale: getLocale() }),
        relative: formatDistanceToNow(date, { addSuffix: true, locale: getLocale() })
      };
    } catch {
      return { full: t('unknown'), relative: t('unknown') };
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
              <p>{t('notImplemented')}</p>
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
              {t('reply')}
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