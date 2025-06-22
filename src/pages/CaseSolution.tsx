
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SuspectSelectionCard from '@/components/SuspectSelectionCard';
import { Button } from '@/components/ui/button';
import { useCaseSuspects } from '@/hooks/useCaseSuspects';
import { useCreateSolutionAttempt } from '@/hooks/useCreateSolutionAttempt';
import { useToast } from '@/hooks/use-toast';

const CaseSolution = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedSuspects, setSelectedSuspects] = useState<string[]>([]);
  
  const { data: suspects, isLoading, error } = useCaseSuspects(caseId || '');
  const createSolutionMutation = useCreateSolutionAttempt(caseId || '');

  const handleSuspectToggle = (personId: string) => {
    setSelectedSuspects(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const handleSubmitSolution = async () => {
    if (selectedSuspects.length === 0) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie mindestens einen Verdächtigen aus.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createSolutionMutation.mutateAsync({
        userId: 'user-id', // TODO: Get from auth context
        suspectedPersonIds: selectedSuspects,
        motiveIds: [], // TODO: Implement motive selection
        evidenceIds: [], // TODO: Implement evidence selection
      });
      
      toast({
        title: "Lösung eingereicht",
        description: "Ihre Lösung wurde erfolgreich eingereicht!",
      });
      
      navigate(`/case/${caseId}`);
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Fehler beim Einreichen der Lösung. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  const handleBackToCase = () => {
    navigate(`/case/${caseId}`);
  };

  if (!caseId) {
    return (
      <div className="min-h-screen bg-zinc-900">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-red-400">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>No case ID provided</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <h1 className="text-4xl font-bold">Submit your solution</h1>
            <Button
              onClick={handleBackToCase}
              variant="outline"
              className="bg-transparent border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-red-600 px-6 py-3 text-lg font-semibold transition-colors"
            >
              Back to case
            </Button>
          </div>

          {/* Suspects Selection Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Wählen Sie den/die Täter aus</h2>
            
            {isLoading && (
              <div className="text-zinc-400 text-center py-8">
                Lade Verdächtige...
              </div>
            )}
            
            {error && (
              <div className="text-red-400 text-center py-8">
                Fehler beim Laden der Verdächtigen: {error.message}
              </div>
            )}
            
            {suspects?.people && suspects.people.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {suspects.people.map((suspect) => (
                    <SuspectSelectionCard
                      key={suspect.personId}
                      name={`${suspect.firstName} ${suspect.lastName}`}
                      isSelected={selectedSuspects.includes(suspect.personId)}
                      onToggle={() => handleSuspectToggle(suspect.personId)}
                    />
                  ))}
                </div>
                
                {selectedSuspects.length > 0 && (
                  <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
                    <p className="text-zinc-300">
                      <span className="font-semibold">Ausgewählte Verdächtige:</span> {selectedSuspects.length}
                    </p>
                  </div>
                )}
              </>
            )}
            
            {suspects?.people && suspects.people.length === 0 && (
              <div className="text-zinc-400 text-center py-8">
                Keine Verdächtigen für diesen Fall verfügbar.
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmitSolution}
              disabled={selectedSuspects.length === 0 || createSolutionMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createSolutionMutation.isPending ? 'Wird eingereicht...' : 'Lösung einreichen'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseSolution;
