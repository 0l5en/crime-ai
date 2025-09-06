import { useAutopsyReports } from "@/hooks/useAutopsyReports";
import { useCaseVictims } from "@/hooks/useCaseVictims";
import { useForensicPathologist } from "@/hooks/useForensicPathologist";
import { usePersons } from "@/hooks/usePersons";
import type { components } from '@/openapi/crimeAiSchema';
import { FileText, Mountain, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import InterrogationView from "./InterrogationView";

type PersonDto = components['schemas']['PersonDto'];
type AutopsyReportDto = components['schemas']['AutopsyReportDto'];

interface CaseOverviewProps {
  caseId: string;
  crimeCase?: any;
  crimeScene?: any;
  sceneLoading: boolean;
}

const CaseOverview = ({ caseId, crimeCase, crimeScene, sceneLoading }: CaseOverviewProps) => {
  const { data: criminalAssistantData, isLoading: assistantLoading } = usePersons(caseId, 'CRIMINAL_ASSISTANT');
  const { data: victims, isLoading: victimsLoading } = useCaseVictims(caseId);
  const { data: forensicPathologist, isLoading: pathologistLoading } = useForensicPathologist(caseId);

  // Get the first criminal assistant directly from the filtered response
  const criminalAssistant: PersonDto | null = criminalAssistantData?.items?.[0] || null;

  // Get the first victim using roles array
  const victim: PersonDto | null = victims?.items?.find(person =>
    person.roles.includes('VICTIM')
  ) || null;

  // Check if victim is dead and if we should fetch autopsy report
  const shouldFetchAutopsyReport = victim?.lifeStatus === 'DEAD' && forensicPathologist?.id && victim?.id;

  const { data: autopsyReports, isLoading: autopsyLoading } = useAutopsyReports(
    shouldFetchAutopsyReport ? forensicPathologist.id : undefined,
    shouldFetchAutopsyReport ? victim.id : undefined
  );

  const autopsyReport: AutopsyReportDto | null = autopsyReports?.items && autopsyReports.items.length > 0
    ? autopsyReports.items[0]
    : null;

  // Generate initials from person name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format victim details into a flowing text
  const formatVictimDetails = (victim: PersonDto) => {
    const details = [];

    if (victim.age) details.push(`${victim.age} Jahre alt`);
    if (victim.gender) details.push(victim.gender === 'MALE' ? 'männlich' : victim.gender === 'FEMALE' ? 'weiblich' : victim.gender);
    if (victim.profession) details.push(`arbeitet als ${victim.profession}`);
    if (victim.maritalStatus) details.push(`Familienstand: ${victim.maritalStatus}`);
    if (victim.relationshipToCase) details.push(`Beziehung zum Fall: ${victim.relationshipToCase}`);

    let description = details.join(', ') + '.';

    if (victim.personality) {
      description += ` Persönlichkeit: ${victim.personality}.`;
    }

    if (victim.financialSituation) {
      description += ` Finanzielle Situation: ${victim.financialSituation}.`;
    }

    if (victim.previousConvictions && victim.previousConvictions.length > 0) {
      description += ` Vorstrafen: ${victim.previousConvictions.join(', ')}.`;
    }

    if (victim.alibi?.content) {
      description += ` Alibi: ${victim.alibi.content}.`;
    }

    if (victim.lifeStatus) {
      description += ` Status: ${victim.lifeStatus === 'DEAD' ? 'verstorben' : 'lebendig'}.`;
    }

    return description;
  };

  // Format autopsy report details
  const formatAutopsyDetails = (report: AutopsyReportDto) => {
    let description = '';

    if (report.externalExamination) {
      description += `Äußere Untersuchung: ${report.externalExamination}. `;
    }

    if (report.internalExamination) {
      description += `Innere Untersuchung: ${report.internalExamination}. `;
    }

    if (report.causeOfDeath) {
      description += `${report.causeOfDeath}. `;
    }

    if (report.timeOfDeathFrom && report.timeOfDeathTo) {
      description += `Todeszeitpunkt: zwischen ${report.timeOfDeathFrom} und ${report.timeOfDeathTo}. `;
    }

    if (report.conclusionsAndAssessment) {
      description += `Schlussfolgerungen und Bewertung: ${report.conclusionsAndAssessment}`;
    }

    return description;
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div
          className="card border-0 text-light"
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <div className="card-body p-4">
            <h3 className="h4 text-white mb-3">Case Description</h3>
            <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
              {crimeCase?.description || 'Loading case details...'}
            </p>
          </div>
        </div>
      </div>

      {/* Criminal Assistant Section */}
      <div className="col-12">
        <div
          className="card border-0 text-light"
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <div className="card-body p-4">
            <h3 className="h4 text-white mb-3">Criminal Assistant</h3>

            {assistantLoading ? (
              <div className="text-center text-muted py-3">
                <p>Loading criminal assistant...</p>
              </div>
            ) : criminalAssistant ? (
              <div className="row">
                <div className="col-md-8">
                  <h4 className="h5 text-white mb-3">
                    {criminalAssistant.name}
                  </h4>
                  <p className="text-muted mb-3">
                    {criminalAssistant.profession} • {criminalAssistant.age} years old
                  </p>

                  {/* Embedded InterrogationView */}
                  <InterrogationView
                    person={criminalAssistant}
                    embedded={true}
                  />
                </div>

                <div className="col-md-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded position-relative"
                    style={{
                      height: '200px',
                      backgroundColor: '#28a745',
                      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                    }}
                  >
                    <div className="text-center text-white">
                      <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mx-auto mb-3"
                        style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        <span style={{ fontSize: '24px' }}>
                          {getInitials(criminalAssistant.name)}
                        </span>
                      </div>
                      <div className="fw-medium">Criminal Assistant</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted py-3">
                <p>No criminal assistant assigned to this case</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-12">
        <div
          className="card border-0 text-light"
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <div className="card-body p-4">
            <h3 className="h4 text-white mb-3">Crime Scene</h3>

            <div className="row">
              <div className="col-md-8">
                <h4 className="h5 text-white mb-3">
                  {(crimeScene as any)?.location || crimeScene?.title || 'Trafalgar Square'}
                </h4>
                <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
                  {sceneLoading
                    ? 'Loading crime scene details...'
                    : (crimeScene as any)?.initialAssessment || crimeScene?.description || 'Der Tatort befindet sich in der Nähe des Nelson\'s Column, umgeben von Touristen und Einheimischen. Die Leiche wurde zwischen den Löwenstatuen gefunden.'
                  }
                </p>
              </div>

              <div className="col-md-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded position-relative"
                  style={{
                    height: '200px',
                    backgroundColor: '#4a5568',
                    background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
                  }}
                >
                  <div className="text-center" style={{ color: '#a0aec0' }}>
                    <Mountain size={64} strokeWidth={1.5} />
                    <div className="mt-3 fw-medium">Crime Scene Image</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Victim Information Section */}
      <div className="col-12">
        <div
          className="card border-0 text-light"
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <div className="card-body p-4">
            <h3 className="h4 text-white mb-3">Victim Information</h3>

            {victimsLoading ? (
              <div className="text-center text-muted py-3">
                <p>Loading victim information...</p>
              </div>
            ) : victim ? (
              <div className="row">
                <div className="col-md-8">
                  <h4 className="h5 text-white mb-3">
                    {victim.name}
                  </h4>
                  <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
                    {formatVictimDetails(victim)}
                  </p>
                </div>

                <div className="col-md-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded position-relative"
                    style={{
                      height: '200px',
                      backgroundColor: '#dc3545',
                      background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'
                    }}
                  >
                    <div className="text-center text-white">
                      <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mx-auto mb-3"
                        style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        <User size={40} strokeWidth={1.5} />
                      </div>
                      <div className="fw-medium">Victim</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted py-3">
                <p>No victim information available for this case</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Autopsy Report Section - Only show if victim is dead and report is available */}
      {victim?.lifeStatus === 'DEAD' && (
        <div className="col-12">
          <div
            className="card border-0 text-light"
            style={{ backgroundColor: '#2a2a2a' }}
          >
            <div className="card-body p-4">
              <h3 className="h4 text-white mb-3">Autopsy Report</h3>

              {pathologistLoading || autopsyLoading ? (
                <div className="text-center text-muted py-3">
                  <p>Loading autopsy report...</p>
                </div>
              ) : forensicPathologist && autopsyReport ? (
                <div className="row">
                  <div className="col-md-8">
                    <h4 className="h5 text-white mb-3">
                      Conducted by {forensicPathologist.name}
                    </h4>
                    <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {autopsyReport.externalExamination}
                      </ReactMarkdown>
                    </p>
                    <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {autopsyReport.internalExamination}
                      </ReactMarkdown>
                    </p>
                    <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {autopsyReport.causeOfDeath}
                      </ReactMarkdown>
                    </p>
                    <strong>Todeszeitraum</strong>
                    <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {new Date(autopsyReport.timeOfDeathFrom).toLocaleDateString()
                          + ' ' + new Date(autopsyReport.timeOfDeathFrom).toLocaleTimeString()
                          + ' - ' + new Date(autopsyReport.timeOfDeathTo).toLocaleDateString()
                          + ' ' + new Date(autopsyReport.timeOfDeathTo).toLocaleTimeString()}
                      </ReactMarkdown>
                    </p>
                    <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {autopsyReport.conclusionsAndAssessment}
                      </ReactMarkdown>
                    </p>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="d-flex align-items-center justify-content-center rounded position-relative"
                      style={{
                        height: '200px',
                        backgroundColor: '#6f42c1',
                        background: 'linear-gradient(135deg, #6f42c1 0%, #563d7c 100%)'
                      }}
                    >
                      <div className="text-center text-white">
                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mx-auto mb-3"
                          style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                          <FileText size={40} strokeWidth={1.5} />
                        </div>
                        <div className="fw-medium">Autopsy Report</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : !forensicPathologist ? (
                <div className="text-center text-muted py-3">
                  <p>No forensic pathologist assigned to this case</p>
                </div>
              ) : (
                <div className="text-center text-muted py-3">
                  <p>No autopsy report available for this victim</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseOverview;
