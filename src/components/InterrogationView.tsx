import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, ArrowLeft } from 'lucide-react';
import { useKeycloak } from '@/contexts/KeycloakContext';
import { useInterrogations } from '@/hooks/useInterrogations';
import { useCreateInterrogationAnswer } from '@/hooks/useCreateInterrogationAnswer';
import { useQuestionAndAnswers } from '@/hooks/useQuestionAndAnswers';
import type { components } from '@/openapi/crimeAiSchema';

type PersonDto = components['schemas']['PersonDto'];

interface InterrogationViewProps {
  person: PersonDto;
  onBack: () => void;
}

const InterrogationView = ({ person, onBack }: InterrogationViewProps) => {
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

  // Get person type color
  const getPersonTypeColor = (type: string) => {
    switch (type) {
      case 'SUSPECT':
        return 'bg-danger';
      case 'WITNESS':
        return 'bg-primary';
      case 'VICTIM':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Header with back button and person info */}
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={onBack}
          className="me-3"
        >
          <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
          Back
        </Button>
        
        <div className="d-flex align-items-center">
          <div className="me-3">
            <div className={`${getPersonTypeColor(person.type)} rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold`} style={{ width: '48px', height: '48px' }}>
              {getInitials(person.name)}
            </div>
          </div>
          
          <div>
            <h2 className="h3 text-white mb-1">
              Interrogation with {person.name}
            </h2>
            <p className="text-muted mb-0">
              {person.type.toLowerCase()} • {person.age} years old • {person.profession}
            </p>
          </div>
        </div>
      </div>

      {/* Question input form */}
      <Card className="bg-dark border-secondary mb-4">
        <CardHeader>
          <CardTitle className="text-white h5">Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button
              type="submit"
              disabled={!question.trim() || createAnswerMutation.isPending}
              variant="danger"
            >
              <Send style={{ width: '16px', height: '16px' }} />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Question and Answers */}
      <div>
        <h3 className="h4 text-white mb-3">Conversation History</h3>
        
        {interrogationsLoading || qaLoading ? (
          <div className="text-center text-muted">
            <p>Loading conversation...</p>
          </div>
        ) : questionAndAnswers?.items && questionAndAnswers.items.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {questionAndAnswers.items.map((qa, index) => (
              <Card key={index} className="bg-dark border-secondary">
                <CardContent className="p-3">
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-start gap-2">
                      <Badge variant="primary" className="mt-1">
                        Q
                      </Badge>
                      <p className="text-white flex-grow-1 mb-0">{qa.question}</p>
                    </div>
                    <div className="d-flex align-items-start gap-2">
                      <Badge variant="success" className="mt-1">
                        A
                      </Badge>
                      <p className="text-muted flex-grow-1 mb-0">{qa.answer}</p>
                    </div>
                    <p className="small text-muted text-end mb-0">
                      {new Date(qa.createdAt).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted">
            <p>No questions asked yet. Start the interrogation by asking a question above.</p>
          </div>
        )}
      </div>

      {createAnswerMutation.isPending && (
        <div className="text-center text-danger mt-3">
          <p>Processing your question...</p>
        </div>
      )}
    </div>
  );
};

export default InterrogationView;
