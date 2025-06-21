
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
  amountEvidences: z.number().min(1, "Mindestens 1 Beweis erforderlich"),
  amountPersons: z.number().min(1, "Mindestens 1 Person erforderlich"),
  difficultyLevel: z.number().min(1).max(10, "Schwierigkeitsgrad muss zwischen 1 und 10 liegen"),
  era: z.string().min(1, "Zeitalter ist erforderlich"),
  language: z.string().min(1, "Sprache ist erforderlich"),
  location: z.string().min(1, "Ort ist erforderlich"),
  maxAmountMotivesPerSuspect: z.number().min(1, "Mindestens 1 Motiv pro Verdächtigem erforderlich"),
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
      era: "1990er",
      language: "Deutsch",
      location: "Berlin",
      maxAmountMotivesPerSuspect: 2,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createCaseMutation.mutateAsync(data);
      toast({
        title: "Erfolg",
        description: "Neuer Kriminalfall wurde erfolgreich generiert!",
      });
      navigate('/admin/cases');
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Fehler beim Generieren des Kriminalfalls. Bitte versuchen Sie es erneut.",
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
            Neuen Kriminalfall generieren
          </h1>
          <p className="text-xl text-gray-300">
            Konfigurieren Sie die Parameter für einen neuen Kriminalfall
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
                      <FormLabel className="text-white">Anzahl Beweise</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Wie viele Beweise soll der Fall enthalten?
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
                      <FormLabel className="text-white">Anzahl Personen</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Wie viele Personen soll der Fall enthalten?
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
                      <FormLabel className="text-white">Schwierigkeitsgrad</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Schwierigkeitsgrad von 1 (leicht) bis 10 (schwer)
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
                      <FormLabel className="text-white">Max. Motive pro Verdächtigem</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Maximale Anzahl Motive pro Verdächtigem
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
                      <FormLabel className="text-white">Zeitalter</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="z.B. 1990er, Mittelalter, Moderne"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        In welchem Zeitalter soll der Fall spielen?
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
                      <FormLabel className="text-white">Sprache</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="z.B. Deutsch, Englisch"
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        In welcher Sprache soll der Fall generiert werden?
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
                    <FormLabel className="text-white">Ort</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="z.B. Berlin, New York, London"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Wo soll der Kriminalfall stattfinden?
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
                  {createCaseMutation.isPending ? "Generiere..." : "Jetzt generieren"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/cases')}
                  className="bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700"
                >
                  Zurück zur Kriminalfall-Verwaltung
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
