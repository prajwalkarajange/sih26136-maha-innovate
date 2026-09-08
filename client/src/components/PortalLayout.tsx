import React from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { MahiAssistantDrawer } from './MahiAssistantDrawer';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';

interface PortalLayoutProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  portalType?: 'government' | 'startup' | 'admin' | 'evaluator';
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, role, user, logout } = useAuth();
  const navigate = useNavigate();

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Strict Role-Based Access Control (RBAC) Guard
  if (allowedRoles && !allowedRoles.includes(role)) {
    const roleLabels: Record<UserRole, string> = {
      government: 'Government Officer',
      startup: 'Startup Founder',
      evaluator: 'Technical Evaluator',
      admin: 'System Administrator'
    };

    const roleDashboards: Record<UserRole, string> = {
      government: '/dashboard',
      startup: '/marketplace',
      evaluator: '/evaluations/1',
      admin: '/admin'
    };

    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
        <Header />

        <div className="flex-1 flex flex-row w-full">
          <Sidebar />

          <main className="flex-1 p-6 lg:p-12 w-full max-w-4xl mx-auto flex items-center justify-center">
            <div className="bg-white rounded-2xl border border-red-200 shadow-xl p-8 max-w-lg w-full text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto text-red-600 shadow-2xs">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                  Access Restricted (403 Forbidden)
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  Role Authorization Required
                </h2>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                You are currently signed in as <strong>{roleLabels[role]}</strong> ({user?.name}). 
                This portal module is strictly restricted to <strong>{allowedRoles.map(r => roleLabels[r]).join(' or ')}</strong>. 
                Under Maharashtra Public Procurement Security Norms (ID 26136), cross-role access is restricted.
              </p>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to={roleDashboards[role]}
                  className="w-full sm:w-auto px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go to My Authorized Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sign Out to Switch Account</span>
                </button>
              </div>
            </div>
          </main>
        </div>

        <Footer />
        <MahiAssistantDrawer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
      {/* Official State Header */}
      <Header />

      {/* Main Body Container: Sidebar + Content */}
      <div className="flex-1 flex flex-row w-full">
        {/* Navy Left Sidebar */}
        <Sidebar />

        {/* Central Content Area with Standardized Max Width and Spacing */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-6xl mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Official Government Footer */}
      <Footer />

      {/* Floating Mahi Assistant Chatbot Drawer */}
      <MahiAssistantDrawer />
    </div>
  );
};
