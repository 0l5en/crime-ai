
import CaseContent from "@/components/CaseContent";
import CaseHeader from "@/components/CaseHeader";
import CaseNotes from "@/components/CaseNotes";
import CaseTabs from "@/components/CaseTabs";
import Header from "@/components/Header";
import InterrogationView from "@/components/InterrogationView";
import { useCaseEvidences } from "@/hooks/useCaseEvidences";
import { useCaseMotives } from "@/hooks/useCaseMotives";
import { useCaseSuspects } from "@/hooks/useCaseSuspects";
import { useCaseVictims } from "@/hooks/useCaseVictims";
import { useCaseWitnesses } from "@/hooks/useCaseWitnesses";
import { useCrimeCase } from "@/hooks/useCrimeCase";
import { useCrimeScene } from "@/hooks/useCrimeScene";
import { useForensicPathologist } from "@/hooks/useForensicPathologist";
import { useEvidenceReports } from "@/hooks/useEvidenceReports";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const CaseDashboard = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedWitness, setSelectedWitness] = useState<any>(null);
  const [selectedSuspect, setSelectedSuspect] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set active tab from URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const { data: crimeCase, isLoading: caseLoading } = useCrimeCase(caseId || '');
  const { data: crimeScene, isLoading: sceneLoading } = useCrimeScene(caseId || '');
  const { data: evidences, isLoading: evidencesLoading } = useCaseEvidences(caseId || '');
  const { data: suspects, isLoading: suspectsLoading } = useCaseSuspects(caseId || '');
  const { data: witnesses, isLoading: witnessesLoading } = useCaseWitnesses(caseId || '');
  const { data: motives, isLoading: motivesLoading } = useCaseMotives(caseId || '');
  const { data: victims, isLoading: victimsLoading } = useCaseVictims(caseId || '');
  const { data: forensicPathologist, isLoading: pathologistLoading } = useForensicPathologist(caseId || '');
  const { data: evidenceReports, isLoading: reportsLoading } = useEvidenceReports(selectedEvidence?.id?.toString() || '', selectedEvidence ? undefined : '');

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

  const handleWitnessSelect = (witness: any) => {
    setSelectedWitness(witness);
  };

  const handleSuspectSelect = (suspect: any) => {
    setSelectedSuspect(suspect);
  };

  const handleBackToWitnessList = () => {
    setSelectedWitness(null);
  };

  const handleBackToSuspectList = () => {
    setSelectedSuspect(null);
  };

  // Scroll to top when evidence is selected
  useEffect(() => {
    if (selectedEvidence) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedEvidence]);

  const handleEvidenceSelect = (evidence: any) => {
    setSelectedEvidence(evidence);
  };

  const handleBackToEvidenceList = () => {
    setSelectedEvidence(null);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />

      <div className="container-fluid py-4" style={{ maxWidth: '1200px' }}>
        <CaseHeader
          caseId={caseId || ''}
          title={crimeCase?.title}
          summary={crimeCase?.summary}
        />

        <CaseTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <CaseContent
          activeTab={activeTab}
          caseId={caseId || ''}
          crimeCase={crimeCase}
          crimeScene={crimeScene}
          evidences={evidences}
          suspects={suspects}
          witnesses={witnesses}
          motives={motives}
          victims={victims}
          forensicPathologist={forensicPathologist}
          sceneLoading={sceneLoading}
          evidencesLoading={evidencesLoading}
          suspectsLoading={suspectsLoading}
          witnessesLoading={witnessesLoading}
          motivesLoading={motivesLoading}
          victimsLoading={victimsLoading}
          pathologistLoading={pathologistLoading}
          onWitnessSelect={handleWitnessSelect}
          onSuspectSelect={handleSuspectSelect}
          getImageColor={getImageColor}
          selectedEvidence={selectedEvidence}
          evidenceReports={evidenceReports}
          reportsLoading={reportsLoading}
          onEvidenceSelect={handleEvidenceSelect}
          onBackToEvidenceList={handleBackToEvidenceList}
          selectedWitness={selectedWitness}
          selectedSuspect={selectedSuspect}
          onBackToWitnessList={handleBackToWitnessList}
          onBackToSuspectList={handleBackToSuspectList}
        />

        {/* Case Notes Feature */}
        <CaseNotes caseId={caseId || ''} />
      </div>
    </div>
  );
};

export default CaseDashboard;
