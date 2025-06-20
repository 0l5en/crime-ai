import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { useCrimeCase } from '@/hooks/useCrimeCase';
import { useCaseEvidences } from '@/hooks/useCaseEvidences';
import { useCaseWitnesses } from '@/hooks/useCaseWitnesses';
import { useCaseSuspects } from '@/hooks/useCaseSuspects';
import { useCrimeScene } from '@/hooks/useCrimeScene';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EvidenceCard from '@/components/EvidenceCard';
import WitnessCard from '@/components/WitnessCard';
import SuspectCard from '@/components/SuspectCard';

const CaseDashboard = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { data: crimeCase, isLoading: caseLoading, error: caseError } = useCrimeCase(caseId || '');
  const { data: evidences, isLoading: evidencesLoading, error: evidencesError } = useCaseEvidences(caseId || '');
  const { data: witnesses, isLoading: witnessesLoading, error: witnessesError } = useCaseWitnesses(caseId || '');
  const { data: suspects, isLoading: suspectsLoading, error: suspectsError } = useCaseSuspects(caseId || '');
  const { data: crimeScene, isLoading: crimeSceneLoading, error: crimeSceneError } = useCrimeScene(caseId || '');

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

  // Color palette for witness cards
  const witnessColors = [
    'bg-gradient-to-br from-emerald-600 to-emerald-800',
    'bg-gradient-to-br from-cyan-600 to-cyan-800',
    'bg-gradient-to-br from-violet-600 to-violet-800',
    'bg-gradient-to-br from-rose-600 to-rose-800',
    'bg-gradient-to-br from-amber-600 to-amber-800',
    'bg-gradient-to-br from-teal-600 to-teal-800',
  ];

  // Color palette for suspect cards
  const suspectColors = [
    'bg-gradient-to-br from-red-700 to-red-900',
    'bg-gradient-to-br from-orange-700 to-orange-900',
    'bg-gradient-to-br from-yellow-700 to-yellow-900',
    'bg-gradient-to-br from-pink-700 to-pink-900',
    'bg-gradient-to-br from-purple-700 to-purple-900',
    'bg-gradient-to-br from-indigo-700 to-indigo-900',
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-8">{crimeCase?.title}</h1>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="evidences">Evidences</TabsTrigger>
              <TabsTrigger value="witnesses">Witnesses</TabsTrigger>
              <TabsTrigger value="suspects">Suspects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-8">
                <div className="bg-slate-800 rounded-lg p-8">
                  <h2 className="text-2xl font-semibold mb-4">Case Description</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {crimeCase?.description}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-lg p-8">
                  <h2 className="text-2xl font-semibold mb-6">Crime Scene</h2>
                  
                  {crimeSceneLoading && (
                    <div className="text-center text-gray-300">
                      <p>Loading crime scene...</p>
                    </div>
                  )}
                  
                  {crimeSceneError && (
                    <div className="text-center text-red-400">
                      <p>Failed to load crime scene: {crimeSceneError.message}</p>
                    </div>
                  )}
                  
                  {crimeScene ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-4 text-white">{crimeScene.title}</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {crimeScene.description}
                        </p>
                      </div>
                      <div className="lg:w-80">
                        <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg h-64 flex items-center justify-center">
                          <div className="text-center text-gray-300">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm">Crime Scene Image</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    !crimeSceneLoading && !crimeSceneError && (
                      <div className="text-center text-gray-400">
                        <p>No crime scene information available.</p>
                      </div>
                    )
                  )}
                </div>
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

            <TabsContent value="witnesses">
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">Case Witnesses</h2>
                
                {witnessesLoading && (
                  <div className="text-center text-gray-300">
                    <p>Loading witnesses...</p>
                  </div>
                )}
                
                {witnessesError && (
                  <div className="text-center text-red-400">
                    <p>Failed to load witnesses: {witnessesError.message}</p>
                  </div>
                )}
                
                {witnesses?.items && witnesses.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {witnesses.items.map((witness, index) => (
                      <WitnessCard
                        key={witness.id}
                        name={witness.name}
                        age={witness.age}
                        profession={witness.profession}
                        maritalStatus={witness.maritalStatus}
                        relationshipToCase={witness.relationshipToCase}
                        imageColor={witnessColors[index % witnessColors.length]}
                      />
                    ))}
                  </div>
                ) : (
                  !witnessesLoading && !witnessesError && (
                    <div className="text-center text-gray-400">
                      <p>No witnesses found for this case.</p>
                    </div>
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent value="suspects">
              <div className="bg-slate-800 rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">Case Suspects</h2>
                
                {suspectsLoading && (
                  <div className="text-center text-gray-300">
                    <p>Loading suspects...</p>
                  </div>
                )}
                
                {suspectsError && (
                  <div className="text-center text-red-400">
                    <p>Failed to load suspects: {suspectsError.message}</p>
                  </div>
                )}
                
                {suspects?.items && suspects.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suspects.items.map((suspect, index) => (
                      <SuspectCard
                        key={suspect.id}
                        name={suspect.name}
                        age={suspect.age}
                        profession={suspect.profession}
                        maritalStatus={suspect.maritalStatus}
                        relationshipToCase={suspect.relationshipToCase}
                        imageColor={suspectColors[index % suspectColors.length]}
                      />
                    ))}
                  </div>
                ) : (
                  !suspectsLoading && !suspectsError && (
                    <div className="text-center text-gray-400">
                      <p>No suspects found for this case.</p>
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
