import { useState } from 'react';
import { Send } from 'lucide-react';
import { useCreateInterrogationAnswer } from '@/hooks/useCreateInterrogationAnswer';
import { useQuestionAndAnswers } from '@/hooks/useQuestionAndAnswers';
import { useKeycloak } from '@/contexts/KeycloakContext';
import { format } from 'date-fns';

interface EvidenceReportCardProps {
  id: number;
  report: string;
  personId?: number;
}

const EvidenceReportCard = ({ id, report, personId }: EvidenceReportCardProps) => {
  const [question, setQuestion] = useState('');
  const { keycloak } = useKeycloak();
  
  const createAnswer = useCreateInterrogationAnswer();
  const { data: questionAndAnswers, isLoading: qaLoading } = useQuestionAndAnswers(
    undefined, // no interrogationId for reference-based queries
    id, // use evidence report id as referenceId
    keycloak?.tokenParsed?.sub // pass userId from Keycloak
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !personId || !keycloak?.tokenParsed?.sub) {
      return;
    }

    try {
      await createAnswer.mutateAsync({
        question: question.trim(),
        userId: keycloak.tokenParsed.sub,
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
        <small className="text-muted">ID: {id}</small>
      </div>
      <div className="card-body">
        {/* Evidence Report Content */}
        <p className="card-text text-light mb-3">{report}</p>
        {personId && (
          <div className="d-flex justify-content-end mb-3">
            <small className="text-muted">
              <span className="fw-semibold text-light">Person ID:</span> {personId}
            </small>
          </div>
        )}

        <hr className="border-secondary my-3" />

        {/* Interrogation Section */}
        <div className="mt-3">
          <h6 className="text-light mb-3">Evidence Discussion</h6>
          
          {/* Question Input Form */}
          {personId && keycloak?.tokenParsed?.sub && (
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

          {/* Question and Answers List */}
          <div className="conversation-history" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {qaLoading ? (
              <div className="text-center text-muted py-3">
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Loading conversation...
              </div>
            ) : questionAndAnswers?.items && questionAndAnswers.items.length > 0 ? (
              <div className="space-y-3">
                {questionAndAnswers.items.map((qa, index) => (
                  <div key={index} className="mb-3">
                    {/* Question */}
                    <div className="d-flex mb-2">
                      <div className="bg-primary bg-opacity-10 rounded p-2 ms-auto" style={{ maxWidth: '80%' }}>
                        <div className="fw-semibold text-light mb-1">You</div>
                        <div className="text-light">{qa.question}</div>
                        <small className="text-muted">{formatDate(qa.createdAt)}</small>
                      </div>
                    </div>
                    
                    {/* Answer */}
                    <div className="d-flex">
                      <div className="bg-secondary bg-opacity-25 rounded p-2 me-auto" style={{ maxWidth: '80%' }}>
                        <div className="fw-semibold text-light mb-1">Expert</div>
                        <div className="text-light">{qa.answer}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-3">
                <p className="mb-0">No questions asked yet about this evidence report.</p>
                {personId && keycloak?.tokenParsed?.sub && (
                  <small>Ask a question above to start the discussion.</small>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceReportCard;
