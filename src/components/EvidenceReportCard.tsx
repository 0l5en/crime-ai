
import { useKeycloak } from '@/contexts/KeycloakContext';
import { useCreateInterrogationAnswer } from '@/hooks/useCreateInterrogationAnswer';
import { useQuestionAndAnswers } from '@/hooks/useQuestionAndAnswers';
import { format } from 'date-fns';
import { Send, Fingerprint } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ConversationHistory from './ConversationHistory';

interface EvidenceReportCardProps {
  id: number;
  analysis: string;
  methods: string;
  conclusion: string;
  personId?: number;
}

const EvidenceReportCard = ({ id, analysis, methods, conclusion, personId }: EvidenceReportCardProps) => {
  const [question, setQuestion] = useState('');
  const { user } = useKeycloak();
  const { t } = useTranslation('caseDashboard');

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
    <div className="card border-secondary mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold">{t('evidenceReport.title')}</h6>
      </div>
      <div className="card-body">
        {/* Evidence Report Content with Markdown Support */}
        <div className="card-text mb-3 markdown-content">
          <div className="mb-3">
            <h6 className="fw-semibold mb-2">{t('evidenceReport.analysis')}</h6>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {analysis}
            </ReactMarkdown>
          </div>

          <div className="mb-3">
            <h6 className="fw-semibold mb-2">{t('evidenceReport.methods')}</h6>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {methods}
            </ReactMarkdown>
          </div>

          <div className="mb-3">
            <h6 className="fw-semibold mb-2">{t('evidenceReport.conclusion')}</h6>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {conclusion}
            </ReactMarkdown>
          </div>
        </div>

        <hr className="border-secondary my-3" />

        {/* Interrogation Section */}
        <div className="mt-3">
          <h6 className="mb-3">{t('evidenceReport.discussion')}</h6>

          {/* Question Input Form */}
          {personId && user?.email && (
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-secondary"
                  placeholder={t('evidenceReport.askPlaceholder')}
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
                    <Fingerprint className="animate-spin-fingerprint" size={16} />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
            </form>
          )}

          <ConversationHistory questionAndAnswers={questionAndAnswers?.items ?? []} pending={qaLoading} />

        </div>
      </div>
    </div>
  );
};

export default EvidenceReportCard;
