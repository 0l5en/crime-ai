
import React, { useState, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useKeycloak } from '@/contexts/KeycloakContext';
import { useInterrogations } from '@/hooks/useInterrogations';
import { useCreateInterrogationAnswer } from '@/hooks/useCreateInterrogationAnswer';
import { useQuestionAndAnswers } from '@/hooks/useQuestionAndAnswers';
import type { components } from '@/openapi/crimeAiSchema';
import ConversationHistory from './ConversationHistory';

type PersonDto = components['schemas']['PersonDto'];

interface InterrogationViewProps {
  person: PersonDto;
  onBack?: () => void;
  embedded?: boolean;
}

const InterrogationView = ({ person, onBack, embedded = false }: InterrogationViewProps) => {
  const { user } = useKeycloak();
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
        return 'Criminal Assistant';
      case 'DIGITAL_EXPERT':
        return 'Digital Expert';
      case 'FORENSIC_EXPERT':
        return 'Forensic Expert';
      case 'BALLISTIC_EXPERT':
        return 'Ballistic Expert';
      case 'DOCUMENT_EXPERT':
        return 'Document Expert';
      case 'TRACE_EXPERT':
        return 'Trace Expert';
      case 'FORENSIC_PATHOLOGIST':
        return 'Forensic Pathologist';
      case 'PERPETRATOR':
        return 'Perpetrator';
      default:
        return primaryRole.toLowerCase();
    }
  };

  const containerClass = embedded 
    ? "" 
    : "container-fluid py-4";

  return (
    <div className={containerClass}>
      {/* Header with back button and person info - only show if not embedded */}
      {!embedded && onBack && (
        <div className="d-flex align-items-center mb-4">
          <button
            className="btn btn-secondary btn-sm me-3"
            onClick={onBack}
          >
            <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
            Back
          </button>
          
          <div className="d-flex align-items-center">
            <div className="me-3">
              <div className={`${getPersonTypeColor(person.roles)} rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold`} style={{ width: '48px', height: '48px' }}>
                {getInitials(person.name)}
              </div>
            </div>
            
            <div>
              <h2 className="h3 text-white mb-1">
                Interrogation with {person.name}
              </h2>
              <p className="text-muted mb-0">
                {getPersonTypeDisplay(person.roles)} • {person.age} years old • {person.profession}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Question input form */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-header">
          <h5 className="card-title text-white">Ask a Question</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmitQuestion} className="d-flex gap-2">
            <input
              type="text"
              className="form-control bg-dark border-secondary text-white flex-grow-1"
              style={{ backgroundColor: '#495057 !important' }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              disabled={createAnswerMutation.isPending}
            />
            <button
              type="submit"
              disabled={!question.trim() || createAnswerMutation.isPending}
              className="btn btn-danger"
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
          <p>Processing your question...</p>
        </div>
      )}
    </div>
  );
};

export default InterrogationView;
