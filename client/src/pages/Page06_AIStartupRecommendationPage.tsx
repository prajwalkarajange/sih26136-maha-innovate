import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Sparkles,
  Bot,
  Check,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

export const Page06_AIStartupRecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const { matches, toggleShortlist } = useWorkflow();
  const { askMahiContext } = useMahi();
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const factorWeights = [
    { name: 'Technology Match', weight: '30%' },
    { name: 'Domain Match', weight: '20%' },
    { name: 'Past Experience', weight: '15%' },
    { name: 'Solution Capability', weight: '15%' },
    { name: 'Budget Compatibility', weight: '10%' },
    { name: 'Scalability', weight: '5%' },
    { name: 'Location / Deployment Fit', weight: '5%' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Matching Algorithm (7 Factor Evaluation)</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Top Matching Startups
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent algorithmic matching based on technical fit, municipal experience, and compliance.
          </p>
        </div>

        <button
          onClick={() => navigate('/comparison')}
          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
        >
          <span>Compare All Startups</span>
        </button>
      </div>

      {/* Startup Cards matching Reference Image */}
      <div className="space-y-4">
        {matches.map((item) => (
          <div
            key={item.startup_id}
            className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-2xs transition overflow-hidden"
          >
            <div className="p-5 flex flex-wrap items-center justify-between gap-4">
              {/* Left Logo + Name + Description */}
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-2xl flex items-center justify-center border border-slate-200 shadow-2xs flex-shrink-0">
                  {item.logo_url}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.company_name}
                    </h3>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {item.city}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1">
                    {item.company_name === 'GreenTech Innovations' && 'AI & IoT based waste management solutions'}
                    {item.company_name === 'EcoVision Labs' && 'Computer vision for waste segregation'}
                    {item.company_name === 'CleanCity Solutions' && 'Smart municipal solutions'}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.technologies.map((t, tidx) => (
                      <span
                        key={tidx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Score + Action Buttons matching Reference Image */}
              <div className="flex flex-col sm:items-end gap-2.5">
                {/* Match Score Badge matching Reference Image */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs border border-emerald-200 shadow-2xs">
                  <span>Match Score:</span>
                  <span className="text-sm font-black text-emerald-700">{item.match_score}%</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/startups/${item.startup_id}`)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-700 border border-blue-600 rounded-lg text-xs font-semibold transition"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() => toggleShortlist(item.startup_id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                      item.is_shortlisted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{item.is_shortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Score Breakdown Toggle */}
            <div className="bg-slate-50/70 px-5 py-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => setExpandedId(expandedId === item.startup_id ? null : item.startup_id)}
                className="text-slate-600 hover:text-blue-600 font-semibold flex items-center gap-1"
              >
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span>{expandedId === item.startup_id ? 'Hide Score Breakdown' : 'View 7-Factor Score Breakdown'}</span>
                {expandedId === item.startup_id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() =>
                  askMahiContext(
                    `Explain why ${item.company_name} received a ${item.match_score}% match score`,
                    'ai_recommendations'
                  )
                }
                className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask Mahi why recommended</span>
              </button>
            </div>

            {/* Expanded 7-Factor Breakdown */}
            {expandedId === item.startup_id && (
              <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500">Tech Match (30%)</span>
                  <div className="font-bold text-slate-900">{item.breakdown.tech} / 30</div>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500">Domain Match (20%)</span>
                  <div className="font-bold text-slate-900">{item.breakdown.domain} / 20</div>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500">Past Experience (15%)</span>
                  <div className="font-bold text-slate-900">{item.breakdown.experience} / 15</div>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500">Capability (15%)</span>
                  <div className="font-bold text-slate-900">{item.breakdown.capability} / 15</div>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500">Budget Fit (10%)</span>
                  <div className="font-bold text-slate-900">{item.breakdown.budget} / 10</div>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500">Scalability (5%)</span>
                  <div className="font-bold text-slate-900">{item.breakdown.scalability} / 5</div>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500">Location Fit (5%)</span>
                  <div className="font-bold text-slate-900">{item.breakdown.location} / 5</div>
                </div>
                <div className="bg-emerald-50 p-2 rounded border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 font-bold">Total Weighted Score</span>
                  <div className="font-black text-emerald-800 text-sm">{item.match_score}%</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi why this startup is recommended"
        contextPage="ai_recommendations"
        customPrompt="Explain the transparent scoring formula and why GreenTech scored 94%"
      />
    </div>
  );
};
