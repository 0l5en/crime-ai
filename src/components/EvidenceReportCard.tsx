import { useState } from 'react';
import { Send } from 'lucide-react';
import { useCreateInterrogationAnswer } from '@/hooks/useCreateInterrogationAnswer';
import { useQuestionAndAnswers } from '@/hooks/useQuestionAndAnswers';
import { useKeycloak } from '@/contexts/KeycloakContext';
import { format } from 'date-fns';
import ConversationHistory from './ConversationHistory';

interface EvidenceReportCardProps {
  id: number;
  report: string;
  personId?: number;
}

const EvidenceReportCard = ({ id, report, personId }: EvidenceReportCardProps) => {
  const [question, setQuestion] = useState('');
  const { user} = useKeycloak();
  
  const createAnswer = useCreateInterrogationAnswer();
  
  // Pass all required parameters to the hook
  const { data: questionAndAnswers, isLoading: qaLoading } = useQuestionAndAnswers(
    undefined, // no interrogationId for reference-based queries
    id, // use evidence report id as referenceId
    user?.email, // pass userId from Keycloak
    personId // pass personId from props
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !personId || !user?.email) {
      return;
    }

    try {
      await createAnswer.mutateAsync({
        question: question.trim(),
        userId: user?.email,
        personId: personId,
        reference: {
          referenceId: id,
          referenceType: 'EVIDENCE_REPORT'
        }
      });
      
      setQuestion(''); // Clear input after successful submission
    } catch (error) {
      console.error('Failed to create interrogation answer:', error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div className="card bg-dark border-secondary text-light mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0 text-light fw-semibold">Evidence Report</h6>
      </div>
      <div className="card-body">
        {/* Evidence Report Content */}
        <p className="card-text text-light mb-3">{report}</p>

        <hr className="border-secondary my-3" />

        {/* Interrogation Section */}
        <div className="mt-3">
          <h6 className="text-light mb-3">Evidence Discussion</h6>
          
          {/* Question Input Form */}
          {personId && user?.email && (
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-dark border-secondary text-light"
                  placeholder="Ask a question about this evidence report..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={createAnswer.isPending}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!question.trim() || createAnswer.isPending}
                >
                  {createAnswer.isPending ? (
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </form>
          )}
          
          <ConversationHistory questionAndAnswers={questionAndAnswers?.items ?? []} pending={qaLoading}/>

        </div>
      </div>
    </div>
  );
};

export default EvidenceReportCard;
