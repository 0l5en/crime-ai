
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
      
      // Ensure all required fields are present
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
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Generate New Crime Case
          </h1>
          <p className="text-xl text-gray-300">
            Configure parameters for a new crime case
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="amountEvidences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Number of Evidences</FormLabel>
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
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        How many evidences should the case contain?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amountPersons"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Number of Persons</FormLabel>
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
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        How many persons should the case contain?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficultyLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Difficulty Level</FormLabel>
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
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Difficulty level from 1 (easy) to 10 (hard)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxAmountMotivesPerSuspect"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Max. Motives per Suspect</FormLabel>
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
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Maximum number of motives per suspect
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="era"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Era</FormLabel>
                      <FormControl>
                        <Input
                          required
                          {...field}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="e.g. 1990s, Medieval, Modern"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        In which era should the case take place?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Language</FormLabel>
                      <FormControl>
                        <Input
                          required
                          {...field}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="e.g. English, German"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        In which language should the case be generated?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Location</FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="e.g. Berlin, New York, London"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Where should the crime case take place?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={createCaseMutation.isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {createCaseMutation.isPending ? "Generating..." : "Generate Now"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/cases')}
                  className="bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700"
                >
                  Back to Case Management
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminCaseGenerator;
