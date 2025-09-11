
import { KeycloakProvider } from "@/contexts/KeycloakContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCaseGenerator from "./pages/AdminCaseGenerator";
import AdminCaseManagement from "./pages/AdminCaseManagement";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPromptManagement from "./pages/AdminPromptManagement";
import Cases from "./pages/Cases";
import CaseDashboard from "./pages/CaseDashboard";
import CaseSolution from "./pages/CaseSolution";
import EmailInbox from "./pages/EmailInbox";
import EvidenceDetails from "./pages/EvidenceDetails";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VacationRentalCaseGenerator from "./pages/VacationRentalCaseGenerator";
import VacationRentalDashboard from "./pages/VacationRentalDashboard";
import VenuesPage from "./pages/VenuesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <KeycloakProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/venues" element={<VenuesPage />} />
            <Route
              path="/case/:caseId"
              element={
                <ProtectedRoute requiredRoles={['admin', 'standard']}>
                  <CaseDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/case/:caseId/evidence/:evidenceId"
              element={
                <ProtectedRoute requiredRoles={['admin', 'standard']}>
                  <EvidenceDetails />
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
              path="/emails"
              element={
                <ProtectedRoute requiredRoles={['admin', 'standard']}>
                  <EmailInbox />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vacation-rental-dashboard"
              element={
                <ProtectedRoute requiredRoles={['vacation-rental']}>
                  <VacationRentalDashboard />
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
              path="/admin/vacation-rental-case-generator"
              element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <VacationRentalCaseGenerator />
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
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
