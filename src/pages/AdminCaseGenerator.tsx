
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
        variant: "destructive",
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="row g-4">
                <div className="col-md-6">
                  <FormField
                    control={form.control}
                    name="amountEvidences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-light">Number of Evidences</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            required
                            min="1"
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              field.onChange(isNaN(value) ? 1 : value);
                            }}
                            className="form-control bg-dark border-secondary text-light"
                          />
                        </FormControl>
                        <FormDescription className="text-muted small">
                          How many evidences should the case contain?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-md-6">
                  <FormField
                    control={form.control}
                    name="amountPersons"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-light">Number of Persons</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            required
                            min="1"
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              field.onChange(isNaN(value) ? 1 : value);
                            }}
                            className="form-control bg-dark border-secondary text-light"
                          />
                        </FormControl>
                        <FormDescription className="text-muted small">
                          How many persons should the case contain?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-md-6">
                  <FormField
                    control={form.control}
                    name="difficultyLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-light">Difficulty Level</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            required
                            min="1"
                            max="10"
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              field.onChange(isNaN(value) ? 1 : Math.min(Math.max(value, 1), 10));
                            }}
                            className="form-control bg-dark border-secondary text-light"
                          />
                        </FormControl>
                        <FormDescription className="text-muted small">
                          Difficulty level from 1 (easy) to 10 (hard)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-md-6">
                  <FormField
                    control={form.control}
                    name="maxAmountMotivesPerSuspect"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-light">Max. Motives per Suspect</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            required
                            min="1"
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              field.onChange(isNaN(value) ? 1 : value);
                            }}
                            className="form-control bg-dark border-secondary text-light"
                          />
                        </FormControl>
                        <FormDescription className="text-muted small">
                          Maximum number of motives per suspect
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-md-6">
                  <FormField
                    control={form.control}
                    name="era"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-light">Era</FormLabel>
                        <FormControl>
                          <Input
                            required
                            {...field}
                            className="form-control bg-dark border-secondary text-light"
                            placeholder="e.g. 1990s, Medieval, Modern"
                          />
                        </FormControl>
                        <FormDescription className="text-muted small">
                          In which era should the case take place?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-md-6">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-light">Language</FormLabel>
                        <FormControl>
                          <Input
                            required
                            {...field}
                            className="form-control bg-dark border-secondary text-light"
                            placeholder="e.g. English, German"
                          />
                        </FormControl>
                        <FormDescription className="text-muted small">
                          In which language should the case be generated?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-12">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-light">Location</FormLabel>
                        <FormControl>
                          <Input
                            required
                            {...field}
                            className="form-control bg-dark border-secondary text-light"
                            placeholder="e.g. Berlin, New York, London"
                          />
                        </FormControl>
                        <FormDescription className="text-muted small">
                          Where should the crime case take place?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-12 pt-3">
                  <div className="d-flex gap-3">
                    <Button
                      type="submit"
                      disabled={createCaseMutation.isPending}
                      variant="success"
                    >
                      {createCaseMutation.isPending ? "Generating..." : "Generate Now"}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => navigate('/admin/cases')}
                    >
                      Back to Case Management
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCaseGenerator;
