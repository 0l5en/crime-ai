
import Header from "@/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useCrimeCase } from "@/hooks/useCrimeCase";
import { useCrimeScene } from "@/hooks/useCrimeScene";
import { useCaseEvidences } from "@/hooks/useCaseEvidences";
import { useCaseSuspects } from "@/hooks/useCaseSuspects";
import { useCaseWitnesses } from "@/hooks/useCaseWitnesses";
import { useCaseMotives } from "@/hooks/useCaseMotives";
import InterrogationView from "@/components/InterrogationView";
import CaseHeader from "@/components/CaseHeader";
import CaseTabs from "@/components/CaseTabs";
import CaseContent from "@/components/CaseContent";
import { useState } from "react";

const CaseDashboard = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [showInterrogation, setShowInterrogation] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { data: crimeCase, isLoading: caseLoading } = useCrimeCase(caseId || '');
  const { data: crimeScene, isLoading: sceneLoading } = useCrimeScene(caseId || '');
  const { data: evidences, isLoading: evidencesLoading } = useCaseEvidences(caseId || '');
  const { data: suspects, isLoading: suspectsLoading } = useCaseSuspects(caseId || '');
  const { data: witnesses, isLoading: witnessesLoading } = useCaseWitnesses(caseId || '');
  const { data: motives, isLoading: motivesLoading } = useCaseMotives(caseId || '');

  const getImageColor = (index: number) => {
    const colors = [
      "bg-gradient-red",
      "bg-gradient-blue",
      "bg-gradient-green",
      "bg-gradient-purple",
      "bg-gradient-orange",
      "bg-gradient-teal",
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
    <div className="min-vh-100" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      
      <div className="container-fluid py-4" style={{ maxWidth: '1400px' }}>
        <CaseHeader 
          caseId={caseId || ''} 
          title={crimeCase?.title} 
          description={crimeCase?.description} 
        />

        <CaseTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <CaseContent
          activeTab={activeTab}
          crimeCase={crimeCase}
          crimeScene={crimeScene}
          evidences={evidences}
          suspects={suspects}
          witnesses={witnesses}
          motives={motives}
          sceneLoading={sceneLoading}
          evidencesLoading={evidencesLoading}
          suspectsLoading={suspectsLoading}
          witnessesLoading={witnessesLoading}
          motivesLoading={motivesLoading}
          onInterrogate={handleInterrogate}
          getImageColor={getImageColor}
        />
      </div>
    </div>
  );
};

export default CaseDashboard;
