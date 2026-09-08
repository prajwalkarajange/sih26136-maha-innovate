import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Target,
  FileText,
  Rocket,
  ShoppingBag,
  TrendingUp,
  BarChart3,
  UserCheck,
  Shield,
  Building2,
  Users,
  Award,
  Sliders,
  Scale,
  LogOut,
  Layers,
  FileCheck2
} from 'lucide-react';

interface SidebarProps {
  portalType?: 'government' | 'startup' | 'admin' | 'evaluator';
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const currentPortal = role;

  const governmentNav = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/challenges/create', label: 'Create Challenge', icon: Target },
    { to: '/challenges', label: 'Challenges', icon: Layers },
    { to: '/proposals', label: 'Proposals Received', icon: FileText },
    { to: '/pilots/1', label: 'Active Pilots', icon: Rocket },
    { to: '/procurement/1', label: 'Procurement', icon: ShoppingBag },
    { to: '/scaling-dashboard', label: 'Scaling Rollout', icon: TrendingUp },
    { to: '/analytics', label: 'Analytics Reports', icon: BarChart3 },
  ];

  const startupNav = [
    { to: '/marketplace', label: 'Explore Challenges', icon: Target },
    { to: '/proposals/submit', label: 'Submit Proposal', icon: FileText },
    { to: '/proposals', label: 'My Proposals', icon: Layers },
    { to: '/pilots/1', label: 'Pilot Progress', icon: Rocket },
    { to: '/contract-tracking', label: 'Contracts & Payments', icon: ShoppingBag },
    { to: '/startups/1', label: 'Startup Profile', icon: Building2 },
  ];

  const evaluatorNav = [
    { to: '/evaluations/1', label: 'Proposal Evaluation', icon: Scale },
    { to: '/comparison', label: 'Startup Comparison', icon: Layers },
    { to: '/pilots/1', label: 'Pilot Monitoring', icon: Rocket },
    { to: '/pilot-evaluation/1', label: 'Independent Validation', icon: Award },
    { to: '/analytics', label: 'Statewide Analytics', icon: BarChart3 },
  ];

  const adminNav = [
    { to: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
    { to: '/admin', label: 'Audit Logs', icon: Shield },
    { to: '/challenges', label: 'All Challenges', icon: Target },
    { to: '/analytics', label: 'Platform Analytics', icon: BarChart3 },
  ];

  const items = currentPortal === 'admin'
    ? adminNav
    : currentPortal === 'startup'
    ? startupNav
    : currentPortal === 'evaluator'
    ? evaluatorNav
    : governmentNav;

  const portalTitle = currentPortal === 'admin'
    ? 'Admin Portal'
    : currentPortal === 'startup'
    ? 'Startup Portal'
    : currentPortal === 'evaluator'
    ? 'Evaluator Portal'
    : 'Government Portal';

  return (
    <aside className="w-56 sm:w-60 bg-[#0c2136] text-slate-300 flex flex-col shrink-0 border-r border-slate-800 self-stretch sticky top-16 h-[calc(100vh-4rem)]">
      {/* Portal Brand Header in Sidebar */}
      <div className="p-4 border-b border-slate-700/60 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow">
          MI
        </div>
        <div>
          <div className="text-xs font-bold tracking-tight text-white">MahaInnovate</div>
          <div className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">{portalTitle}</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-[#132d47] hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 text-slate-400 group-hover:text-white flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info & Logout */}
      <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-slate-200 font-semibold truncate">Problem Statement 26136</div>
            <div className="text-[10px] text-slate-500">Government of Maharashtra</div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="p-1 text-slate-400 hover:text-red-400 hover:bg-white/10 rounded transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
