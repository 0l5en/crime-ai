
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import { useCreateCrimeCase } from "@/hooks/useCreateCrimeCase";
import { useToast } from "@/hooks/use-toast";
import type { components } from '@/openapi/crimeAiSchema';

type CreateCrimeCaseDto = components['schemas']['CreateCrimeCaseDto'];

const AdminCaseGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createCaseMutation = useCreateCrimeCase();

  const form = useForm<CreateCrimeCaseDto>({
    defaultValues: {
      amountEvidences: 3,
      amountPersons: 4,
      difficultyLevel: 5,
      era: "1990s",
      language: "English",
      location: "Berlin",
      maxAmountMotivesPerSuspect: 2,
    },
  });

  const onSubmit = async (data: CreateCrimeCaseDto) => {
    try {
      console.log('Form data before submission:', data);
      
      const submitData: CreateCrimeCaseDto = {
        amountEvidences: data.amountEvidences,
        amountPersons: data.amountPersons,
        difficultyLevel: data.difficultyLevel,
        era: data.era,
        language: data.language,
        location: data.location,
        maxAmountMotivesPerSuspect: data.maxAmountMotivesPerSuspect,
      };
      
      await createCaseMutation.mutateAsync(submitData);
      toast({
        title: "Success",
        description: "New crime case has been generated successfully!",
      });
      navigate('/admin/cases');
    } catch (error) {
      console.error('Error creating crime case:', error);
      toast({
        title: "Error",
        description: "Error generating crime case. Please try again.",
      });
    }
  };

  return (
    <div className="min-vh-100 bg-dark">
      <Header />
      
      <div className="container py-5" style={{ maxWidth: '800px' }}>
        <div className="mb-5">
          <h1 className="display-4 fw-bold text-light mb-4">
            Generate New Crime Case
          </h1>
          <p className="h5 text-muted">
            Configure parameters for a new crime case
          </p>
        </div>

        <div className="card bg-secondary border-secondary">
          <div className="card-body p-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="row g-4">
              <div className="col-md-6">
                <label className="form-label text-light">Number of Evidences</label>
                <input
                  type="number"
                  required
                  min="1"
                  {...form.register("amountEvidences", { valueAsNumber: true })}
                  className="form-control bg-dark border-secondary text-light"
                />
                <div className="form-text text-muted small">
                  How many evidences should the case contain?
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-light">Number of Persons</label>
                <input
                  type="number"
                  required
                  min="1"
                  {...form.register("amountPersons", { valueAsNumber: true })}
                  className="form-control bg-dark border-secondary text-light"
                />
                <div className="form-text text-muted small">
                  How many persons should the case contain?
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-light">Difficulty Level</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="10"
                  {...form.register("difficultyLevel", { valueAsNumber: true })}
                  className="form-control bg-dark border-secondary text-light"
                />
                <div className="form-text text-muted small">
                  Difficulty level from 1 (easy) to 10 (hard)
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-light">Max. Motives per Suspect</label>
                <input
                  type="number"
                  required
                  min="1"
                  {...form.register("maxAmountMotivesPerSuspect", { valueAsNumber: true })}
                  className="form-control bg-dark border-secondary text-light"
                />
                <div className="form-text text-muted small">
                  Maximum number of motives per suspect
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-light">Era</label>
                <input
                  required
                  {...form.register("era")}
                  className="form-control bg-dark border-secondary text-light"
                  placeholder="e.g. 1990s, Medieval, Modern"
                />
                <div className="form-text text-muted small">
                  In which era should the case take place?
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-light">Language</label>
                <input
                  required
                  {...form.register("language")}
                  className="form-control bg-dark border-secondary text-light"
                  placeholder="e.g. English, German"
                />
                <div className="form-text text-muted small">
                  In which language should the case be generated?
                </div>
              </div>

              <div className="col-12">
                <label className="form-label text-light">Location</label>
                <input
                  required
                  {...form.register("location")}
                  className="form-control bg-dark border-secondary text-light"
                  placeholder="e.g. Berlin, New York, London"
                />
                <div className="form-text text-muted small">
                  Where should the crime case take place?
                </div>
              </div>

              <div className="col-12 pt-3">
                <div className="d-flex gap-3">
                  <button
                    type="submit"
                    disabled={createCaseMutation.isPending}
                    className="btn btn-success"
                  >
                    {createCaseMutation.isPending ? "Generating..." : "Generate Now"}
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
