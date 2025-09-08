import { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "@/components/Header";
import EmailList from "@/components/EmailList";
import EmailDetail from "@/components/EmailDetail";
import { NotificationDto } from "@/hooks/useNotifications";

const EmailInbox = () => {
  const [selectedEmail, setSelectedEmail] = useState<NotificationDto | null>(null);

  return (
    <div className="min-vh-100 bg-light">
      <Header />
      <Container fluid className="p-0">
        <div className="email-inbox">
          <div className="email-list-container">
            <EmailList 
              selectedEmail={selectedEmail}
              onSelectEmail={setSelectedEmail}
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
          border-top: 1px solid #dee2e6;
        }
        
        .email-list-container {
          border-right: 1px solid #dee2e6;
          overflow-y: auto;
          background: white;
        }
        
        .email-detail-container {
          overflow-y: auto;
          background: #f8f9fa;
        }
        
        @media (max-width: 768px) {
          .email-inbox {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
          
          .email-list-container {
            border-right: none;
            border-bottom: 1px solid #dee2e6;
            max-height: 40vh;
          }
        }
      `}</style>
    </div>
  );
};

export default EmailInbox;