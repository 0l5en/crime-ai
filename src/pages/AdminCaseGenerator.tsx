import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import { usePromptTemplateIdentifiers } from "@/hooks/usePromptTemplateIdentifiers";
import { useTemplateContext } from "@/hooks/useTemplateContext";
import { useCreateCrimeCase } from "@/hooks/useCreateCrimeCase";
import { useTaskInfo } from "@/hooks/useTaskInfo";
import { useToast } from "@/hooks/use-toast";

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

  // Task polling
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

  // Handle task completion
  useEffect(() => {
    if (taskInfo?.status === 'COMPLETED') {
      toast({
        title: "Success",
        description: "New crime case has been generated successfully!",
      });
      navigate('/admin/cases');
    } else if (taskInfo?.status === 'FAILED') {
      toast({
        title: "Error", 
        description: `Crime case generation failed: ${taskInfo.error || 'Unknown error'}`,
      });
      setTaskUrl(null);
      setTaskId(null);
    }
  }, [taskInfo?.status, navigate, toast]);

  const onSubmit = async (formData: Record<string, string>) => {
    try {
      console.log('Form data before submission:', formData);

      // Validate that all fields are filled
      const emptyFields = Object.entries(formData).filter(([_, value]) => !value?.trim());
      if (emptyFields.length > 0) {
        toast({
          title: "Validation Error",
          description: `Please fill in all required fields: ${emptyFields.map(([key]) => key).join(', ')}`,
        });
        return;
      }

      // Convert form data to TemplateContextDto format
      const templateContextDto = {
        variables: Object.entries(formData).map(([key, value]) => ({
          key,
          value: value.trim(),
        })),
      };

      const result = await createCaseMutation.mutateAsync(templateContextDto);
      setTaskUrl(result.locationUrl);

      toast({
        title: "Task Started",
        description: "Crime case generation has been started. Please wait...",
      });
    } catch (error) {
      console.error('Error creating crime case:', error);
      toast({
        title: "Error",
        description: "Error starting crime case generation. Please try again.",
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
            <span className="visually-hidden">Loading templates...</span>
          </div>
          <p className="text-light mt-3">Loading prompt templates...</p>
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
            <h4>Error Loading Templates</h4>
            <p>Failed to load prompt templates: {templateError.message}</p>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/admin/cases')}
            >
              Back to Case Management
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
            <h4>Template Not Found</h4>
            <p>The required "CrimeCaseUserPrompt" template was not found.</p>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/admin/cases')}
            >
              Back to Case Management
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
            <span className="visually-hidden">Loading form fields...</span>
          </div>
          <p className="text-light mt-3">Loading form configuration...</p>
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
            <h4>Error Loading Form Configuration</h4>
            <p>Failed to load template context: {contextError.message}</p>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/admin/cases')}
            >
              Back to Case Management
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Task polling in progress
  if (taskId && (taskLoading || ['PENDING', 'RUNNING'].includes(taskInfo?.status || ''))) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        <div className="container py-5 text-center">
          <div className="card bg-secondary border-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card-body p-5">
              <div className="spinner-border text-primary mb-4" role="status">
                <span className="visually-hidden">Generating case...</span>
              </div>
              <h3 className="text-light mb-3">Generating Crime Case</h3>
              <p className="text-muted mb-3">
                Status: {taskInfo?.status || 'PENDING'}
              </p>
              <p className="text-light">
                Please wait while we generate your crime case. This may take a few moments...
              </p>
              <div className="progress mt-4">
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                  style={{ width: '100%' }}
                ></div>
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
            Generate New Crime Case
          </h1>
          <p className="h5 text-muted">
            Configure parameters for a new crime case using template: {crimeCaseTemplate.name}
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
                    placeholder={variable.value || `Enter ${variable.key}`}
                    className="form-control bg-dark border-secondary text-light"
                  />
                  <div className="form-text text-muted small">
                    This field is required
                  </div>
                </div>
              ))}

              {variables.length === 0 && (
                <div className="col-12">
                  <div className="alert alert-info">
                    <p className="mb-0">No template variables found. Unable to generate form fields.</p>
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
                    {createCaseMutation.isPending ? "Starting Generation..." : "Generate Crime Case"}
                  </button>
                  
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/cases')}
                  >
                    Back to Case Management
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
