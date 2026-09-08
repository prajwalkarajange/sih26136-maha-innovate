import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WorkflowProvider } from './context/WorkflowContext';
import { MahiProvider } from './context/MahiContext';
import { PortalLayout } from './components/PortalLayout';
import { PublicLayout } from './components/PublicLayout';

// Public Pages
import { Page01_LandingPage } from './pages/Page01_LandingPage';
import { Page02_LoginPage } from './pages/Page02_LoginPage';
import { Page05_AIRequirementAnalysisPage } from './pages/Page05_AIRequirementAnalysisPage';
import { AboutPage } from './pages/AboutPage';

// Authenticated Role-Specific Pages
import { Page03_GovernmentDashboard } from './pages/Page03_GovernmentDashboard';
import { Page04_CreateChallengePage } from './pages/Page04_CreateChallengePage';
import { Page06_AIStartupRecommendationPage } from './pages/Page06_AIStartupRecommendationPage';
import { Page07_StartupProfilePage } from './pages/Page07_StartupProfilePage';
import { Page08_ChallengeMarketplacePage } from './pages/Page08_ChallengeMarketplacePage';
import { Page09_ProposalSubmissionPage } from './pages/Page09_ProposalSubmissionPage';
import { Page10_ProposalEvaluationPage } from './pages/Page10_ProposalEvaluationPage';
import { Page11_StartupComparisonPage } from './pages/Page11_StartupComparisonPage';
import { Page12_PilotCreationPage } from './pages/Page12_PilotCreationPage';
import { Page13_PilotMonitoringPage } from './pages/Page13_PilotMonitoringPage';
import { Page14_PilotEvaluationPage } from './pages/Page14_PilotEvaluationPage';
import { Page15_ProcurementPage } from './pages/Page15_ProcurementPage';
import { Page16_ContractPaymentTrackingPage } from './pages/Page16_ContractPaymentTrackingPage';
import { Page17_ScalingRecommendationPage } from './pages/Page17_ScalingRecommendationPage';
import { Page18_ScalingDashboardPage } from './pages/Page18_ScalingDashboardPage';
import { Page19_AnalyticsDashboardPage } from './pages/Page19_AnalyticsDashboardPage';
import { Page20_AdminPage } from './pages/Page20_AdminPage';

// Helper component for Public Challenge Marketplace vs Authenticated Portal
const MarketplaceRoute: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  if (isAuthenticated) {
    return (
      <PortalLayout allowedRoles={['government', 'startup', 'evaluator', 'admin']}>
        <Page08_ChallengeMarketplacePage />
      </PortalLayout>
    );
  }
  return (
    <PublicLayout>
      <div className="py-8 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <Page08_ChallengeMarketplacePage />
      </div>
    </PublicLayout>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WorkflowProvider>
          <MahiProvider>
            <Routes>
              {/* PUBLIC ROUTE 1: Home Page */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <Page01_LandingPage />
                  </PublicLayout>
                }
              />

              {/* PUBLIC ROUTE 2: About Problem Statement 26136 */}
              <Route
                path="/about"
                element={
                  <PublicLayout>
                    <AboutPage />
                  </PublicLayout>
                }
              />

              {/* PUBLIC ROUTE 3: AI Requirement Analysis (Accessible Before Login) */}
              <Route
                path="/ai-analysis"
                element={
                  <PublicLayout>
                    <Page05_AIRequirementAnalysisPage />
                  </PublicLayout>
                }
              />

              {/* PUBLIC ROUTE 4: Login Page with 1-Click Test Accounts */}
              <Route
                path="/login"
                element={
                  <PublicLayout>
                    <Page02_LoginPage />
                  </PublicLayout>
                }
              />

              {/* Challenges Feed (Public preview or Portal) */}
              <Route path="/marketplace" element={<MarketplaceRoute />} />
              <Route path="/challenges" element={<MarketplaceRoute />} />

              {/* ============================================================== */}
              {/* AUTHENTICATED ROLE-RESTRICTED PORTAL ROUTES (STRICT RBAC)      */}
              {/* ============================================================== */}

              {/* 1. Government Officer Portal Routes */}
              <Route
                path="/dashboard"
                element={
                  <PortalLayout allowedRoles={['government', 'admin']}>
                    <Page03_GovernmentDashboard />
                  </PortalLayout>
                }
              />

              <Route
                path="/challenges/create"
                element={
                  <PortalLayout allowedRoles={['government', 'admin']}>
                    <Page04_CreateChallengePage />
                  </PortalLayout>
                }
              />

              <Route
                path="/ai-recommendations"
                element={
                  <PortalLayout allowedRoles={['government', 'admin']}>
                    <Page06_AIStartupRecommendationPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/proposals"
                element={
                  <PortalLayout allowedRoles={['government', 'startup', 'admin']}>
                    <Page10_ProposalEvaluationPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/comparison"
                element={
                  <PortalLayout allowedRoles={['government', 'evaluator', 'admin']}>
                    <Page11_StartupComparisonPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/pilots/create"
                element={
                  <PortalLayout allowedRoles={['government', 'admin']}>
                    <Page12_PilotCreationPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/pilots/:id"
                element={
                  <PortalLayout allowedRoles={['government', 'startup', 'evaluator', 'admin']}>
                    <Page13_PilotMonitoringPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/pilot-evaluation/:id"
                element={
                  <PortalLayout allowedRoles={['evaluator', 'admin']}>
                    <Page14_PilotEvaluationPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/procurement/:id"
                element={
                  <PortalLayout allowedRoles={['government', 'admin']}>
                    <Page15_ProcurementPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/contract-tracking"
                element={
                  <PortalLayout allowedRoles={['startup', 'government', 'admin']}>
                    <Page16_ContractPaymentTrackingPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/scaling-recommendation"
                element={
                  <PortalLayout allowedRoles={['government', 'admin']}>
                    <Page17_ScalingRecommendationPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/scaling-dashboard"
                element={
                  <PortalLayout allowedRoles={['government', 'admin']}>
                    <Page18_ScalingDashboardPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/analytics"
                element={
                  <PortalLayout allowedRoles={['government', 'evaluator', 'admin']}>
                    <Page19_AnalyticsDashboardPage />
                  </PortalLayout>
                }
              />

              {/* 2. Startup Portal Routes */}
              <Route
                path="/proposals/submit"
                element={
                  <PortalLayout allowedRoles={['startup']}>
                    <Page09_ProposalSubmissionPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/startups/:id"
                element={
                  <PortalLayout allowedRoles={['startup', 'government', 'evaluator', 'admin']}>
                    <Page07_StartupProfilePage />
                  </PortalLayout>
                }
              />

              {/* 3. Evaluator Portal Routes */}
              <Route
                path="/evaluations/:id"
                element={
                  <PortalLayout allowedRoles={['evaluator', 'admin']}>
                    <Page10_ProposalEvaluationPage />
                  </PortalLayout>
                }
              />

              {/* 4. Admin Portal Routes */}
              <Route
                path="/admin"
                element={
                  <PortalLayout allowedRoles={['admin']}>
                    <Page20_AdminPage />
                  </PortalLayout>
                }
              />

              <Route
                path="/admin/*"
                element={
                  <PortalLayout allowedRoles={['admin']}>
                    <Page20_AdminPage />
                  </PortalLayout>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MahiProvider>
        </WorkflowProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
