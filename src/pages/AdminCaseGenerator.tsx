
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import { usePromptTemplateIdentifiers } from "@/hooks/usePromptTemplateIdentifiers";
import { useTemplateContext } from "@/hooks/useTemplateContext";
import { useCreateCrimeCase } from "@/hooks/useCreateCrimeCase";
import { useTaskInfo } from "@/hooks/useTaskInfo";
import { useToast } from "@/hooks/use-toast";
import type { TemplateContextDto } from "../../supabase/functions/_shared/crime-api-types";

const AdminCaseGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [taskUrl, setTaskUrl] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);

  // Load all prompt template identifiers
  const { data: templateIdentifiers, isLoading: loadingTemplates, error: templateError } = usePromptTemplateIdentifiers();

  // Find the CrimeCaseUserPrompt template
  const crimeCaseTemplate = templateIdentifiers?.items?.find(
    template => template.name === "CrimeCaseUserPrompt"
  );

  // Load template context for the found template
  const { data: templateContext, isLoading: loadingContext, error: contextError } = useTemplateContext(crimeCaseTemplate?.id || null);

  // Create crime case mutation
  const createCaseMutation = useCreateCrimeCase();

  // Task polling - check for both 'status' and 'taskStatus' properties
  const { data: taskInfo, isLoading: taskLoading } = useTaskInfo(taskId, !!taskId);

  // Initialize form with dynamic default values
  const form = useForm<Record<string, string>>({
    defaultValues: {},
  });

  // Extract task ID from location URL
  useEffect(() => {
    if (taskUrl) {
      // Extract task ID from the URL (assuming format like /task/{id})
      const match = taskUrl.match(/\/task\/([^\/]+)$/);
      if (match) {
        setTaskId(match[1]);
      }
    }
  }, [taskUrl]);

  // Handle task completion - check both possible status property names
  useEffect(() => {
    if (taskInfo) {
      const currentStatus = taskInfo.status || taskInfo.taskStatus;
      
      if (currentStatus === 'COMPLETED') {
        toast({
          title: "Erfolg",
          description: "Der neue Kriminalfall wurde erfolgreich erstellt!",
        });
        
        // Auto-navigate to case list after short delay
        setTimeout(() => {
          navigate('/admin/cases');
        }, 2000);
      } else if (currentStatus === 'FAILED') {
        toast({
          title: "Fehler", 
          description: `Fallgenerierung fehlgeschlagen: ${taskInfo.error || 'Unbekannter Fehler'}`,
        });
        setTaskUrl(null);
        setTaskId(null);
      }
    }
  }, [taskInfo, navigate, toast]);

  // Get progress percentage based on status
  const getProgressPercentage = () => {
    if (!taskInfo) return 0;
    
    const currentStatus = taskInfo.status || taskInfo.taskStatus;
    
    switch (currentStatus) {
      case 'PENDING':
        return 25;
      case 'RUNNING':
        return 75;
      case 'COMPLETED':
        return 100;
      case 'FAILED':
        return 100;
      default:
        return 0;
    }
  };

  // Get status display text
  const getStatusText = () => {
    if (!taskInfo) return 'Startet...';
    
    const currentStatus = taskInfo.status || taskInfo.taskStatus;
    
    switch (currentStatus) {
      case 'PENDING':
        return 'Warteschlange...';
      case 'RUNNING':
        return 'Generiert Fall...';
      case 'COMPLETED':
        return 'Abgeschlossen!';
      case 'FAILED':
        return 'Fehlgeschlagen';
      default:
        return 'Unbekannter Status';
    }
  };

  // Get progress bar color class
  const getProgressBarClass = () => {
    if (!taskInfo) return 'bg-primary';
    
    const currentStatus = taskInfo.status || taskInfo.taskStatus;
    
    switch (currentStatus) {
      case 'PENDING':
        return 'bg-warning';
      case 'RUNNING':
        return 'bg-info progress-bar-striped progress-bar-animated';
      case 'COMPLETED':
        return 'bg-success';
      case 'FAILED':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  };

  const onSubmit = async (formData: Record<string, string>) => {
    try {
      console.log('Form data before submission:', formData);

      // Validate that all fields are filled
      const emptyFields = Object.entries(formData).filter(([_, value]) => !value?.trim());
      if (emptyFields.length > 0) {
        toast({
          title: "Validierungsfehler",
          description: `Bitte füllen Sie alle erforderlichen Felder aus: ${emptyFields.map(([key]) => key).join(', ')}`,
        });
        return;
      }

      // Convert form data to TemplateContextDto format
      const templateContextDto: TemplateContextDto = {
        variables: Object.entries(formData).map(([key, value]) => ({
          key,
          value: value.trim(),
        })),
      };

      console.log('Converted to TemplateContextDto:', templateContextDto);

      const result = await createCaseMutation.mutateAsync(templateContextDto);
      setTaskUrl(result.locationUrl);

      toast({
        title: "Task gestartet",
        description: "Die Fallgenerierung wurde gestartet. Bitte warten...",
      });
    } catch (error) {
      console.error('Error creating crime case:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Starten der Fallgenerierung. Bitte versuchen Sie es erneut.",
      });
    }
  };

  // Loading states
  if (loadingTemplates) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Lade Vorlagen...</span>
          </div>
          <p className="text-light mt-3">Lade Prompt-Vorlagen...</p>
        </div>
      </div>
    );
  }

  // Error states
  if (templateError) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="container py-5">
          <div className="alert alert-danger">
            <h4>Fehler beim Laden der Vorlagen</h4>
            <p>Fehler beim Laden der Prompt-Vorlagen: {templateError.message}</p>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/admin/cases')}
            >
              Zurück zur Fallverwaltung
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!crimeCaseTemplate) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="container py-5">
          <div className="alert alert-warning">
            <h4>Vorlage nicht gefunden</h4>
            <p>Die erforderliche "CrimeCaseUserPrompt" Vorlage wurde nicht gefunden.</p>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/admin/cases')}
            >
              Zurück zur Fallverwaltung
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loadingContext) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Lade Formularfelder...</span>
          </div>
          <p className="text-light mt-3">Lade Formular-Konfiguration...</p>
        </div>
      </div>
    );
  }

  if (contextError) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="container py-5">
          <div className="alert alert-danger">
            <h4>Fehler beim Laden der Formular-Konfiguration</h4>
            <p>Fehler beim Laden des Template-Kontexts: {contextError.message}</p>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/admin/cases')}
            >
              Zurück zur Fallverwaltung
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced task progress display
  if (taskId && (taskLoading || ['PENDING', 'RUNNING'].includes((taskInfo?.status || taskInfo?.taskStatus) || ''))) {
    const progressPercentage = getProgressPercentage();
    const statusText = getStatusText();
    const progressBarClass = getProgressBarClass();
    const currentStatus = taskInfo?.status || taskInfo?.taskStatus;

    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="container py-5 text-center">
          <div className="card bg-secondary border-secondary" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="card-body p-5">
              {/* Status Icon */}
              <div className="mb-4">
                {currentStatus === 'PENDING' && (
                  <div className="spinner-grow text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Wartend...</span>
                  </div>
                )}
                {currentStatus === 'RUNNING' && (
                  <div className="spinner-border text-info" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Läuft...</span>
                  </div>
                )}
              </div>

              <h3 className="text-light mb-3">Kriminalfall wird generiert</h3>
              
              {/* Status Text */}
              <p className="text-muted mb-3 h5">
                Status: {statusText}
              </p>

              {/* Enhanced Progress Bar */}
              <div className="progress mb-4" style={{ height: '20px' }}>
                <div 
                  className={`progress-bar ${progressBarClass}`}
                  role="progressbar"
                  style={{ width: `${progressPercentage}%` }}
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {progressPercentage}%
                </div>
              </div>

              {/* Task Info */}
              {taskInfo?.createdAt && (
                <p className="text-muted small mb-3">
                  Gestartet: {new Date(taskInfo.createdAt).toLocaleString('de-DE')}
                </p>
              )}

              {/* Status Description */}
              <p className="text-light mb-4">
                {currentStatus === 'PENDING' && 'Ihr Auftrag wurde in die Warteschlange eingereiht und wartet auf Bearbeitung...'}
                {currentStatus === 'RUNNING' && 'Der Kriminalfall wird gerade von der KI generiert. Dies kann einige Momente dauern...'}
              </p>

              {/* Navigation Options */}
              <div className="d-flex gap-3 justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={() => navigate('/admin/cases')}
                >
                  Zur Fallübersicht wechseln
                </button>
                
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setTaskUrl(null);
                    setTaskId(null);
                  }}
                >
                  Überwachung stoppen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const variables = templateContext?.variables || [];

  return (
    <div className="min-vh-100 bg-dark">
      <Header />
      
      <div className="container py-5" style={{ maxWidth: '800px' }}>
        <div className="mb-5">
          <h1 className="display-4 fw-bold text-light mb-4">
            Neuen Kriminalfall generieren
          </h1>
          <p className="h5 text-muted">
            Konfigurieren Sie Parameter für einen neuen Kriminalfall mit Vorlage: {crimeCaseTemplate.name}
          </p>
        </div>

        <div className="card bg-secondary border-secondary">
          <div className="card-body p-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="row g-4">
              {variables.map((variable, index) => (
                <div key={variable.key || index} className="col-12">
                  <label className="form-label text-light">
                    {variable.key}
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    {...form.register(variable.key || '', { required: true })}
                    placeholder={variable.value || `${variable.key} eingeben`}
                    className="form-control bg-dark border-secondary text-light"
                  />
                  <div className="form-text text-muted small">
                    Dieses Feld ist erforderlich
                  </div>
                </div>
              ))}

              {variables.length === 0 && (
                <div className="col-12">
                  <div className="alert alert-info">
                    <p className="mb-0">Keine Template-Variablen gefunden. Formularfelder können nicht generiert werden.</p>
                  </div>
                </div>
              )}

              <div className="col-12 pt-3">
                <div className="d-flex gap-3">
                  <button
                    type="submit"
                    disabled={createCaseMutation.isPending || variables.length === 0}
                    className="btn btn-success"
                  >
                    {createCaseMutation.isPending ? "Startet Generierung..." : "Kriminalfall generieren"}
                  </button>
                  
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/cases')}
                  >
                    Zurück zur Fallverwaltung
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCaseGenerator;
