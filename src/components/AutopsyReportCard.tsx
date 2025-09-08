import { useAutopsyReports } from "@/hooks/useAutopsyReports";
import { components } from "@/openapi/crimeAiSchema";
import { FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type NotificationDto = components["schemas"]["NotificationDto"];
type AutopsyReportDto = components["schemas"]["AutopsyReportDto"];

const AutopsyReportCard = ({ notification }: { notification: NotificationDto }) => {

    const { data: autopsyReports, isLoading: autopsyLoading, error: autopsyLoadError } = useAutopsyReports(
        notification.notificationContextType === "AUTOPSY_REPORT" ? { notificationId: notification.id } : {});

    const autopsyReport: AutopsyReportDto | null = autopsyReports?.items && autopsyReports.items.length > 0
        ? autopsyReports.items[0]
        : null;

    return (
        <div
            className="card border-0 text-light"
            style={{ backgroundColor: '#2a2a2a' }}>
            <div className="card-body p-4">
                <h3 className="h4 text-white mb-3">Autopsy Report</h3>

                {autopsyLoading ? (
                    <div className="text-center text-muted py-3">
                        <p>Loading autopsy report...</p>
                    </div>
                ) : autopsyReport ? (
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="h5 text-white mb-3">
                                Conducted by {notification.nameOfSender}
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
                                className="d-flex align-items-center justify-content-center rounded position-relative overflow-hidden"
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
                ) : (
                    <div className="text-center text-muted py-3">
                        <p>No autopsy report available for this notification</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AutopsyReportCard;