
import { KeycloakProvider } from "@/contexts/KeycloakContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCaseGenerator from "./pages/AdminCaseGenerator";
import AdminCaseManagement from "./pages/AdminCaseManagement";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPromptManagement from "./pages/AdminPromptManagement";
import CaseDashboard from "./pages/CaseDashboard";
import CaseSolution from "./pages/CaseSolution";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <KeycloakProvider>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </KeycloakProvider>
  </QueryClientProvider>
);

export default App;
