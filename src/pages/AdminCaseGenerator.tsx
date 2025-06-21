
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateCrimeCase } from "@/hooks/useCreateCrimeCase";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  amountEvidences: z.number().min(1, "At least 1 evidence required"),
  amountPersons: z.number().min(1, "At least 1 person required"),
  difficultyLevel: z.number().min(1).max(10, "Difficulty level must be between 1 and 10"),
  era: z.string().min(1, "Era is required"),
  language: z.string().min(1, "Language is required"),
  location: z.string().min(1, "Location is required"),
  maxAmountMotivesPerSuspect: z.number().min(1, "At least 1 motive per suspect required"),
});

type FormData = z.infer<typeof formSchema>;

const AdminCaseGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createCaseMutation = useCreateCrimeCase();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (data: FormData) => {
    try {
      await createCaseMutation.mutateAsync(data);
      toast({
        title: "Success",
        description: "New crime case has been generated successfully!",
      });
      navigate('/admin/cases');
    } catch (error) {
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
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                          min="1"
                          max="10"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
