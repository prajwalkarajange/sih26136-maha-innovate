import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  TrendingUp,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';

export const Page18_ScalingDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { scaling, updateScalingStatus } = useWorkflow();
  const { askMahiContext } = useMahi();

  // Status rows matching exact values in Reference Image Panel 18
  const defaultScalingData = [
    { id: 1, department: 'Pune', status: 'Completed', timeline: '-', color: 'bg-emerald-100 text-emerald-800' },
    { id: 2, department: 'Nashik', status: 'Deployment', timeline: 'Dec 2026', color: 'bg-blue-100 text-blue-800' },
    { id: 3, department: 'Nagpur', status: 'Approval', timeline: 'Jan 2027', color: 'bg-amber-100 text-amber-800' },
    { id: 4, department: 'Thane', status: 'Planned', timeline: 'Feb 2027', color: 'bg-slate-100 text-slate-700' },
    { id: 5, department: 'Aurangabad', status: 'Planned', timeline: 'Mar 2027', color: 'bg-slate-100 text-slate-700' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 w-fit mb-1">
            <span>Statewide Rollout Monitoring</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Scaling Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track multi-district deployment status and milestones for verified solutions.
          </p>
        </div>

        <button
          onClick={() => navigate('/analytics')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>View Platform Analytics</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scaling Status Table matching Reference Image */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Scaling Status
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Solution: Smart Waste Management
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4">Department / Municipal Corp</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Expected Timeline</th>
                <th className="py-3 px-4 text-right">Expansion Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {defaultScalingData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.department} Municipal Department</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${item.color}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-semibold">
                    {item.timeline}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.status === 'Completed' ? (
                      <span className="text-emerald-700 font-bold flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Live in PMC
                      </span>
                    ) : item.status === 'Deployment' ? (
                      <button
                        onClick={() => alert(`Reviewing deployment progress for ${item.department}`)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold shadow-2xs"
                      >
                        Track Deployment
                      </button>
                    ) : item.status === 'Approval' ? (
                      <button
                        onClick={() => alert(`Reviewing inter-department MOU for ${item.department}`)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-[11px] font-bold shadow-2xs"
                      >
                        Sign MOU
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Initiating department onboarding for ${item.department}`)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold"
                      >
                        Initiate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
          <span>Projected Statewide Coverage: <strong>68% of Tier-1/Tier-2 urban waste</strong> by Q3 2027</span>
          <span className="text-emerald-700 font-bold">Policy Exemption 26136 Active</span>
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi for scaling strategy or roadmap"
        contextPage="scaling_dashboard"
        customPrompt="What is the recommended rollout timeline and procurement budget for Nashik and Nagpur expansion?"
      />
    </div>
  );
};
