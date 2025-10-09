import { useCaseVictims } from "@/hooks/useCaseVictims";
import { usePersons } from "@/hooks/usePersons";
import type { components } from '@/openapi/crimeAiSchema';
import { Mountain } from "lucide-react";
import { useTranslation } from 'react-i18next';
import InterrogationView from "./InterrogationView";
import VictimInfomationSection from "./VictimInformationSection";

type PersonDto = components['schemas']['PersonDto'];
type CrimeSceneDto = components['schemas']['CrimeSceneDto'];
type CrimeCaseDto = components['schemas']['CrimeCaseDto'];

interface CaseOverviewProps {
  caseId: string;
  crimeCase?: CrimeCaseDto;
  crimeScene?: CrimeSceneDto;
  sceneLoading: boolean;
}

const CaseOverview = ({ caseId, crimeCase, crimeScene, sceneLoading }: CaseOverviewProps) => {
  const { t } = useTranslation('caseDashboard');
  const { data: criminalAssistantData, isLoading: assistantLoading } = usePersons(caseId, 'CRIMINAL_ASSISTANT');
  const { data: victims } = useCaseVictims(caseId);

  // Get the first criminal assistant directly from the filtered response
  const criminalAssistant: PersonDto | null = criminalAssistantData?.items?.[0] || null;

  // Generate initials from person name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div
          className="card border-secondary"
        >
          <div className="card-body p-4">
            <h3 className="h4 mb-3">{t('overview.caseDescription')}</h3>
            <p className="mb-0" style={{ textAlign: 'justify' }}>
              {crimeCase?.description || t('overview.loadingCaseDetails')}
            </p>
          </div>
        </div>
      </div>

      {/* Criminal Assistant Section */}
      <div className="col-12">
        <div
          className="card border-secondary"
        >
          <div className="card-body p-4">
            <h3 className="h4 mb-3">{t('overview.criminalAssistant')}</h3>

            {assistantLoading ? (
              <div className="text-center text-muted py-3">
                <p>{t('overview.loadingAssistant')}</p>
              </div>
            ) : criminalAssistant ? (
              <>
                <div className="row">
                  <div className="col-md-8">
                    <h4 className="h5 mb-3">
                      {criminalAssistant.name}
                    </h4>
                    <p className="text-muted mb-3">
                      {criminalAssistant.profession} • {criminalAssistant.age} {t('overview.yearsOld')}
                    </p>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="d-flex align-items-center justify-content-center rounded position-relative overflow-hidden mt-3"
                      style={{
                        aspectRatio: '1',
                        backgroundColor: '#28a745',
                        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                      }}
                    >
                      {criminalAssistant.imageUrl ? (
                        <img
                          src={criminalAssistant.imageUrl}
                          alt={criminalAssistant.name}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="text-center text-white">
                          <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold mx-auto mb-3"
                            style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                            <span style={{ fontSize: '24px' }}>
                              {getInitials(criminalAssistant.name)}
                            </span>
                          </div>
                          <div className="fw-medium">{t('overview.criminalAssistant')}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    {/* Embedded InterrogationView */}
                    <InterrogationView
                      person={criminalAssistant}
                      embedded={true}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-muted py-3">
                <p>{t('overview.noAssignedAssistant')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-12">
        <div
          className="card border-secondary"
        >
          <div className="card-body p-4">
            <h3 className="h4 mb-3">{t('overview.crimeScene')}</h3>

            {sceneLoading
              ? <p className="mb-0">{t('overview.loadingSceneDetails')}</p>
              : crimeScene
                ? (
                  <div className="row">
                    <div className="col-md-8">
                      <h4 className="h5 mb-3">
                        {crimeScene.title}
                      </h4>
                      <p className="mb-0" style={{ textAlign: "justify" }}>
                        {crimeScene.description}
                      </p>
                    </div>

                    <div className="col-md-4">
                      <div
                        className="d-flex align-items-center justify-content-center rounded position-relative overflow-hidden mt-3"
                        style={{
                          aspectRatio: '1',
                          backgroundColor: '#4a5568',
                          background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
                        }}
                      >
                        {crimeScene?.imageUrl ? (
                          <img
                            src={crimeScene.imageUrl}
                            alt={crimeScene.title || t('overview.crimeScene')}
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="text-center" style={{ color: '#a0aec0' }}>
                            <Mountain size={64} strokeWidth={1.5} />
                            <div className="mt-3 fw-medium">{t('overview.crimeSceneImage')}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (<p className="mb-0">{t('overview.noAssignedScene')}</p>)
            }
          </div>
        </div>
      </div>

      {/* Victim Information Sections */}
      {victims && victims.items.map(victim => <VictimInfomationSection victim={victim} />)}
    </div>
  );
};

export default CaseOverview;
