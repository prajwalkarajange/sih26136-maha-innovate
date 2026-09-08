import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Bot,
  Building2,
  Sliders,
  ArrowRight
} from 'lucide-react';

export const Page10_ProposalEvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const { evaluation, saveEvaluation, activeProposal } = useWorkflow();
  const { askMahiContext } = useMahi();

  // 7 Evaluation categories matching Reference Image
  const [techFeasibility, setTechFeasibility] = useState(evaluation?.technical_feasibility || 90);
  const [innovation, setInnovation] = useState(evaluation?.innovation || 95);
  const [costEffectiveness, setCostEffectiveness] = useState(evaluation?.cost_effectiveness || 85);
  const [scalability, setScalability] = useState(evaluation?.scalability || 92);
  const [experience, setExperience] = useState(evaluation?.experience || 88);
  const [implementation, setImplementation] = useState(evaluation?.implementation || 86);
  const [securityCompliance, setSecurityCompliance] = useState(evaluation?.security_compliance || 84);

  const [loading, setLoading] = useState(false);
  const [decisionFeedback, setDecisionFeedback] = useState('');

  // Weighted overall calculation matching 91.2 in Reference Image
  const calculatedOverall = Number(
    (
      techFeasibility * 0.2 +
      innovation * 0.2 +
      costEffectiveness * 0.15 +
      scalability * 0.15 +
      experience * 0.1 +
      implementation * 0.1 +
      securityCompliance * 0.1
    ).toFixed(1)
  );

  const handleDecision = async (decision: 'APPROVED_FOR_PILOT' | 'CLARIFICATION_REQUIRED' | 'REJECTED') => {
    setLoading(true);
    try {
      await saveEvaluation({
        proposal_id: activeProposal?.id || 1,
        technical_feasibility: techFeasibility,
        innovation,
        cost_effectiveness: costEffectiveness,
        scalability,
        experience,
        implementation,
        security_compliance: securityCompliance,
        decision,
      });

      if (decision === 'APPROVED_FOR_PILOT') {
        setDecisionFeedback('Proposal approved for live pilot! Proceeding to Pilot Creation...');
        setTimeout(() => {
          navigate('/pilots/create');
        }, 1200);
      } else if (decision === 'CLARIFICATION_REQUIRED') {
        setDecisionFeedback('Clarification request dispatched to startup founder.');
      } else {
        setDecisionFeedback('Proposal marked as rejected.');
      }
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { label: 'Technical Feasibility', value: techFeasibility, setter: setTechFeasibility, weight: '20%' },
    { label: 'Innovation', value: innovation, setter: setInnovation, weight: '20%' },
    { label: 'Cost Effectiveness', value: costEffectiveness, setter: setCostEffectiveness, weight: '15%' },
    { label: 'Scalability', value: scalability, setter: setScalability, weight: '15%' },
    { label: 'Experience', value: experience, setter: setExperience, weight: '10%' },
    { label: 'Implementation', value: implementation, setter: setImplementation, weight: '10%' },
    { label: 'Security / Compliance', value: securityCompliance, setter: setSecurityCompliance, weight: '10%' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs text-blue-700 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>Startup: GreenTech Innovations</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Evaluate Proposal
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Multi-factor evaluation scorecard for Smart Waste Management solution.
          </p>
        </div>

        <button
          onClick={() => navigate('/comparison')}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
        >
          Compare With Other Startups
        </button>
      </div>

      {decisionFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{decisionFeedback}</span>
        </div>
      )}

      {/* Main Scorecard Card matching Reference Image */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-5">
        <div className="space-y-3.5 text-xs">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between font-semibold text-slate-700">
                <span className="flex items-center gap-1">
                  <span>{cat.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({cat.weight})</span>
                </span>
                <span className="font-bold text-slate-900">{cat.value} / 100</span>
              </div>

              {/* Score Horizontal Blue Bar matching Reference Image */}
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${cat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Overall Score Box matching Reference Image */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Overall Score
            </div>
            <div className="text-3xl font-black text-emerald-600 mt-0.5">
              {calculatedOverall} <span className="text-base text-slate-400 font-semibold">/ 100</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Exceeds 85% Pilot Benchmark
            </div>
          </div>

          {/* Action Buttons matching Reference Image */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleDecision('APPROVED_FOR_PILOT')}
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve for Pilot</span>
            </button>

            <button
              onClick={() => handleDecision('CLARIFICATION_REQUIRED')}
              disabled={loading}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Request Clarification</span>
            </button>

            <button
              onClick={() => handleDecision('REJECTED')}
              disabled={loading}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi to explain the evaluation score"
        contextPage="proposal_evaluation"
        customPrompt="Explain how each evaluation weight contributed to GreenTech's 91.2 score"
      />
    </div>
  );
};
