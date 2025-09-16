import { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "@/components/Header";
import EmailList from "@/components/EmailList";
import EmailDetail from "@/components/EmailDetail";
import { NotificationDto } from "@/hooks/useNotifications";
import { useUpdateNotification } from "@/hooks/useUpdateNotification";

const EmailInbox = () => {
  const [selectedEmail, setSelectedEmail] = useState<NotificationDto | null>(null);
  const updateNotification = useUpdateNotification();

  const handleSelectEmail = async (email: NotificationDto) => {
    setSelectedEmail(email);
    
    // Automatically mark as read if unread
    if (!email.read) {
      try {
        await updateNotification.mutateAsync({
          ...email,
          read: true
        });
      } catch (error) {
        console.error("Error marking email as read:", error);
      }
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />
      <Container fluid className="p-0">
        <div className="email-inbox">
          <div className="email-list-container">
            <EmailList 
              selectedEmail={selectedEmail}
              onSelectEmail={handleSelectEmail}
            />
          </div>
          <div className="email-detail-container">
            <EmailDetail email={selectedEmail} />
          </div>
        </div>
      </Container>
      
      <style>{`
        .email-inbox {
          display: grid;
          grid-template-columns: 30% 70%;
          height: calc(100vh - 76px);
          border-top: 1px solid var(--bs-border-color);
        }
        
        .email-list-container {
          border-right: 1px solid var(--bs-border-color);
          overflow-y: auto;
          background: var(--bs-body-bg);
        }
        
        .email-detail-container {
          overflow-y: auto;
          background: var(--bs-body-bg);
        }
        
        @media (max-width: 768px) {
          .email-inbox {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
          
          .email-list-container {
            border-right: none;
            border-bottom: 1px solid var(--bs-border-color);
            max-height: 40vh;
          }
        }
      `}</style>
    </div>
  );
};

export default EmailInbox;