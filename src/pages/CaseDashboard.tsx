
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { useCrimeCase } from '@/hooks/useCrimeCase';
import { useCaseEvidences } from '@/hooks/useCaseEvidences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EvidenceCard from '@/components/EvidenceCard';

const CaseDashboard = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { data: crimeCase, isLoading: caseLoading, error: caseError } = useCrimeCase(caseId || '');
  const { data: evidences, isLoading: evidencesLoading, error: evidencesError } = useCaseEvidences(caseId || '');

  if (!caseId) {
    return (
      <div className="min-h-screen bg-slate-900">
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

  if (caseLoading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <p>Fetching case details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (caseError) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-red-400">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>Failed to load case details: {caseError.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Color palette for evidence cards
  const evidenceColors = [
    'bg-gradient-to-br from-blue-600 to-blue-800',
    'bg-gradient-to-br from-green-600 to-green-800',
    'bg-gradient-to-br from-purple-600 to-purple-800',
    'bg-gradient-to-br from-red-600 to-red-800',
    'bg-gradient-to-br from-yellow-600 to-yellow-800',
    'bg-gradient-to-br from-indigo-600 to-indigo-800',
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-8">{crimeCase?.title}</h1>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="evidences">Evidences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-4">Case Description</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {crimeCase?.description}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="evidences">
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">Case Evidences</h2>
                
                {evidencesLoading && (
                  <div className="text-center text-gray-300">
                    <p>Loading evidences...</p>
                  </div>
                )}
                
                {evidencesError && (
                  <div className="text-center text-red-400">
                    <p>Failed to load evidences: {evidencesError.message}</p>
                  </div>
                )}
                
                {evidences?.items && evidences.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {evidences.items.map((evidence, index) => (
                      <EvidenceCard
                        key={evidence.id}
                        title={evidence.title}
                        description={evidence.description}
                        location={evidence.location}
                        analysisResult={evidence.analysisResult}
                        imageColor={evidenceColors[index % evidenceColors.length]}
                      />
                    ))}
                  </div>
                ) : (
                  !evidencesLoading && !evidencesError && (
                    <div className="text-center text-gray-400">
                      <p>No evidences found for this case.</p>
                    </div>
                  )
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CaseDashboard;
