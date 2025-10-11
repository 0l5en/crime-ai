import { useUserContext } from '@/contexts/UserContext';
import { useCreateInterrogationAnswer } from '@/hooks/useCreateInterrogationAnswer';
import { useInterrogations } from '@/hooks/useInterrogations';
import { useQuestionAndAnswers } from '@/hooks/useQuestionAndAnswers';
import type { components } from '@/openapi/crimeAiSchema';
import { ArrowLeft, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConversationHistory from './ConversationHistory';

type PersonDto = components['schemas']['PersonDto'];

interface InterrogationViewProps {
  person: PersonDto;
  onBack?: () => void;
  embedded?: boolean;
}

const InterrogationView = ({ person, onBack, embedded = false }: InterrogationViewProps) => {
  const user = useUserContext();
  const { t } = useTranslation('caseDashboard');
  const [question, setQuestion] = useState('');
  const [interrogationId, setInterrogationId] = useState<string | null>(null);

  const { data: interrogations, isLoading: interrogationsLoading } = useInterrogations(
    user?.email || '',
    person.id
  );

  const { data: questionAndAnswers, isLoading: qaLoading } = useQuestionAndAnswers(
    interrogationId || ''
  );

  const createAnswerMutation = useCreateInterrogationAnswer();

  // Set interrogation ID when interrogations are loaded
  useEffect(() => {
    if (interrogations?.items && interrogations.items.length > 0) {
      setInterrogationId(interrogations.items[0].id.toString());
    }
  }, [interrogations]);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !user?.email) return;

    try {
      await createAnswerMutation.mutateAsync({
        question: question.trim(),
        userId: user.email,
        personId: person.id,
      });
      setQuestion('');
    } catch (error) {
      console.error('Failed to submit question:', error);
    }
  };

  // Generate initials from person name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get person type color - now supports all expanded roles
  const getPersonTypeColor = (roles: string[]) => {
    if (roles.includes('SUSPECT')) return 'bg-danger';
    if (roles.includes('WITNESS')) return 'bg-primary';
    if (roles.includes('VICTIM')) return 'bg-secondary';
    if (roles.includes('CRIMINAL_ASSISTANT')) return 'bg-success';
    if (roles.includes('DIGITAL_EXPERT') ||
      roles.includes('FORENSIC_EXPERT') ||
      roles.includes('BALLISTIC_EXPERT') ||
      roles.includes('DOCUMENT_EXPERT') ||
      roles.includes('TRACE_EXPERT') ||
      roles.includes('FORENSIC_PATHOLOGIST')) {
      return 'bg-info';
    }
    if (roles.includes('PERPETRATOR')) return 'bg-warning';
    return 'bg-secondary';
  };

  // Get person type display name - use the primary role
  const getPersonTypeDisplay = (roles: string[]) => {
    const primaryRole = roles[0];
    switch (primaryRole) {
      case 'CRIMINAL_ASSISTANT':
        return t('interrogation.roles.criminalAssistant');
      case 'DIGITAL_EXPERT':
        return t('interrogation.roles.digitalExpert');
      case 'FORENSIC_EXPERT':
        return t('interrogation.roles.forensicExpert');
      case 'BALLISTIC_EXPERT':
        return t('interrogation.roles.ballisticExpert');
      case 'DOCUMENT_EXPERT':
        return t('interrogation.roles.documentExpert');
      case 'TRACE_EXPERT':
        return t('interrogation.roles.traceExpert');
      case 'FORENSIC_PATHOLOGIST':
        return t('interrogation.roles.forensicPathologist');
      case 'PERPETRATOR':
        return t('interrogation.roles.perpetrator');
      default:
        return primaryRole.toLowerCase();
    }
  };

  const containerClass = embedded
    ? ""
    : "container-fluid py-4";

  return (
    <div className={containerClass}>
      {/* Header with back button and person info */}
      {onBack && (
        <div className="d-flex align-items-center mb-4">
          <button
            className="btn btn-primary me-3"
            onClick={onBack}
          >
            <ArrowLeft className="me-2" />
            {t('interrogation.back')}
          </button>

          <div className="d-flex align-items-center">
            <div className="me-3">
              {person.imageUrl ? (
                <img
                  src={person.imageUrl}
                  alt={person.name}
                  className="rounded-circle object-fit-cover"
                  style={{ width: '60px', height: '60px' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('d-none');
                  }}
                />
              ) : null}
              <div className={`${getPersonTypeColor(person.roles)} rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold ${person.imageUrl ? 'd-none' : ''}`} style={{ width: '48px', height: '48px' }}>
                {getInitials(person.name)}
              </div>
            </div>

            <div>
              <h2 className="h3 mb-1">
                {person.roles.includes('WITNESS') 
                  ? `${t('interrogation.questioningOf')} ${person.name}`
                  : `${t('interrogation.interrogationWith')} ${person.name}`
                }
              </h2>
              <p className="text-muted mb-0">
                {person.age} {t('interrogation.yearsOld')} • {person.profession}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Question input form */}
      <div className="card border-secondary mb-4">
        <div className="card-header">
          <h5 className="card-title">{t('interrogation.askQuestion')}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmitQuestion} className="d-flex gap-2">
            <input
              type="text"
              className="form-control border-secondary flex-grow-1"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t('interrogation.typePlaceholder')}
              disabled={createAnswerMutation.isPending}
            />
            <button
              type="submit"
              disabled={!question.trim() || createAnswerMutation.isPending}
              className="btn btn-primary"
            >
              <Send style={{ width: '16px', height: '16px' }} />
            </button>
          </form>
        </div>
      </div>

      <ConversationHistory
        questionAndAnswers={questionAndAnswers?.items ?? []}
        pending={interrogationsLoading || qaLoading}
      />

      {createAnswerMutation.isPending && (
        <div className="text-center text-danger mt-3">
          <p>{t('interrogation.processing')}</p>
        </div>
      )}
    </div>
  );
};

export default InterrogationView;
