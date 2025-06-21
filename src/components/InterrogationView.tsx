
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    user?.sub || '',
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
    if (!question.trim() || !user?.sub) return;

    try {
      await createAnswerMutation.mutateAsync({
        question: question.trim(),
        userId: user.sub,
        personId: person.id,
      });
      setQuestion('');
    } catch (error) {
      console.error('Failed to submit question:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="text-white border-gray-600 hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-semibold text-white">
          Interrogation with {person.name}
        </h2>
      </div>

      {/* Question input form */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitQuestion} className="flex space-x-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
              disabled={createAnswerMutation.isPending}
            />
            <Button
              type="submit"
              disabled={!question.trim() || createAnswerMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Question and Answers */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Conversation History</h3>
        
        {interrogationsLoading || qaLoading ? (
          <div className="text-center text-gray-300">
            <p>Loading conversation...</p>
          </div>
        ) : questionAndAnswers?.items && questionAndAnswers.items.length > 0 ? (
          <div className="space-y-4">
            {questionAndAnswers.items.map((qa, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Badge variant="outline" className="text-blue-400 border-blue-400 mt-1">
                        Q
                      </Badge>
                      <p className="text-gray-200 flex-1">{qa.question}</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Badge variant="outline" className="text-green-400 border-green-400 mt-1">
                        A
                      </Badge>
                      <p className="text-gray-300 flex-1">{qa.answer}</p>
                    </div>
                    <p className="text-xs text-gray-500 text-right">
                      {new Date(qa.createdAt).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>No questions asked yet. Start the interrogation by asking a question above.</p>
          </div>
        )}
      </div>

      {createAnswerMutation.isPending && (
        <div className="text-center text-blue-400">
          <p>Processing your question...</p>
        </div>
      )}
    </div>
  );
};

export default InterrogationView;
