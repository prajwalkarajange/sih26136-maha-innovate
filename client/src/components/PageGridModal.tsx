import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ExternalLink, Sparkles } from 'lucide-react';

interface PageGridModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PageGridModal: React.FC<PageGridModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const pages = [
    { num: 1, title: 'Landing / Home Page', path: '/', desc: 'Hero with Gateway visual, branding, and role CTAs' },
    { num: 2, title: 'Login Page', path: '/login', desc: 'Authentication with role selector and quick switcher' },
    { num: 3, title: 'Government Dashboard', path: '/dashboard', desc: 'Stats (24 Challenges, 86 Proposals, 12 Pilots), activity feed' },
    { num: 4, title: 'Create Challenge Page', path: '/challenges/create', desc: 'Challenge creation form with AI trigger and publishing' },
    { num: 5, title: 'AI Requirement Analysis Page', path: '/ai-analysis', desc: 'AI extracted insights: domain, tech, KPIs, risks' },
    { num: 6, title: 'AI Startup Recommendation Page', path: '/ai-recommendations', desc: 'Top matching startups (GreenTech 94%, EcoVision 89%)' },
    { num: 7, title: 'Startup Profile Page', path: '/startups/1', desc: 'GreenTech Innovations profile, team, projects, certs' },
    { num: 8, title: 'Challenge Marketplace (For Startups)', path: '/marketplace', desc: 'Available government challenges feed and search' },
    { num: 9, title: 'Proposal Submission Page', path: '/proposals/submit', desc: 'Startup solution upload form with document validation' },
    { num: 10, title: 'Proposal Evaluation Page', path: '/evaluations/1', desc: '7-criteria score scorecard (91.2/100) & pilot approval' },
    { num: 11, title: 'Startup Comparison Page', path: '/comparison', desc: 'Side-by-side comparison table (GreenTech vs EcoVision vs CleanCity)' },
    { num: 12, title: 'Pilot Creation Page', path: '/pilots/create', desc: 'Target KPIs, 5 milestones, and pilot agreement generator' },
    { num: 13, title: 'Pilot Monitoring Dashboard', path: '/pilots/1', desc: 'Ongoing status (78% complete), milestones & live KPIs' },
    { num: 14, title: 'Pilot Evaluation Page', path: '/pilot-evaluation/1', desc: 'Independent validation scorecard & 90.1% final score' },
    { num: 15, title: 'Procurement Page', path: '/procurement/1', desc: 'Direct procurement mechanism approval & PO generation' },
    { num: 16, title: 'Contract & Payment Tracking Page', path: '/contract-tracking', desc: 'Procurement timeline, documents, and milestone payments' },
    { num: 17, title: 'Scaling Recommendation Page', path: '/scaling-recommendation', desc: 'AI detection of 8 similar municipal departments in Maharashtra' },
    { num: 18, title: 'Scaling Dashboard', path: '/scaling-dashboard', desc: 'Statewide rollout tracking (Pune, Nashik, Nagpur, Thane)' },
    { num: 19, title: 'Analytics Dashboard', path: '/analytics', desc: 'Recharts procurement bar chart & tech categories donut' },
    { num: 20, title: 'Admin Page', path: '/admin', desc: 'User verification, platform metrics, and full audit logs' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-100 w-full max-w-6xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-[#0b3b60] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
              20
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold">MahInnovate – 20-Page Reference Layout Grid</h2>
              <p className="text-[11px] text-blue-200">
                Direct click-through into each connected page represented in the reference image
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition text-blue-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid of 20 Tiles */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {pages.map((p) => (
            <div
              key={p.num}
              onClick={() => {
                navigate(p.path);
                onClose();
              }}
              className="group bg-white rounded-xl p-3.5 border border-slate-200 hover:border-blue-500 shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                    {p.num}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-600 font-semibold flex items-center gap-1">
                    Open <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {p.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-400">
                <span>Page {p.num} of 20</span>
                <span className="text-emerald-600 font-semibold">Ready ✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 px-5 py-2.5 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Problem Statement ID 26136: Complete Public Procurement Mechanism</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition"
          >
            Close Grid
          </button>
        </div>
      </div>
    </div>
  );
};
