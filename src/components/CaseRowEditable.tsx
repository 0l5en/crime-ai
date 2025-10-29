import { useCaseMotives } from "@/hooks/useCaseMotives";
import { useDeleteCrimeCase } from "@/hooks/useDeleteCrimeCase";
import { usePerpetratorsByCaseId } from "@/hooks/usePerpetratorsByCaseId";
import { useSolutionEvidences } from "@/hooks/useSolutionEvidences";
import { useUpdateCrimeCase } from "@/hooks/useUpdateCrimeCase";
import { components } from "@/openapi/crimeAiSchema";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CrimeCaseDto = components['schemas']['CrimeCaseDto'];
type ExpansionState = 'SolutionExpanded' | 'DeleteWarningExpanded' | 'None';

const CaseRowEditable = ({ crimeCase }: { crimeCase: CrimeCaseDto }) => {
    const navigate = useNavigate();
    const updateCrimeCase = useUpdateCrimeCase();
    const deleteCrimeCase = useDeleteCrimeCase();
    const [expanded, setExpanded] = useState<ExpansionState>('None');
    const pending = updateCrimeCase.isPending || deleteCrimeCase.isPending;

    const handleStatusUpdate = async (crimeCaseDto: CrimeCaseDto) => {
        await updateCrimeCase.mutateAsync({
            caseId: crimeCaseDto.id,
            crimeCaseDto
        });
    };

    const handleCrimeCaseDelete = async () => {
        await deleteCrimeCase.mutateAsync({ caseId: crimeCase.id });
    }

    return (
        <>
            <tr key={crimeCase.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm text-foreground">
                    {pending ? (
                        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent" />
                    ) : <>{crimeCase.id.substring(0, 8)}...</>}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                    {crimeCase.title}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs">
                    <div className="truncate">{crimeCase.description}</div>
                </td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        crimeCase.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        crimeCase.status === 'PREMIUM' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-muted text-muted-foreground border border-border'
                    }`}>
                        {crimeCase.status === 'PUBLISHED' ? 'Veröffentlicht' :
                            crimeCase.status === 'PREMIUM' ? 'Premium' :
                                'Unveröffentlicht'}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 disabled:opacity-50 transition-colors"
                            disabled={pending}
                            onClick={() => navigate(`/case/${crimeCase.id}`)}
                        >
                            Ansehen
                        </button>
                        <div className="relative group">
                            <button
                                className="px-3 py-1.5 text-xs font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 border border-border disabled:opacity-50 transition-colors"
                                disabled={pending}
                            >
                                Status ändern ▼
                            </button>
                            <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-card border border-border rounded-md shadow-lg min-w-[140px] z-50">
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors first:rounded-t-md"
                                    onClick={() => handleStatusUpdate({ ...crimeCase, status: 'UNPUBLISHED' })}
                                    disabled={crimeCase.status === 'UNPUBLISHED'}
                                >
                                    Unveröffentlicht
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    onClick={() => handleStatusUpdate({ ...crimeCase, status: 'PUBLISHED' })}
                                    disabled={crimeCase.status === 'PUBLISHED'}
                                >
                                    Veröffentlicht
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors last:rounded-b-md"
                                    onClick={() => handleStatusUpdate({ ...crimeCase, status: 'PREMIUM' })}
                                    disabled={crimeCase.status === 'PREMIUM'}
                                >
                                    Premium
                                </button>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <button
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 disabled:opacity-50 transition-colors"
                        onClick={() => expanded === 'SolutionExpanded' ? setExpanded('None') : setExpanded('SolutionExpanded')}
                        disabled={pending}
                    >
                        {expanded === 'SolutionExpanded' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {expanded === 'SolutionExpanded' ? 'Verbergen' : 'Anzeigen'}
                    </button>
                </td>
                <td className="px-6 py-4">
                    <button
                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30 disabled:opacity-50 transition-colors"
                        onClick={() => setExpanded('DeleteWarningExpanded')}
                        disabled={pending}
                    >
                        Löschen
                    </button>
                </td>
            </tr>
            {expanded === 'SolutionExpanded' && (
                <SolutionRow caseId={crimeCase.id} />
            )}
            {expanded === 'DeleteWarningExpanded' && (
                <DeleteWarningRow pending={pending} deleteCrimeCase={handleCrimeCaseDelete} cancelDelete={() => setExpanded('None')} />
            )}
        </>
    );

}

const DeleteWarningRow = ({ pending, deleteCrimeCase, cancelDelete }: { pending: boolean; deleteCrimeCase: () => void; cancelDelete: () => void }) => {
    return (
        <tr>
            <td colSpan={7} className="px-6 py-8 bg-destructive/5 border-t border-border">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-bold text-destructive text-center">⚠️ Achtung ⚠️</h1>
                    <h2 className="text-lg text-center text-foreground">Beim Löschen werden sämtliche Daten für den Fall gelöscht!</h2>
                    <div className="flex gap-4">
                        <button
                            className="px-6 py-2 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 transition-colors"
                            onClick={() => deleteCrimeCase()}
                            disabled={pending}
                        >
                            Löschen bestätigen
                        </button>
                        <button
                            className="px-6 py-2 text-sm font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 border border-border disabled:opacity-50 transition-colors"
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
            <td colSpan={7} className="px-6 py-6 bg-muted/30 border-t border-border">
                <div className="space-y-4">
                    {isLoading && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent" />
                            Lade Lösung...
                        </div>
                    )}

                    {error && (
                        <div className="text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                            <strong className="block mb-1">⚠️ Lösung nicht verfügbar</strong>
                            <p className="text-sm">
                                {error.message.includes('404')
                                    ? 'Für diesen Fall wurde noch keine Lösung generiert.'
                                    : 'Fehler beim Laden der Lösung.'}
                            </p>
                        </div>
                    )}

                    {solution && !isLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Täter */}
                            {solution.personNames && solution.personNames.length > 0 && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                    <h6 className="text-red-400 font-semibold mb-3">
                                        🔴 Täter
                                    </h6>
                                    <div className="flex flex-wrap gap-2">
                                        {solution.personNames.map((name, idx) => (
                                            <span key={idx} className="px-2 py-1 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Beweise */}
                            {solution.evidenceTitles && solution.evidenceTitles.length > 0 && (
                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                    <h6 className="text-yellow-400 font-semibold mb-3">
                                        🔍 Überführende Beweise
                                    </h6>
                                    <ul className="list-none space-y-1">
                                        {solution.evidenceTitles.map((title, idx) => (
                                            <li key={idx} className="text-foreground text-sm">
                                                • {title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Motive */}
                            {solution.motiveTitles && solution.motiveTitles.length > 0 && (
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                    <h6 className="text-blue-400 font-semibold mb-3">
                                        💡 Motive
                                    </h6>
                                    <ul className="list-none space-y-1">
                                        {solution.motiveTitles.map((title, idx) => (
                                            <li key={idx} className="text-foreground text-sm">
                                                • {title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default CaseRowEditable;