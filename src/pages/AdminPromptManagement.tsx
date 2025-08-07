
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
        variant: "destructive",
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
        variant: "destructive",
      });
    }
  };

  if (identifiersLoading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center space-x-2 text-white">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading prompt templates...</span>
          </div>
        </div>
      </div>
    );
  }

  if (identifiersError) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-red-400 text-center">
            <p>Error loading prompt templates</p>
            <p className="text-sm text-gray-400 mt-2">{String(identifiersError)}</p>
          </div>
        </div>
      </div>
    );
  }

  const templates = identifiers?.items || [];

  if (templates.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Prompt-Template-Verwaltung
            </h1>
            <p className="text-xl text-gray-300">
              Verwalten Sie Ihre Prompt-Templates
            </p>
          </div>
          <div className="text-center text-gray-400">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Keine Prompt-Templates gefunden</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Prompt-Template-Verwaltung
          </h1>
          <p className="text-xl text-gray-300">
            Verwalten Sie Ihre Prompt-Templates
          </p>
        </div>

        <Tabs
          value={selectedTemplateId}
          onValueChange={(value) => {
            setSelectedTemplateId(value);
            setSelectedVersionId("");
          }}
          className="w-full"
        >
          <TabsList className="flex w-full mb-8 bg-slate-800 border border-slate-700">
            {templates.map((template) => (
              <TabsTrigger
                key={template.id}
                value={template.id?.toString() || ""}
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-200 text-slate-200"
              >
                {template.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {templates.map((template) => (
            <TabsContent key={template.id} value={template.id?.toString() || ""} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left side - Versions */}
                <div className="lg:col-span-1">
                  <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Versionen
                    </h3>

                    {versionsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {versions?.items?.map((version) => (
                          <div
                            key={version.id}
                            onClick={() => setSelectedVersionId(version.id?.toString() || "")}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedVersionId === version.id?.toString()
                              ? "bg-slate-700 border border-slate-600"
                              : "bg-slate-900 hover:bg-slate-700 border border-transparent"
                              }`}
                          >
                            <p className="text-white text-sm font-medium">
                              Version #{version.id}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {new Date(version.createdAt).toLocaleString('de-DE')}
                            </p>
                          </div>
                        )) || (
                            <p className="text-gray-400 text-center py-4">
                              Keine Versionen gefunden
                            </p>
                          )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side - Template Details */}
                <div className="lg:col-span-2">
                  <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Template-Inhalt
                    </h3>

                    {templateLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                      </div>
                    ) : templateDetails ? (
                      <div className="space-y-4">
                        <div className="text-sm text-gray-400">
                          {templateDetails.name} - Version #{templateDetails.id}
                          <br />
                          Erstellt: {templateDetails.createdAt ? new Date(templateDetails.createdAt).toLocaleString('de-DE') : 'N/A'}
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                              Bearbeiten Sie den Template-Inhalt und speichern Sie als neue Version
                            </div>
                            <Button
                              onClick={() => setIsEditing(!isEditing)}
                              variant="outline"
                              size="sm"
                            >
                              {isEditing ? "Ansicht" : "Bearbeiten"}
                            </Button>
                          </div>
                          <Textarea
                            value={isEditing ? editedContent : (templateDetails.template || "")}
                            onChange={(e) => {
                              if (isEditing) {
                                setEditedContent(e.target.value);
                              }
                            }}
                            readOnly={!isEditing}
                            className="min-h-96 bg-slate-900 border-slate-700 text-white resize-none font-mono text-sm"
                            placeholder="Template-Inhalt wird hier angezeigt..."
                          />
                          {isEditing && (
                            <div className="flex justify-end space-x-2">
                              <Button
                                onClick={() => {
                                  setIsEditing(false);
                                  setEditedContent(templateDetails?.template || "");
                                }}
                                variant="outline"
                                size="sm"
                              >
                                Abbrechen
                              </Button>
                              <Button
                                onClick={handleSave}
                                disabled={createTemplateMutation.isPending || !editedContent.trim()}
                                size="sm"
                              >
                                {createTemplateMutation.isPending ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Speichern...
                                  </>
                                ) : (
                                  <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Speichern
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Wählen Sie eine Version aus, um den Inhalt anzuzeigen</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPromptManagement;
