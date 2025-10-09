import { useUserContext } from "@/contexts/UserContext";
import { useCreateAutopsyReportRequest } from "@/hooks/useCreateAutopsyReportRequest";
import { components } from "@/openapi/crimeAiSchema";
import { User } from "lucide-react";
import { useTranslation } from 'react-i18next';

type PersonDto = components["schemas"]["PersonDto"];

// Format victim details into a flowing text
const formatVictimDetails = (victim: PersonDto, t: any) => {
    const details = [];

    if (victim.age) details.push(`${victim.age} ${t('overview.yearsOldSuffix')}`);
    if (victim.gender) details.push(victim.gender === 'MALE' ? t('overview.male') : victim.gender === 'FEMALE' ? t('overview.female') : victim.gender);
    if (victim.profession) details.push(`${t('overview.worksAs')} ${victim.profession}`);
    if (victim.maritalStatus) details.push(`${t('overview.maritalStatus')}: ${victim.maritalStatus}`);
    if (victim.relationshipToCase) details.push(`${t('overview.relationshipToCase')}: ${victim.relationshipToCase}`);

    let description = details.join(', ') + '.';

    if (victim.personality) {
        description += ` ${t('overview.personality')}: ${victim.personality}.`;
    }

    if (victim.financialSituation) {
        description += ` ${t('overview.financialSituation')}: ${victim.financialSituation}.`;
    }

    if (victim.previousConvictions && victim.previousConvictions.length > 0) {
        description += ` ${t('overview.previousConvictions')}: ${victim.previousConvictions.join(', ')}.`;
    }

    if (victim.alibi?.content) {
        description += ` ${t('overview.alibi')}: ${victim.alibi.content}.`;
    }

    if (victim.lifeStatus) {
        description += ` ${t('overview.status')}: ${victim.lifeStatus === 'DEAD' ? t('overview.deceased') : t('overview.alive')}.`;
    }

    return description;
};

const VictimInfomationSection = ({ victim }: { victim: PersonDto }) => {
    const { t } = useTranslation('caseDashboard');
    const requestAutopsyReportMutation = useCreateAutopsyReportRequest();
    const user = useUserContext();

    const handleRequestAutopsyReport = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.email) return;
        await requestAutopsyReportMutation.mutateAsync({ victimId: victim.id, userId: user.email });
    };

    return (
        <div className="col-12">
            <div
                className="card border-secondary"
            >
                <div className="card-body p-4">
                    <h3 className="h4 mb-3">{t('overview.victimInformation')}</h3>
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="h5 mb-3">
                                {victim.name}
                            </h4>
                            <p className="mb-0" style={{ textAlign: 'justify' }}>
                                {formatVictimDetails(victim, t)}
                            </p>
                            {victim.lifeStatus === 'DEAD' &&
                                <p className="mt-4">
                                    <button
                                        disabled={requestAutopsyReportMutation.isPending}
                                        onClick={handleRequestAutopsyReport}
                                        className="btn btn-primary"
                                        data-testid="request-autopsy-report-button"
                                    >
                                        {t('overview.requestAutopsyReport')}
                                    </button>
                                </p>}
                        </div>

                        <div className="col-md-4">
                            <div
                                className="d-flex align-items-center justify-content-center rounded position-relative overflow-hidden"
                                style={{
                                    aspectRatio: '1',
                                    backgroundColor: '#dc3545',
                                    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'
                                }}
                            >
                                {victim.imageUrl ? (
                                    <img
                                        src={victim.imageUrl}
                                        alt={victim.name}
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className="text-center text-white">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mx-auto mb-3"
                                            style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                                            <User size={40} strokeWidth={1.5} />
                                        </div>
                                        <div className="fw-medium">{t('overview.victim')}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VictimInfomationSection;