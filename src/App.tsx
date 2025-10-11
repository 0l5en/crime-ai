
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { KeycloakProvider } from "./contexts/KeycloakContext";
import { UserProvider } from "./contexts/UserContext";
import AdminCaseGenerator from "./pages/AdminCaseGenerator";
import AdminCaseManagement from "./pages/AdminCaseManagement";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPromptManagement from "./pages/AdminPromptManagement";
import CaseDashboard from "./pages/CaseDashboard";
import Cases from "./pages/Cases";
import CaseSolution from "./pages/CaseSolution";
import Cookies from "./pages/Cookies";
import EmailInbox from "./pages/EmailInbox";
import Imprint from "./pages/Imprint";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VacationRentalCaseGenerator from "./pages/VacationRentalCaseGenerator";
import VacationRentalDashboard from "./pages/VacationRentalDashboard";
import VenuesPage from "./pages/VenuesPage";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <KeycloakProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/venues" element={<VenuesPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/imprint" element={<Imprint />} />
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
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
