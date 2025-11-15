import { useCaseMotives } from "@/hooks/useCaseMotives";
import { useDeleteCrimeCase } from "@/hooks/useDeleteCrimeCase";
import { usePerpetratorsByCaseId } from "@/hooks/usePerpetratorsByCaseId";
import { useSolutionEvidences } from "@/hooks/useSolutionEvidences";
import { useUpdateCrimeCase } from "@/hooks/useUpdateCrimeCase";
import { components } from "@/openapi/crimeAiSchema";
import { ChevronDown, ChevronUp, CircleCheck, CircleX, Coins, HatGlasses, House } from "lucide-react";
import { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { toLocalizedString } from "./ui/DateTimeFormatter";

type CrimeCaseGeneratorInfoDto = components['schemas']['CrimeCaseGeneratorInfoDto'];
type CrimeCaseDto = components['schemas']['CrimeCaseDto'];
type SubscriptionDto = components['schemas']['SubscriptionDto'];
type ExpansionState = 'SolutionExpanded' | 'DeleteWarningExpanded' | 'None';

const CaseRowEditable = ({ crimeCaseGeneratorInfo }: { crimeCaseGeneratorInfo: CrimeCaseGeneratorInfoDto }) => {

    const [expanded, setExpanded] = useState<ExpansionState>();
    const updateCrimeCase = useUpdateCrimeCase();
    const deleteCrimeCase = useDeleteCrimeCase();
    const pending = updateCrimeCase.isPending || deleteCrimeCase.isPending;


    const typeColor = crimeCaseGeneratorInfo.type === 'BASIC' ? 'bg-secondary' : 'bg-info';
    const typeLabel = crimeCaseGeneratorInfo.type === 'BASIC' ? 'Basis' : 'Ferienwohnung';
    const typeIcon = crimeCaseGeneratorInfo.type === 'BASIC' ? <span className="me-1"><HatGlasses /></span> : <span className="me-1"><House /></span>

    const handleStatusUpdate = async (crimeCase: CrimeCaseDto) => {
        try {
            await updateCrimeCase.mutateAsync({ caseId: crimeCase.id, crimeCaseDto: crimeCase });
            toast.success('Status wurde geändert.');
        } catch (error) {
            toast.error('Status konnte nicht geändert werden: ' + error.message);
        }
    };

    const handleCrimeCaseDelete = async (crimeCase: CrimeCaseDto) => {
        try {
            await deleteCrimeCase.mutateAsync({ caseId: crimeCase.id });
            toast.success('Kriminalfall wurde gelöscht.');
        } catch (error) {
            toast.error('Fehler beim Löschen des Kriminallfalls: ' + error.message);
        }
    }

    return (
        <>
            <tr key={crimeCaseGeneratorInfo.id} className="border-secondary align-middle">

                <td>
                    {crimeCaseGeneratorInfo.id}
                </td>
                <td>
                    {toLocalizedString(crimeCaseGeneratorInfo.createdAt)}
                </td>
                <td style={{ width: '140px' }}>
                    {crimeCaseGeneratorInfo.creator}
                </td>
                <td style={{ width: '140px' }}>
                    <div className={`badge ${typeColor}`} style={{ minWidth: '140px' }}>
                        <div className="d-flex align-items-center">{typeIcon}{typeLabel}</div>
                    </div>
                </td>
                <td style={{ width: '140px' }}>
                    {crimeCaseGeneratorInfo.subscription &&
                        <SubscriptionStatus subscription={crimeCaseGeneratorInfo.subscription} />
                    }
                </td>

                <td>{crimeCaseGeneratorInfo.generationAttempts}</td>

                {crimeCaseGeneratorInfo.crimeCase
                    ? <CrimeCaseColumns
                        crimeCase={crimeCaseGeneratorInfo.crimeCase}
                        handleStatusUpdate={handleStatusUpdate}
                        pending={pending}
                        expanded={expanded}
                        setExpanded={setExpanded} />
                    : <td colSpan={5}>
                        {crimeCaseGeneratorInfo.latestGeneration &&
                            <ProgressBar progressPercentage={crimeCaseGeneratorInfo.latestGeneration.progressPercentage} title={crimeCaseGeneratorInfo.latestGeneration.currentStep} />
                        }
                    </td>
                }

            </tr>
            {expanded === 'SolutionExpanded' && crimeCaseGeneratorInfo.crimeCase && (
                <SolutionRow caseId={crimeCaseGeneratorInfo.crimeCase.id} />
            )}
            {expanded === 'DeleteWarningExpanded' && crimeCaseGeneratorInfo.crimeCase && (
                <DeleteWarningRow pending={pending} deleteCrimeCase={() => handleCrimeCaseDelete(crimeCaseGeneratorInfo.crimeCase)} cancelDelete={() => setExpanded('None')} />
            )}
        </>
    );

}

const CrimeCaseColumns = ({
    crimeCase,
    handleStatusUpdate,
    pending,
    expanded,
    setExpanded
}: {
    crimeCase: CrimeCaseDto,
    handleStatusUpdate: (crimeCaseDto: CrimeCaseDto) => Promise<void>,
    pending: boolean,
    expanded: ExpansionState,
    setExpanded: (value: SetStateAction<ExpansionState>) => void
}) => {

    const navigate = useNavigate();
    const statusColor = crimeCase.status === 'PUBLISHED' ? 'bg-success' : 'bg-secondary';
    const statusLabel = crimeCase.status === 'PUBLISHED' ? 'Veröffentlicht' : 'Unveröffentlicht';
    const statusIcon = crimeCase.status === 'PUBLISHED' ? <span className="me-1"><CircleCheck /></span> : <span className="me-1"><CircleX /></span>

    return (
        <>
            <td style={{ width: '300px' }}>
                {crimeCase.title}
            </td>
            <td className="">
                <div className={`badge ${statusColor}`} style={{ minWidth: '140px' }}>
                    <div className="d-flex align-items-center">{statusIcon}{statusLabel}</div>
                </div>
            </td>
            <td>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-primary btn-sm"
                        disabled={pending}
                        onClick={() => navigate(`/case/${crimeCase.id}`)}
                    >
                        <i className="bi bi-eye me-1"></i>
                        Ansehen
                    </button>
                    <div className="dropdown">
                        <button
                            className="btn btn-outline-light btn-sm dropdown-toggle"
                            data-bs-toggle="dropdown"
                            disabled={pending}
                            style={{ zIndex: 1000 }}
                        >
                            <i className="bi bi-pencil-square me-1"></i>
                            Status ändern
                        </button>
                        <ul
                            className="dropdown-menu dropdown-menu-dark bg-dark border-secondary"
                            style={{ zIndex: 1050 }}
                        >
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleStatusUpdate({ ...crimeCase, status: 'UNPUBLISHED' })}
                                    disabled={crimeCase.status === 'UNPUBLISHED'}
                                >
                                    <i className="bi bi-x-circle me-2"></i>
                                    Unveröffentlicht
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleStatusUpdate({ ...crimeCase, status: 'PUBLISHED' })}
                                    disabled={crimeCase.status === 'PUBLISHED'}
                                >
                                    <i className="bi bi-check-circle me-2"></i>
                                    Veröffentlicht
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </td>
            <td className="text-center">
                <button
                    className="btn btn-sm btn-outline-info"
                    onClick={() => expanded === 'SolutionExpanded' ? setExpanded('None') : setExpanded('SolutionExpanded')}
                    disabled={pending}
                    title={expanded === 'SolutionExpanded' ? 'Lösung verbergen' : 'Lösung anzeigen'}
                >
                    {expanded === 'SolutionExpanded' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </td>
            <td className="text-center">
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setExpanded('DeleteWarningExpanded')}
                    disabled={pending}
                    title="Fall löschen"
                >
                    <i className="bi bi-trash"></i>
                </button>
            </td>
        </>
    );
}

const DeleteWarningRow = ({ pending, deleteCrimeCase, cancelDelete }: { pending: boolean; deleteCrimeCase: () => void; cancelDelete: () => void }) => {
    return (
        <tr>
            <td colSpan={11} className="bg-dark border-secondary">
                <div className="d-flex flex-column">
                    <h1 className="text-danger mb-3 text-center">⚠️ Achtung ⚠️</h1>
                    <h2 className="text-center">Beim Löschen werden sämtliche Daten für den Fall gelöscht!</h2>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-danger btn-sm m-4"
                            onClick={() => deleteCrimeCase()}
                            disabled={pending}
                        >
                            Löschen bestätigen
                        </button>
                        <button
                            className="btn btn-secondary btn-sm m-4"
                            onClick={cancelDelete}
                            disabled={pending}
                        >
                            Abbrechen
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    );
}

const SolutionRow = ({ caseId }: { caseId: string }) => {
    const { data: perpetrators, isLoading: loadingPerps, error: errorPerps } = usePerpetratorsByCaseId(caseId);
    const { data: evidences, isLoading: loadingEvidence, error: errorEvidence } = useSolutionEvidences(caseId);

    const perpetratorIds = perpetrators?.items?.map(p => p.id.toString()) || [];
    const { data: motives, isLoading: loadingMotives, error: errorMotives } = useCaseMotives(
        caseId,
        perpetratorIds[0]
    );

    const isLoading = loadingPerps || loadingEvidence || loadingMotives;
    const error = errorPerps || errorEvidence || errorMotives;

    const solution = {
        personNames: perpetrators?.items?.map(p => p.name) || [],
        evidenceTitles: evidences?.items?.map(e => e.title) || [],
        motiveTitles: motives?.items?.map(m => m.title) || []
    };

    return (
        <tr>
            <td colSpan={11} className="bg-dark border-secondary">
                <div className="p-4">
                    {isLoading && (
                        <div className="d-flex align-items-center gap-2 text-muted">
                            <span className="spinner-border spinner-border-sm" />
                            Lade Lösung...
                        </div>
                    )}

                    {error && (
                        <div className="text-warning">
                            <strong>⚠️ Lösung nicht verfügbar</strong>
                            <p className="mb-0 small mt-1">
                                {error.message.includes('404')
                                    ? 'Für diesen Fall wurde noch keine Lösung generiert.'
                                    : 'Fehler beim Laden der Lösung.'}
                            </p>
                        </div>
                    )}

                    {solution && !isLoading && (
                        <div className="row g-3">
                            {/* Täter */}
                            {solution.personNames && solution.personNames.length > 0 && (
                                <div className="col-md-4">
                                    <div className="card bg-danger bg-opacity-10 border-danger">
                                        <div className="card-body">
                                            <h6 className="text-danger mb-3">
                                                <strong>🔴 Täter</strong>
                                            </h6>
                                            <div className="d-flex flex-wrap gap-2">
                                                {solution.personNames.map((name, idx) => (
                                                    <span key={idx} className="badge bg-danger">
                                                        {name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Beweise */}
                            {solution.evidenceTitles && solution.evidenceTitles.length > 0 && (
                                <div className="col-md-4">
                                    <div className="card bg-warning bg-opacity-10 border-warning">
                                        <div className="card-body">
                                            <h6 className="text-warning mb-3">
                                                <strong>🔍 Überführende Beweise</strong>
                                            </h6>
                                            <ul className="list-unstyled mb-0">
                                                {solution.evidenceTitles.map((title, idx) => (
                                                    <li key={idx} className="text-light small mb-1">
                                                        • {title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Motive */}
                            {solution.motiveTitles && solution.motiveTitles.length > 0 && (
                                <div className="col-md-4">
                                    <div className="card bg-info bg-opacity-10 border-info">
                                        <div className="card-body">
                                            <h6 className="text-info mb-3">
                                                <strong>💡 Motive</strong>
                                            </h6>
                                            <ul className="list-unstyled mb-0">
                                                {solution.motiveTitles.map((title, idx) => (
                                                    <li key={idx} className="text-light small mb-1">
                                                        • {title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

const SubscriptionStatus = ({ subscription }: { subscription: SubscriptionDto }) => {

    const getColor = (subscription: SubscriptionDto) => {
        if (subscription.canceledAt) {
            return 'text-secondary';
        }
        if (subscription.status === 'trialing') {
            return 'text-warning';
        }
        if (subscription.status === 'active') {
            return 'text-success'
        }
        return 'text-danger';
    }

    const getLabel = (subscription: SubscriptionDto) => {
        if (subscription.canceledAt) {
            return 'gekündigt';
        }
        if (subscription.status === 'trialing') {
            return 'testen';
        }
        if (subscription.status === 'active') {
            return 'bezahlt'
        }
        return 'unbezahlt';
    }

    const bgColor = getColor(subscription);
    const label = getLabel(subscription);

    return (
        <div>
            <span className={`me-1 ${bgColor}`}><Coins /></span> {label}
        </div>
    );
}

export default CaseRowEditable;