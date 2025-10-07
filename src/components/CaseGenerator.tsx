import { useToast } from "@/hooks/use-toast";
import { useTaskInfo } from "@/hooks/useTaskInfo";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const CaseGenerator = ({ generatorForm, taskUrl, setTaskUrl }: { generatorForm: ReactNode; taskUrl: string | null; setTaskUrl: (taskUrl: string) => void }) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [taskId, setTaskId] = useState<string | null>(null);

    // Task polling
    const { data: taskInfo, isLoading: taskLoading } = useTaskInfo(taskId, !!taskId);

    // Extract task ID from location URL
    useEffect(() => {
        if (taskUrl) {
            const match = taskUrl.match(/\/task\/([^/]+)$/);
            if (match) {
                setTaskId(match[1]);
            }
        }
    }, [taskUrl]);

    // Handle task completion
    useEffect(() => {
        if (taskInfo) {
            const currentStatus = taskInfo.status || taskInfo.taskStatus;

            if (currentStatus === 'COMPLETED') {
                toast({
                    title: "Erfolg",
                    description: "Der Fall wurde erfolgreich erstellt!",
                });
                navigate('/admin/cases');
            } else if (currentStatus === 'FAILED') {
                toast({
                    title: "Fehler",
                    description: "Bei der Fallerstellung ist ein Fehler aufgetreten.",
                });
                setTaskId(null);
                setTaskUrl(null);
            }
        }
    }, [taskInfo, navigate, toast, setTaskUrl]);

    // Helper functions for task progress
    const getProgressPercentage = () => {
        if (!taskInfo) return 0;
        const currentStatus = taskInfo.status || taskInfo.taskStatus;

        switch (currentStatus) {
            case 'PENDING': return 10;
            case 'RUNNING': return 50;
            case 'COMPLETED': return 100;
            case 'FAILED': return 0;
            default: return 0;
        }
    };

    const getStatusText = () => {
        if (!taskInfo) return 'Wird geladen...';
        const currentStatus = taskInfo.status || taskInfo.taskStatus;

        switch (currentStatus) {
            case 'PENDING': return 'Warteschlange...';
            case 'RUNNING': return 'Fall wird erstellt...';
            case 'COMPLETED': return 'Abgeschlossen!';
            case 'FAILED': return 'Fehlgeschlagen';
            default: return 'Unbekannt';
        }
    };

    const getProgressBarClass = () => {
        if (!taskInfo) return 'bg-secondary';
        const currentStatus = taskInfo.status || taskInfo.taskStatus;

        switch (currentStatus) {
            case 'COMPLETED': return 'bg-success';
            case 'FAILED': return 'bg-danger';
            default: return 'bg-primary';
        }
    };

    // Handle form success
    const handleFormSuccess = (locationUrl: string) => {
        setTaskUrl(locationUrl);
    };

    // Handle form cancel
    const handleFormCancel = () => {
        navigate('/admin/cases');
    };

    // If task is running, show progress
    if (taskId && taskLoading) {
        return (
            <div className="min-vh-100 bg-body">
                <Header />
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Fall wird erstellt...</h2>
                                    <div className="progress mb-3" style={{ height: '20px' }}>
                                        <div
                                            className={`progress-bar ${getProgressBarClass()}`}
                                            role="progressbar"
                                            style={{ width: `${getProgressPercentage()}%` }}
                                        >
                                            {getProgressPercentage()}%
                                        </div>
                                    </div>
                                    <p className="text-muted">{getStatusText()}</p>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate('/admin/cases')}
                                        >
                                            Zurück zur Fallverwaltung
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => {
                                                setTaskId(null);
                                                setTaskUrl(null);
                                            }}
                                        >
                                            Überwachung beenden
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (taskId && taskInfo) {
        const currentStatus = taskInfo.status || taskInfo.taskStatus;
        const isPending = currentStatus === 'PENDING' || currentStatus === 'RUNNING';

        if (isPending || currentStatus === 'FAILED') {
            return (
                <div className="min-vh-100 bg-body">
                    <Header />
                    <div className="container py-4">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {currentStatus === 'FAILED' ? 'Fallerstellung fehlgeschlagen' : 'Fall wird erstellt'}
                                        </h2>

                                        {currentStatus !== 'FAILED' && (
                                            <>
                                                <div className="progress mb-3" style={{ height: '20px' }}>
                                                    <div
                                                        className={`progress-bar ${getProgressBarClass()}`}
                                                        role="progressbar"
                                                        style={{ width: `${getProgressPercentage()}%` }}
                                                    >
                                                        {getProgressPercentage()}%
                                                    </div>
                                                </div>
                                                <p className="text-muted">{getStatusText()}</p>
                                            </>
                                        )}

                                        {currentStatus === 'FAILED' && (
                                            <div className="alert alert-danger">
                                                Bei der Fallerstellung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
                                            </div>
                                        )}

                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => navigate('/admin/cases')}
                                            >
                                                Zurück zur Fallverwaltung
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    setTaskId(null);
                                                    setTaskUrl(null);
                                                }}
                                            >
                                                {currentStatus === 'FAILED' ? 'Zurück zum Formular' : 'Überwachung beenden'}
                                            </button>
                                        </div>

                                        {taskInfo && (
                                            <div className="mt-4">
                                                <h5>Task-Details:</h5>
                                                <ul className="list-unstyled">
                                                    <li><strong>Status:</strong> {currentStatus}</li>
                                                    <li><strong>Erstellt:</strong> {new Date(taskInfo.createdAt).toLocaleString('de-DE')}</li>
                                                    {taskInfo.updatedAt && (
                                                        <li><strong>Aktualisiert:</strong> {new Date(taskInfo.updatedAt).toLocaleString('de-DE')}</li>
                                                    )}
                                                </ul>
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
    }

    return (
        <div className="min-vh-100 bg-body">
            <Header />
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        {generatorForm}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaseGenerator;