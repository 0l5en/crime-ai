
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminCaseGenerator from "./pages/AdminCaseGenerator";
import AdminCaseManagement from "./pages/AdminCaseManagement";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPromptManagement from "./pages/AdminPromptManagement";
import AdminUserManagement from "./pages/AdminUserManagement";
import CaseDashboard from "./pages/CaseDashboard";
import Cases from "./pages/Cases";
import CaseSolution from "./pages/CaseSolution";
import Cookies from "./pages/Cookies";
import EmailInbox from "./pages/EmailInbox";
import Imprint from "./pages/Imprint";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import VacationRentalCaseGenerator from "./pages/VacationRentalCaseGenerator";
import VacationRentalDashboard from "./pages/VacationRentalDashboard";
import VenueRegister from "./pages/VenueRegister";
import VenuesPage from "./pages/VenuesPage";

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/venues" element={<VenuesPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/venue-register" element={<VenueRegister />} />
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
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <AdminAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <AdminUserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute requiredRoles={['admin', 'standard', 'vacation-rental']}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
