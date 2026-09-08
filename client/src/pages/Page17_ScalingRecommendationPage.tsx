import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  TrendingUp,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Bot,
  MapPin
} from 'lucide-react';

export const Page17_ScalingRecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const { askMahiContext } = useMahi();

  // Municipal departments matching Reference Image Panel 17
  const similarDepartments = [
    { name: 'Pune Municipal Department', similarity: '95%', compatibility: '98%', status: 'Completed' },
    { name: 'Nashik Municipal Department', similarity: '91%', compatibility: '95%', status: 'Deployment (Dec 2026)' },
    { name: 'Nagpur Municipal Department', similarity: '88%', compatibility: '92%', status: 'Approval (Jan 2027)' },
    { name: 'Thane Municipal Department', similarity: '86%', compatibility: '90%', status: 'Planned (Feb 2027)' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 w-fit mb-1">
            <span>AI Scaling & Cross-Departmental Transfer</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Scaling Recommendation Page
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            AI identifies other Maharashtra departments facing identical challenges for rapid replication.
          </p>
        </div>

        <button
          onClick={() => navigate('/scaling-dashboard')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>Open Scaling Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Solution & Expansion Card matching Reference Image */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
        {/* Solution Summary Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 p-4 rounded-xl border border-blue-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Successful Solution
            </span>
            <h2 className="text-lg font-black text-slate-900">
              Smart Waste Management
            </h2>
            <p className="text-xs text-slate-600">
              Deployed by GreenTech Innovations in Pune Municipal Corporation
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Pilot Score</span>
            <div className="text-2xl font-black text-emerald-600">90.1%</div>
          </div>
        </div>

        {/* AI Found Similar Requirements & Potential Expansion Card matching Reference Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Left: AI Found Similar Requirements list */}
          <div className="md:col-span-8 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI Found Similar Requirements</span>
            </h3>

            <div className="space-y-2">
              {similarDepartments.map((dept, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{dept.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                      {dept.similarity} Match
                    </span>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      {dept.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Potential Expansion Card matching Reference Image */}
          <div className="md:col-span-4 bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 text-center flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                Potential Expansion
              </span>
              <div className="text-3xl font-black text-blue-900 mt-2">
                8 Departments
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Across Mumbai, Pune, Nashik, Nagpur, Thane, and Chhatrapati Sambhajinagar.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/scaling-dashboard')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Scaling Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi for scaling opportunities"
        contextPage="scaling_recommendation"
        customPrompt="Which 8 municipal corporations in Maharashtra have the highest similarity score for this solution?"
      />
    </div>
  );
};
