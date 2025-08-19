
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Eye, Scale } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCrimeCase } from "@/hooks/useCrimeCase";
import { useCrimeScene } from "@/hooks/useCrimeScene";
import { useCaseEvidences } from "@/hooks/useCaseEvidences";
import { useCaseSuspects } from "@/hooks/useCaseSuspects";
import { useCaseWitnesses } from "@/hooks/useCaseWitnesses";
import { useCaseMotives } from "@/hooks/useCaseMotives";
import EvidenceCard from "@/components/EvidenceCard";
import SuspectCard from "@/components/SuspectCard";
import WitnessCard from "@/components/WitnessCard";
import InterrogationView from "@/components/InterrogationView";
import { useState } from "react";

const CaseDashboard = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [showInterrogation, setShowInterrogation] = useState(false);

  const { data: crimeCase, isLoading: caseLoading } = useCrimeCase(caseId || '');
  const { data: crimeScene, isLoading: sceneLoading } = useCrimeScene(caseId || '');
  const { data: evidences, isLoading: evidencesLoading } = useCaseEvidences(caseId || '');
  const { data: suspects, isLoading: suspectsLoading } = useCaseSuspects(caseId || '');
  const { data: witnesses, isLoading: witnessesLoading } = useCaseWitnesses(caseId || '');
  const { data: motives, isLoading: motivesLoading } = useCaseMotives(caseId || '');

  const isLoading =
    caseLoading ||
    sceneLoading ||
    evidencesLoading ||
    suspectsLoading ||
    witnessesLoading ||
    motivesLoading;

  const getImageColor = (index: number) => {
    const colors = [
      "bg-gradient-danger",
      "bg-gradient-primary",
      "bg-gradient-success",
      "bg-gradient-warning",
      "bg-gradient-info",
      "bg-gradient-secondary",
    ];
    return colors[index % colors.length];
  };

  const handleInterrogate = (person: any) => {
    setSelectedPerson(person);
    setShowInterrogation(true);
  };

  if (showInterrogation && selectedPerson) {
    return (
      <InterrogationView
        person={selectedPerson}
        onBack={() => {
          setShowInterrogation(false);
          setSelectedPerson(null);
        }}
      />
    );
  }

  return (
    <div className="min-vh-100 bg-dark">
      <Header />
      
      <div className="container-fluid py-4">
        <div className="d-flex align-items-center mb-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/')}
            className="me-3"
          >
            <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
            Back to Cases
          </Button>
          
          <div>
            <h1 className="h2 text-white mb-1">
              {crimeCase?.title || 'Loading...'}
            </h1>
            <p className="text-muted mb-0">
              {crimeCase?.description || 'Loading case details...'}
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex gap-3 justify-content-end">
              <Button
                onClick={() => navigate(`/case/${caseId}/solution`)}
                variant="danger"
                size="lg"
              >
                <Scale className="me-2" style={{ width: '18px', height: '18px' }} />
                Solve Case
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="crime-scene" className="w-100">
          <TabsList className="nav nav-tabs bg-dark border-secondary mb-4">
            <TabsTrigger value="crime-scene">Crime Scene</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="suspects">Suspects</TabsTrigger>
            <TabsTrigger value="witnesses">Witnesses</TabsTrigger>
            <TabsTrigger value="motives">Motives</TabsTrigger>
          </TabsList>

          <TabsContent value="crime-scene">
            <Card className="bg-dark border-secondary">
              <CardHeader>
                <CardTitle className="text-white">Crime Scene Details</CardTitle>
              </CardHeader>
              <CardContent>
                {sceneLoading ? (
                  <div className="text-center text-muted py-5">
                    <p>Loading crime scene details...</p>
                  </div>
                ) : crimeScene ? (
                  <div className="text-white">
                    <div className="mb-4">
                      <h3 className="h5 text-danger mb-2">Location</h3>
                      <p className="text-muted">{(crimeScene as any).location || crimeScene.title}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="h5 text-danger mb-2">Time of Discovery</h3>
                      <p className="text-muted">{(crimeScene as any).timeOfDiscovery || 'Not specified'}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="h5 text-danger mb-2">Initial Assessment</h3>
                      <p className="text-muted">{(crimeScene as any).initialAssessment || crimeScene.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="h5 text-danger mb-2">Secured Evidence</h3>
                      <p className="text-muted">{(crimeScene as any).securedEvidence || 'See evidence tab for details'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted py-5">
                    <p>No crime scene details available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence">
            {evidencesLoading ? (
              <div className="text-center text-muted py-5">
                <p>Loading evidence...</p>
              </div>
            ) : evidences?.items && evidences.items.length > 0 ? (
              <div className="row g-4">
                {evidences.items.map((evidence, index) => (
                  <div key={evidence.id} className="col-md-6 col-lg-4">
                    <EvidenceCard
                      title={(evidence as any).name || evidence.title}
                      description={evidence.description}
                      location={(evidence as any).location || 'Unknown location'}
                      analysisResult={(evidence as any).analysisResult || 'Pending analysis'}
                      imageColor={getImageColor(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-5">
                <p>No evidence available for this case</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="suspects">
            {suspectsLoading ? (
              <div className="text-center text-muted py-5">
                <p>Loading suspects...</p>
              </div>
            ) : suspects?.items && suspects.items.length > 0 ? (
              <div className="row g-4">
                {suspects.items.map((suspect, index) => (
                  <div key={suspect.id} className="col-md-6 col-lg-4">
                    <SuspectCard
                      name={suspect.name}
                      age={suspect.age}
                      profession={suspect.profession}
                      maritalStatus={suspect.maritalStatus}
                      relationshipToCase={suspect.relationshipToCase}
                      imageColor={getImageColor(index)}
                      onInterrogate={() => handleInterrogate(suspect)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-5">
                <p>No suspects identified for this case</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="witnesses">
            {witnessesLoading ? (
              <div className="text-center text-muted py-5">
                <p>Loading witnesses...</p>
              </div>
            ) : witnesses?.items && witnesses.items.length > 0 ? (
              <div className="row g-4">
                {witnesses.items.map((witness, index) => (
                  <div key={witness.id} className="col-md-6 col-lg-4">
                    <WitnessCard
                      name={witness.name}
                      age={witness.age}
                      profession={witness.profession}
                      maritalStatus={witness.maritalStatus}
                      relationshipToCase={witness.relationshipToCase}
                      imageColor={getImageColor(index)}
                      onInterrogate={() => handleInterrogate(witness)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-5">
                <p>No witnesses identified for this case</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="motives">
            {motivesLoading ? (
              <div className="text-center text-muted py-5">
                <p>Loading motives...</p>
              </div>
            ) : motives?.items && motives.items.length > 0 ? (
              <div className="row g-4">
                {motives.items.map((motive) => (
                  <div key={motive.id} className="col-md-6">
                    <Card className="bg-dark border-secondary text-light">
                      <CardContent className="p-4">
                        <h3 className="h5 text-danger mb-3">{(motive as any).name || motive.title}</h3>
                        <p className="text-muted mb-3">{motive.description}</p>
                        <div className="small">
                          <Badge variant="warning" className="me-2">
                            Strength: {(motive as any).strength || 'Unknown'}
                          </Badge>
                          <span className="text-muted">
                            Plausibility: {(motive as any).plausibility || 'Unknown'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-5">
                <p>No motives identified for this case</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CaseDashboard;
