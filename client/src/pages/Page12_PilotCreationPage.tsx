import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Rocket,
  CheckSquare,
  Square,
  Calendar,
  Building2,
  FileCheck2,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const Page12_PilotCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { createPilot } = useWorkflow();
  const { askMahiContext } = useMahi();

  const [startupName, setStartupName] = useState('GreenTech Innovations');
  const [pilotLocation, setPilotLocation] = useState('Pune');
  const [duration, setDuration] = useState('3 Months');
  const [budget, setBudget] = useState('₹5,00,000');

  // Defined KPIs matching Reference Image
  const [kpiAccuracy, setKpiAccuracy] = useState(true);
  const [kpiResponse, setKpiResponse] = useState(true);
  const [kpiCost, setKpiCost] = useState(true);
  const [kpiSatisfaction, setKpiSatisfaction] = useState(true);

  // Pilot Agreement acceptance
  const [agreementAccepted, setAgreementAccepted] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleStartPilot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPilot({
        location: pilotLocation,
        duration,
        budget_inr: 500000,
      });

      setTimeout(() => {
        navigate('/pilots/1');
      }, 1000);
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
            <span>Controlled Public Pilot Deployment</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Create Pilot Project
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure pilot parameters, target KPIs, and milestones prior to field deployment.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            askMahiContext(
              'Suggest target KPIs and milestones for a 3-month smart waste management pilot in Pune',
              'pilot_creation'
            )
          }
          className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold border border-blue-200 transition"
        >
          <span>Ask Mahi for KPI Suggestions</span>
        </button>
      </div>

      {/* Form matching Reference Image */}
      <form onSubmit={handleStartPilot} className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-5 text-xs">
        {/* Startup, Location, Duration, Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Startup
            </label>
            <select
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:bg-white focus:ring-1 focus:ring-blue-500"
            >
              <option value="GreenTech Innovations">GreenTech Innovations</option>
              <option value="EcoVision Labs">EcoVision Labs</option>
              <option value="CleanCity Solutions">CleanCity Solutions</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Pilot Location
            </label>
            <select
              value={pilotLocation}
              onChange={(e) => setPilotLocation(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
            >
              <option value="Pune">Pune Municipal Corporation</option>
              <option value="Thane">Thane Municipal Corporation</option>
              <option value="Nashik">Nashik Municipal Corporation</option>
              <option value="Nagpur">Nagpur Municipal Corporation</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:bg-white focus:ring-1 focus:ring-blue-500"
            >
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Budget (INR)
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Define KPIs & Milestones Grid matching Reference Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Left: Define KPIs Checkboxes */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-blue-600" />
              <span>Define Target KPIs</span>
            </h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kpiAccuracy}
                  onChange={(e) => setKpiAccuracy(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">Accuracy &gt; 90%</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kpiResponse}
                  onChange={(e) => setKpiResponse(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">Response Time &lt; 2 sec</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kpiCost}
                  onChange={(e) => setKpiCost(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">Cost Reduction &gt; 15%</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kpiSatisfaction}
                  onChange={(e) => setKpiSatisfaction(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">User Satisfaction &gt; 80%</span>
              </label>
            </div>
          </div>

          {/* Right: Milestones List matching Reference Image */}
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Rocket className="w-4 h-4 text-blue-600" />
              <span>Milestones Schedule</span>
            </h3>

            <ol className="space-y-1.5 list-decimal list-inside text-slate-700 font-medium">
              <li>Requirement Analysis (Field survey in PMC wards)</li>
              <li>Prototype (Hardware assembly & lab calibration)</li>
              <li>Deployment (On-site installation in 10 bin pods)</li>
              <li>Testing (45-day continuous municipal waste stress trials)</li>
              <li>Final Evaluation (Independent IIT Bombay validation audit)</li>
            </ol>
          </div>
        </div>

        {/* Standard Pilot Agreement & Compliance Box (Requirement 13) */}
        <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-900 text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Standard Maharashtra Pilot Agreement & Compliance</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Covers Scope of Work, Deliverables, Telemetry Data Ownership (sole property of Government), Algorithmic Intellectual Property (retained by startup), Mutual Confidentiality under State Cybersecurity Policy, and Milestone Payments.
          </p>
          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreementAccepted}
              onChange={(e) => setAgreementAccepted(e.target.checked)}
              className="rounded text-blue-600 w-4 h-4"
            />
            <span className="font-bold text-slate-800 text-[11px]">
              Government Officer and Startup accept Standard Pilot Agreement terms
            </span>
          </label>
        </div>

        {/* Action Button matching Reference Image */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading || !agreementAccepted}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg shadow-sm transition flex items-center gap-2 cursor-pointer text-xs"
          >
            <span>{loading ? 'Activating Pilot...' : 'Start Pilot'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi to suggest KPIs or milestone plan"
        contextPage="pilot_creation"
        customPrompt="What KPIs and validation benchmarks should be defined for this pilot?"
      />
    </div>
  );
};
