import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMahi } from '../context/MahiContext';
import { Bot, LogIn, LogOut, Shield, Menu, X, Building2, Rocket, Scale } from 'lucide-react';
import { UserRole } from '../types';

export const Header: React.FC = () => {
  const { user, role, isAuthenticated, logout } = useAuth();
  const { toggleOpen, isOpen } = useMahi();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleConfigs: Record<UserRole, { label: string; dotColor: string; dept: string; portalPath: string; portalLabel: string }> = {
    government: {
      label: 'Government Officer',
      dotColor: 'bg-blue-600',
      dept: 'Urban Development Dept.',
      portalPath: '/dashboard',
      portalLabel: 'Officer Dashboard'
    },
    startup: {
      label: 'Startup Founder',
      dotColor: 'bg-emerald-600',
      dept: 'GreenTech Innovations',
      portalPath: '/marketplace',
      portalLabel: 'Startup Workspace'
    },
    evaluator: {
      label: 'Technical Evaluator',
      dotColor: 'bg-indigo-600',
      dept: 'State Innovation Council',
      portalPath: '/evaluations/1',
      portalLabel: 'Evaluation Panel'
    },
    admin: {
      label: 'System Administrator',
      dotColor: 'bg-amber-600',
      dept: 'Governance & Audit',
      portalPath: '/admin',
      portalLabel: 'Admin Console'
    },
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/marketplace', label: 'Challenges' },
    { to: '/#success-stories', label: 'Success Stories' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs font-sans w-full">
      {/* Main Navigation Bar - Starting Cleanly from Left Edge */}
      <div className="w-full px-4 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
        
        {/* Left Brand - Exactly Matching Reference Image */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-amber-400/80 shadow-xs flex items-center justify-center overflow-hidden p-0.5 shrink-0 group-hover:border-amber-500 transition">
            <img
              src="/maharashtra_seal.png"
              alt="Government of Maharashtra Seal"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <span className="text-base sm:text-lg font-bold text-[#0f2d59] tracking-tight leading-none group-hover:text-blue-700 transition truncate">
            Government of Maharashtra
          </span>
        </Link>

        {/* Center: Default Formal Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap text-sm font-medium text-slate-700">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`py-1 transition whitespace-nowrap ${
                  isActive
                    ? 'text-blue-700 font-semibold border-b-2 border-blue-700'
                    : 'text-slate-700 hover:text-blue-700'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Authenticated User's Single Authorized Portal Link */}
          {isAuthenticated && (
            <Link
              to={roleConfigs[role]?.portalPath}
              className={`py-1 transition whitespace-nowrap font-semibold flex items-center gap-1.5 ${
                location.pathname.startsWith(roleConfigs[role]?.portalPath)
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-blue-700 hover:text-blue-900'
              }`}
            >
              <span>{roleConfigs[role]?.portalLabel}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${roleConfigs[role]?.dotColor}`} />
            </Link>
          )}
        </nav>

        {/* Right Controls: Desktop Login / Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {isAuthenticated ? (
            /* Desktop Unified Profile & Sign Out (hidden on mobile) */
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs shrink-0">
                <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-slate-900 text-xs truncate max-w-[140px]">{user?.name}</span>
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${roleConfigs[role]?.dotColor}`} />
                    <span>{roleConfigs[role]?.label}</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 hover:border-red-300 text-xs font-bold rounded-lg transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                title="Sign Out of Session"
              >
                <LogOut className="w-4 h-4 text-red-600 shrink-0" />
                <span className="whitespace-nowrap">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="px-6 py-2 bg-[#1877f2] hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-xs transition flex items-center justify-center whitespace-nowrap cursor-pointer"
              >
                Login
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button (< lg) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (< lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-3 shadow-lg animate-in slide-in-from-top duration-150 font-sans">
          {/* User Info Bar on Mobile */}
          {isAuthenticated ? (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-slate-900 text-xs truncate">{user?.name}</span>
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${roleConfigs[role]?.dotColor}`} />
                    <span className="truncate">{roleConfigs[role]?.label}</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-lg transition flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <LogIn className="w-4 h-4" />
              <span>Officer / Startup Sign In</span>
            </Link>
          )}

          {/* Navigation links */}
          <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-700 border-t border-slate-100 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md transition ${
                  location.pathname === link.to
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                to={roleConfigs[role]?.portalPath}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-blue-700 font-semibold bg-blue-50/70 hover:bg-blue-50 transition flex items-center justify-between"
              >
                <span>{roleConfigs[role]?.portalLabel}</span>
                <span className={`w-2 h-2 rounded-full ${roleConfigs[role]?.dotColor}`} />
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
