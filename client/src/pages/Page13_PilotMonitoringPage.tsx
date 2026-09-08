import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Rocket,
  CheckCircle2,
  Clock,
  Circle,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  UploadCloud
} from 'lucide-react';

export const Page13_PilotMonitoringPage: React.FC = () => {
  const navigate = useNavigate();
  const { pilot } = useWorkflow();
  const { askMahiContext } = useMahi();

  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [evidenceSubmitted, setEvidenceSubmitted] = useState(false);

  // Values matching Reference Image Panel 13
  const pilotStatus = 'ONGOING';
  const overallCompletion = 78;

  const milestones = [
    { num: 1, title: 'Requirement Analysis', status: 'VERIFIED', time: '15 June 2026' },
    { num: 2, title: 'Prototype', status: 'VERIFIED', time: '05 July 2026' },
    { num: 3, title: 'Deployment', status: 'VERIFIED', time: '25 July 2026' },
    { num: 4, title: 'Testing', status: 'IN_PROGRESS', time: 'Ongoing (Day 38/45)' },
    { num: 5, title: 'Final Evaluation', status: 'PENDING', time: 'Scheduled 15 Oct 2026' },
  ];

  const kpis = [
    { name: 'Accuracy', target: '> 90%', current: '93%', isAchieved: true },
    { name: 'Response Time', target: '< 2 sec', current: '1.4 sec', isAchieved: true },
    { name: 'Cost Reduction', target: '> 15%', current: '18%', isAchieved: true },
    { name: 'User Satisfaction', target: '> 80%', current: '84%', isAchieved: true },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner with Pilot Status matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pilot Status:
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-black text-xs border border-emerald-200">
              {pilotStatus}
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Smart Waste Management – Pune Pilot
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            10 AI camera sorting pods deployed in Pune Municipal Corporation Ward 4 & 7.
          </p>
        </div>

        <button
          onClick={() => navigate('/pilot-evaluation/1')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>Complete & Evaluate Pilot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Overall Completion Progress Bar matching Reference Image */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700">Overall Completion</span>
          <span className="font-black text-blue-700 text-sm">{overallCompletion}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallCompletion}%` }}
          />
        </div>
      </div>

      {/* Milestones and KPI Monitoring Grid matching Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Milestones Vertical Tracker matching Reference Image */}
        <div className="md:col-span-6 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Milestones
          </h3>

          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div key={m.num} className="flex items-start gap-3 relative">
                {/* Connecting Line */}
                {idx < milestones.length - 1 && (
                  <div className="absolute left-2.5 top-5 w-0.5 h-7 bg-slate-200" />
                )}

                {/* Status Indicator Icon */}
                <div className="relative z-10">
                  {m.status === 'VERIFIED' ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  ) : m.status === 'IN_PROGRESS' ? (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center ring-4 ring-blue-100">
                      <Clock className="w-3 h-3 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                      <Circle className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{m.title}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        m.status === 'VERIFIED'
                          ? 'text-emerald-700 bg-emerald-50'
                          : m.status === 'IN_PROGRESS'
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setEvidenceSubmitted(true);
                alert('Milestone 4 telemetry report verified by PMC Officer!');
              }}
              className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-xs transition"
            >
              Verify Milestone 4 Evidence
            </button>
          </div>
        </div>

        {/* Right: KPI Monitoring Card matching Reference Image */}
        <div className="md:col-span-6 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center justify-between">
            <span>KPI Monitoring</span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              4/4 On Track
            </span>
          </h3>

          <div className="space-y-3">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50/70 rounded-lg border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900">{kpi.name}</div>
                  <div className="text-[11px] text-slate-500">Benchmark Target: {kpi.target}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900">{kpi.current}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-800 font-medium">
            ✓ Live field telemetry indicates this pilot is exceeding performance criteria required for Direct Public Procurement.
          </div>
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi for pilot insights or issue support"
        contextPage="pilot_monitoring"
        customPrompt="Summarize telemetry uptime, sensor accuracy, and pilot milestone status"
      />
    </div>
  );
};
