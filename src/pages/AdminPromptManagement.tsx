
import Header from "@/components/Header";
import { useCreatePromptTemplate } from "@/hooks/useCreatePromptTemplate";
import { usePromptTemplate } from "@/hooks/usePromptTemplate";
import { usePromptTemplateIdentifiers } from "@/hooks/usePromptTemplateIdentifiers";
import { usePromptTemplateVersions } from "@/hooks/usePromptTemplateVersions";
import { useToast } from "@/hooks/use-toast";
import { Clock, FileText, Loader2, Save } from "lucide-react";
import React, { useState } from "react";

const AdminPromptManagement = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [selectedVersionId, setSelectedVersionId] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { toast } = useToast();

  const { data: identifiers, isLoading: identifiersLoading, error: identifiersError } = usePromptTemplateIdentifiers();
  const { data: versions, isLoading: versionsLoading } = usePromptTemplateVersions(
    identifiers?.items?.find(item => item.id?.toString() === selectedTemplateId)?.name || ""
  );
  const { data: templateDetails, isLoading: templateLoading } = usePromptTemplate(selectedVersionId);
  const createTemplateMutation = useCreatePromptTemplate();

  // Update edited content when template details change
  React.useEffect(() => {
    if (templateDetails?.template && !isEditing) {
      setEditedContent(templateDetails.template);
    }
  }, [templateDetails?.template, isEditing]);

  const handleSave = async () => {
    const currentTemplate = identifiers?.items?.find(item => item.id?.toString() === selectedTemplateId);
    if (!currentTemplate?.name || !editedContent.trim()) {
      toast({
        title: "Fehler",
        description: "Template-Name und Inhalt sind erforderlich",
      });
      return;
    }

    try {
      await createTemplateMutation.mutateAsync({
        name: currentTemplate.name,
        template: editedContent,
      });
      
      toast({
        title: "Erfolgreich gespeichert",
        description: "Das Template wurde erfolgreich erstellt",
      });
      
      setIsEditing(false);
      // Reset selected version to show the new version will appear in the list
      setSelectedVersionId("");
    } catch (error) {
      toast({
        title: "Fehler beim Speichern",
        description: "Das Template konnte nicht gespeichert werden",
      });
    }
  };

  if (identifiersLoading) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="d-flex align-items-center justify-content-center" style={{ height: '24rem' }}>
          <div className="d-flex align-items-center text-white">
            <Loader2 className="me-2 spinner-border spinner-border-sm" />
            <span>Loading prompt templates...</span>
          </div>
        </div>
      </div>
    );
  }

  if (identifiersError) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="d-flex align-items-center justify-content-center" style={{ height: '24rem' }}>
          <div className="text-danger text-center">
            <p>Error loading prompt templates</p>
            <p className="small text-muted mt-2">{String(identifiersError)}</p>
          </div>
        </div>
      </div>
    );
  }

  const templates = identifiers?.items || [];

  if (templates.length === 0) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="container py-5">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-white mb-4">
              Prompt-Template-Verwaltung
            </h1>
            <p className="h5 text-muted">
              Verwalten Sie Ihre Prompt-Templates
            </p>
          </div>
          <div className="text-center text-muted">
            <FileText className="mx-auto mb-4" style={{ width: '4rem', height: '4rem', opacity: '0.5' }} />
            <p>Keine Prompt-Templates gefunden</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-dark">
      <Header />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-white mb-4">
            Prompt-Template-Verwaltung
          </h1>
          <p className="h5 text-muted">
            Verwalten Sie Ihre Prompt-Templates
          </p>
        </div>

        <div className="w-100">
          <ul className="nav nav-tabs d-flex w-100 mb-4 bg-dark border border-secondary">
            {templates.map((template) => (
              <li key={template.id} className="nav-item">
                <button 
                  className={`nav-link text-muted bg-transparent border-0 px-3 py-2 ${selectedTemplateId === template.id?.toString() ? 'active text-light bg-secondary' : ''}`}
                  onClick={() => {
                    setSelectedTemplateId(template.id?.toString() || "");
                    setSelectedVersionId("");
                  }}
                >
                  {template.name}
                </button>
              </li>
            ))}
          </ul>

          {templates.map((template) => (
            selectedTemplateId === template.id?.toString() && (
              <div key={template.id} className="mt-3">
                <div className="row">
                  {/* Left side - Versions */}
                  <div className="col-lg-4">
                    <div className="card bg-dark border-secondary p-4">
                      <h3 className="h5 fw-semibold text-white mb-4 d-flex align-items-center">
                        <Clock className="me-2" style={{ width: '20px', height: '20px' }} />
                        Versionen
                      </h3>

                      {versionsLoading ? (
                        <div className="d-flex align-items-center justify-content-center py-4">
                          <Loader2 className="spinner-border spinner-border-sm text-muted" />
                        </div>
                      ) : (
                        <div className="d-flex flex-column gap-2" style={{ maxHeight: '24rem', overflowY: 'auto' }}>
                          {versions?.items?.map((version) => (
                            <div
                              key={version.id}
                              onClick={() => setSelectedVersionId(version.id?.toString() || "")}
                              className={`p-3 rounded cursor-pointer transition ${selectedVersionId === version.id?.toString()
                                ? "bg-secondary border border-secondary"
                                : "bg-dark-subtle border border-transparent card-hover"
                                }`}
                              style={{ cursor: 'pointer' }}
                            >
                              <p className="text-white small fw-medium mb-1">
                                Version #{version.id}
                              </p>
                              <p className="text-muted small mb-0">
                                {new Date(version.createdAt).toLocaleString('de-DE')}
                              </p>
                            </div>
                          )) || (
                              <p className="text-muted text-center py-4">
                                Keine Versionen gefunden
                              </p>
                            )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side - Template Details */}
                  <div className="col-lg-8">
                    <div className="card bg-dark border-secondary p-4">
                      <h3 className="h5 fw-semibold text-white mb-4">
                        Template-Inhalt
                      </h3>

                      {templateLoading ? (
                        <div className="d-flex align-items-center justify-content-center py-4">
                          <Loader2 className="spinner-border spinner-border-sm text-muted" />
                        </div>
                      ) : templateDetails ? (
                        <div className="d-flex flex-column gap-4">
                          <div className="small text-muted">
                            {templateDetails.name} - Version #{templateDetails.id}
                            <br />
                            Erstellt: {templateDetails.createdAt ? new Date(templateDetails.createdAt).toLocaleString('de-DE') : 'N/A'}
                          </div>
                          <div className="d-flex flex-column gap-4">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="small text-muted">
                                Bearbeiten Sie den Template-Inhalt und speichern Sie als neue Version
                              </div>
                              <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="btn btn-outline-primary btn-sm"
                              >
                                {isEditing ? "Ansicht" : "Bearbeiten"}
                              </button>
                            </div>
                            <textarea
                              value={isEditing ? editedContent : (templateDetails?.template || "")}
                              onChange={(e) => {
                                if (isEditing) {
                                  setEditedContent(e.target.value);
                                }
                              }}
                              readOnly={!isEditing}
                              className="form-control bg-dark border-secondary text-white font-monospace small"
                              style={{ minHeight: '24rem', resize: 'none' }}
                              placeholder="Template-Inhalt wird hier angezeigt..."
                            />
                            {isEditing && (
                              <div className="d-flex justify-content-end gap-2">
                                <button
                                  onClick={() => {
                                    setIsEditing(false);
                                    setEditedContent(templateDetails?.template || "");
                                  }}
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  Abbrechen
                                </button>
                                <button
                                  onClick={handleSave}
                                  disabled={createTemplateMutation.isPending || !editedContent.trim()}
                                  className="btn btn-primary btn-sm"
                                >
                                  {createTemplateMutation.isPending ? (
                                    <>
                                      <Loader2 className="me-2 spinner-border spinner-border-sm" />
                                      Speichern...
                                    </>
                                  ) : (
                                    <>
                                      <Save className="me-2" style={{ width: '16px', height: '16px' }} />
                                      Speichern
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4 text-muted">
                          <FileText className="mx-auto mb-2" style={{ width: '3rem', height: '3rem', opacity: '0.5' }} />
                          <p>Wählen Sie eine Version aus, um den Inhalt anzuzeigen</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPromptManagement;
