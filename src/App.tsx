
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KeycloakProvider } from "@/contexts/KeycloakContext";
import Index from "./pages/Index";
import CaseDashboard from "./pages/CaseDashboard";
import CaseSolution from "./pages/CaseSolution";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCaseManagement from "./pages/AdminCaseManagement";
import AdminCaseGenerator from "./pages/AdminCaseGenerator";
import AdminPromptManagement from "./pages/AdminPromptManagement";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <KeycloakProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/case/:caseId" 
              element={
                <ProtectedRoute requiredRoles={['admin', 'standard']}>
                  <CaseDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/case/:caseId/solution" 
              element={
                <ProtectedRoute requiredRoles={['admin', 'standard']}>
                  <CaseSolution />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/cases" 
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AdminCaseManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/case-generator" 
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AdminCaseGenerator />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/prompts" 
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AdminPromptManagement />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </KeycloakProvider>
  </QueryClientProvider>
);

export default App;
