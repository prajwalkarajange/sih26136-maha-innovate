import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Award,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Building2,
  FileCheck2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Page14_PilotEvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const { approveProcurement } = useWorkflow();
  const { askMahiContext } = useMahi();
  const [loading, setLoading] = useState(false);

  // Metrics matching exact values in Reference Image Panel 14
  const metrics = [
    { label: 'Technical Performance', score: '93%' },
    { label: 'KPI Achievement', score: '91%' },
    { label: 'Cost Efficiency', score: '88%' },
    { label: 'User Satisfaction', score: '84%' },
    { label: 'Scalability', score: '84%' },
  ];

  const finalScore = '90.1%';

  const handleProceed = async () => {
    setLoading(true);
    try {
      await approveProcurement();
      navigate('/procurement/1');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 w-fit mb-1">
            <span>90-Day Controlled Pilot Assessment</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Pilot Results
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Independent validation and outcome evaluation for Smart Waste Management.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Independent Audit Verified
        </span>
      </div>

      {/* Main Scorecard Card matching Reference Image */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-5">
        {/* Performance Metrics List matching Reference Image */}
        <div className="space-y-3 text-xs">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-slate-100 font-semibold text-slate-700"
            >
              <span>{m.label}</span>
              <span className="font-bold text-blue-700 text-sm">{m.score}</span>
            </div>
          ))}
        </div>

        {/* Final Score and Validation Summary matching Reference Image */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Final Score
            </div>
            <div className="text-4xl font-black text-emerald-600 mt-0.5">
              {finalScore}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Performance – Eligible for Direct Public Procurement
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs max-w-sm">
            <div className="font-bold text-slate-800">Independent Validator:</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Prof. Aniruddh Joshi, IIT Bombay Innovation Council
            </div>
            <p className="text-[11px] text-slate-500 italic mt-1">
              "The edge computer vision system operated flawlessly across 120,000 transactions with 93% accuracy."
            </p>
          </div>
        </div>

        {/* Pilot Successful? & Action Buttons matching Reference Image */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-800">
            Pilot Successful?
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleProceed}
              disabled={loading}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? 'Processing...' : 'Proceed to Procurement'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => alert('Pilot archived as unsuccessful.')}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
              <span>Mark as Unsuccessful</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi to analyze pilot results"
        contextPage="pilot_evaluation"
        customPrompt="Explain the independent validation report and why it qualifies for direct procurement"
      />
    </div>
  );
};
