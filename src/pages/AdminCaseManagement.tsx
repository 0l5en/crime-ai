
import CaseRowEditable from "@/components/CaseRowEditable";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useDeleteCrimeCase } from "@/hooks/useDeleteCrimeCase";
import { useUpdateCrimeCase } from "@/hooks/useUpdateCrimeCase";
import type { components } from '@/openapi/crimeAiSchema';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CrimeCaseDto = components['schemas']['CrimeCaseDto'];

const AdminCaseManagement = () => {
  const navigate = useNavigate();
  const { data: crimeCases, isLoading, error } = useCrimeCases();
  const updateCrimeCase = useUpdateCrimeCase();
  const { toast } = useToast();
  const [updatingCaseId, setUpdatingCaseId] = useState<string | null>(null);
  const [expandedCaseIds, setExpandedCaseIds] = useState<Set<string>>(new Set());
  const deleteCrimeCase = useDeleteCrimeCase();



  const handleDeleteCrimeCase = async (caseId: string) => {
    await deleteCrimeCase.mutateAsync({ caseId });
  }

  const toggleSolution = (caseId: string) => {
    setExpandedCaseIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(caseId)) {
        newSet.delete(caseId);
      } else {
        newSet.add(caseId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Kriminalfall-Verwaltung
            </h1>
            <p className="text-lg text-muted-foreground">
              Übersicht aller verfügbaren Kriminalfälle
            </p>
          </div>
          <button
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            onClick={() => navigate('/admin/case-generator')}
          >
            Neuen Fall generieren
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4" />
            <div className="text-foreground text-xl">Lade Kriminalfälle...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-destructive text-xl font-semibold mb-4">
              Fehler beim Laden der Kriminalfälle
            </div>
            <div className="text-muted-foreground">
              {error.message}
            </div>
          </div>
        )}

        {!isLoading && !error && (!crimeCases?.items || crimeCases.items.length === 0) && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-xl">
              Keine Kriminalfälle verfügbar
            </div>
          </div>
        )}

        {!isLoading && !error && crimeCases?.items && crimeCases.items.length > 0 && (
          <div className="bg-card rounded-lg border border-border shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Titel</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Beschreibung</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Aktionen</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Lösung</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {crimeCases.items.map((crimeCase) => <CaseRowEditable crimeCase={crimeCase} key={crimeCase.id} />)}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!isLoading && !error && crimeCases?.items && crimeCases.items.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Insgesamt {crimeCases.items.length} Kriminalfälle gefunden
            </p>
          </div>
        )}
      </div>
    </div>
  );
};



export default AdminCaseManagement;
