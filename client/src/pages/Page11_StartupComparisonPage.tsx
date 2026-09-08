import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Bot
} from 'lucide-react';

export const Page11_StartupComparisonPage: React.FC = () => {
  const navigate = useNavigate();
  const { askMahiContext } = useMahi();

  // Data matching the exact numbers in Reference Image Panel 11
  const comparisonRows = [
    { param: 'AI Match', a: '94%', b: '89%', c: '82%', isHighlight: true },
    { param: 'Technical', a: 90, b: 86, c: 80 },
    { param: 'Innovation', a: 95, b: 88, c: 85 },
    { param: 'Cost', a: 85, b: 92, c: 88 },
    { param: 'Experience', a: 88, b: 82, c: 90 },
    { param: 'Scalability', a: 92, b: 85, c: 81 },
    { param: 'Overall Score', a: 91.2, b: 87.1, c: 84.6, isOverall: true },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 w-fit mb-1">
            <span>Transparent Procurement Decision Support</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Startup Comparison Page
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side comparative evaluation matrix for shortlisted startups.
          </p>
        </div>

        <button
          onClick={() => navigate('/pilots/create')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>Proceed to Pilot Creation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Comparison Table matching Reference Image */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="py-3 px-4 w-1/4">Parameter</th>
                <th className="py-3 px-4 w-1/4 text-center bg-blue-50/70 border-x border-blue-100 text-blue-900">
                  Startup A
                  <div className="text-[10px] text-blue-600 font-normal">GreenTech Innovations (Winner)</div>
                </th>
                <th className="py-3 px-4 w-1/4 text-center">
                  Startup B
                  <div className="text-[10px] text-slate-400 font-normal">EcoVision Labs</div>
                </th>
                <th className="py-3 px-4 w-1/4 text-center">
                  Startup C
                  <div className="text-[10px] text-slate-400 font-normal">CleanCity Solutions</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition ${
                    row.isOverall
                      ? 'bg-emerald-50/80 font-black text-slate-900 text-sm'
                      : row.isHighlight
                      ? 'bg-blue-50/30 font-bold'
                      : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {row.param}
                  </td>
                  <td
                    className={`py-3 px-4 text-center border-x border-slate-200 ${
                      row.isOverall
                        ? 'text-emerald-700 font-black text-base'
                        : 'text-blue-900 font-bold'
                    }`}
                  >
                    {row.a}
                  </td>
                  <td className={`py-3 px-4 text-center text-slate-600 ${row.isOverall ? 'font-bold text-slate-800' : ''}`}>
                    {row.b}
                  </td>
                  <td className={`py-3 px-4 text-center text-slate-600 ${row.isOverall ? 'font-bold text-slate-800' : ''}`}>
                    {row.c}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selection Recommendation Note */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              <strong>Recommendation:</strong> GreenTech Innovations leads across Technical (90), Innovation (95), and Overall Score (91.2).
            </span>
          </div>

          <button
            onClick={() => navigate('/pilots/create')}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs transition cursor-pointer"
          >
            Select Startup A for Pilot
          </button>
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi which startup is best and why"
        contextPage="startup_comparison"
        customPrompt="Which startup is best among GreenTech, EcoVision, and CleanCity for Smart Waste Management?"
      />
    </div>
  );
};
