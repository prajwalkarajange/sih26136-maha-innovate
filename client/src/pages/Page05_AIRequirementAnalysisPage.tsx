import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Sparkles,
  Bot,
  CheckCircle2,
  Cpu,
  Layers,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  RotateCw,
  Send,
  Building2,
  FileCheck2,
  Lightbulb
} from 'lucide-react';

export const Page05_AIRequirementAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const { aiAnalysis, runAnalysisForActiveChallenge } = useWorkflow();
  const { askMahiContext } = useMahi();

  const [inputTitle, setInputTitle] = useState('Smart Waste Management');
  const [inputProblem, setInputProblem] = useState(
    'AI-based waste segregation system for municipal areas to improve efficiency and reduce landfill waste.'
  );
  const [loading, setLoading] = useState(false);

  // Active extracted insights state
  const [domain, setDomain] = useState('Waste Management');
  const [technologies, setTechnologies] = useState(['Computer Vision', 'Machine Learning', 'IoT']);
  const [keyRequirements, setKeyRequirements] = useState(['Real-time', 'Scalable', 'Low Cost']);
  const [expectedSolution, setExpectedSolution] = useState(
    'Automated waste classification and segregation mechanism for municipal bins and sorting centers'
  );
  const [potentialImpact, setPotentialImpact] = useState(
    'Cleaner cities, reduced landfill waste by 40%, lower municipal processing overhead'
  );
  const [suggestedKpis, setSuggestedKpis] = useState<Record<string, string>>({
    accuracy: '> 90%',
    response_time: '< 2 sec',
    cost_reduction: '> 15%',
    user_satisfaction: '> 80%',
  });
  const [potentialRisks, setPotentialRisks] = useState([
    'Camera lens occlusion from dirt or wet waste splatter',
    'Variability in irregular packaging materials',
    'Intermittent cellular network connectivity in dense wards',
  ]);
  const [suggestedEligibility, setSuggestedEligibility] = useState([
    'DPIIT Recognized Startup in CleanTech / AI',
    'Proven proof of concept deployed with a municipal corporation or smart city',
    'Local Maharashtra technical support team',
  ]);
  const [suggestedDeliverables, setSuggestedDeliverables] = useState([
    'Deployment of 10 automated sorting bin pods in municipal wards',
    'Real-time municipal telemetry dashboard and alert notification system',
    'Independent 90-day pilot testing and validation report',
  ]);

  const presetProblems = [
    {
      title: 'Smart Waste Management',
      problem: 'AI-based waste segregation system for municipal areas to improve efficiency and reduce landfill waste.',
    },
    {
      title: 'Rural Healthcare Tele-Diagnostics',
      problem: 'Remote health monitoring and diagnostic edge device network for primary health centers in tribal and rural belts.',
    },
    {
      title: 'AI Traffic Flow Optimization',
      problem: 'Adaptive camera-based traffic signal timing to eliminate junction bottlenecks and reduce congestion.',
    },
    {
      title: 'Drone Agricultural Crop Damage Assessment',
      problem: 'High-resolution multispectral drone surveying for real-time post-monsoon flood and drought crop damage compensation claims.',
    },
  ];

  const runFallbackSimulation = (t: string) => {
    const lower = t.toLowerCase();
    if (lower.includes('health') || lower.includes('rural') || lower.includes('med')) {
      setDomain('Public Health & Rural Care');
      setTechnologies(['IoT', 'Edge Computing', 'Telemedicine', 'AI Diagnostics']);
      setKeyRequirements(['Portable & Battery-Powered', 'High Diagnostic Reliability', 'Multilingual UI (Marathi/Hindi/English)']);
      setExpectedSolution('Portable edge-diagnostic kit and tele-consultation platform for rural Primary Health Centers');
      setPotentialImpact('Primary health access for 50,000+ villagers, faster emergency triage response');
      setSuggestedKpis({ diagnostic_accuracy: '> 95%', sync_latency: '< 5 sec', patient_satisfaction: '> 85%' });
      setPotentialRisks(['Sporadic cellular network in tribal talukas', 'Staff training curve for digital kits']);
      setSuggestedEligibility(['DPIIT Registered Startup', 'Proven IoT or Medical Device Prototype', 'ISO 13485 or CE certification roadmap']);
      setSuggestedDeliverables(['50 Field deployment kits in rural PHCs', 'Doctor tele-consultation dashboard with real-time sync']);
    } else if (lower.includes('traffic') || lower.includes('road') || lower.includes('transport')) {
      setDomain('Intelligent Transportation & Mobility');
      setTechnologies(['Computer Vision', 'Deep Learning', 'Edge AI', 'IoT Traffic Controllers']);
      setKeyRequirements(['Sub-second Latency', 'All-Weather Durability', 'Integration with Existing Signals']);
      setExpectedSolution('Adaptive AI traffic signal controller with edge video analytics & congestion prediction');
      setPotentialImpact('25% reduction in commuter travel times, 18% municipal fuel savings');
      setSuggestedKpis({ queue_reduction: '> 25%', uptime: '> 99.8%', incident_detection_time: '< 30 sec' });
      setPotentialRisks(['Camera lens occlusion from monsoon grime', 'Power grid fluctuations at older junctions']);
      setSuggestedEligibility(['DPIIT Registered Startup', 'Demonstrated Computer Vision PoC with municipal test data']);
      setSuggestedDeliverables(['Pilot hardware installed across 10 key junctions', 'Traffic management command center integration']);
    } else if (lower.includes('crop') || lower.includes('drone') || lower.includes('agri') || lower.includes('farm')) {
      setDomain('AgriTech & Disaster Management');
      setTechnologies(['UAVs / Drones', 'Multispectral Imaging', 'GIS', 'AI Vision']);
      setKeyRequirements(['Sub-Meter Precision', 'Automated Claims Processing', 'Fast Turnaround']);
      setExpectedSolution('Autonomous drone fleet crop loss analysis portal integrated with state revenue records');
      setPotentialImpact('Disbursement of farmer relief in 7 days instead of 90 days');
      setSuggestedKpis({ survey_speed: '> 500 acres/day', estimation_accuracy: '> 92%', fraud_reduction: '> 40%' });
      setPotentialRisks(['Adverse weather grounding drones', 'Discrepancy with legacy paper land parcel maps']);
      setSuggestedEligibility(['DGCA-certified drone operations', 'DPIIT Registered Startup', 'GIS analytics engine']);
      setSuggestedDeliverables(['Survey report of 10,000 acres in target taluka', 'Automated damage payout recommendation portal']);
    } else if (lower.includes('waste') || lower.includes('water') || lower.includes('clean') || lower.includes('environment')) {
      setDomain('Urban Sanitation & Circular Economy');
      setTechnologies(['IoT Fill Sensors', 'Route Optimization AI', 'Computer Vision Segregation']);
      setKeyRequirements(['Real-time Tracking', 'Dynamic Scheduling', 'Citizen Feedback Portal']);
      setExpectedSolution('Automated smart waste monitoring & AI-optimized municipal collection dispatch system');
      setPotentialImpact('38% fuel reduction in municipal fleets, 95% on-time garbage clearance');
      setSuggestedKpis({ fleet_fuel_saved: '> 30%', bin_overflow_incidents: '< 2/month', citizen_satisfaction: '> 88%' });
      setPotentialRisks(['Sensor damage in high-traffic bins', 'Inconsistent driver app compliance']);
      setSuggestedEligibility(['DPIIT Registered Startup', 'Hardware IoT telemetry prototype']);
      setSuggestedDeliverables(['Sensors installed across 100 municipal bins', 'Real-time dispatch optimization dashboard']);
    } else {
      setDomain('Public Governance & Digital Transformation');
      setTechnologies(['Cloud Computing', 'AI / ML', 'Mobile Platforms', 'IoT Sensors']);
      setKeyRequirements(['Scalable Architecture', 'Data Security & ISO Compliance', 'High Accessibility']);
      setExpectedSolution(`AI-enabled digital platform optimizing ${t || 'public administration'} for rapid citizen delivery`);
      setPotentialImpact('Streamlined citizen service delivery, 45% reduction in administrative turnaround time');
      setSuggestedKpis({ sla_compliance: '> 98%', citizen_satisfaction: '> 90%', uptime: '> 99.9%' });
      setPotentialRisks(['Integration challenges with legacy databases', 'Data privacy compliance requirements']);
      setSuggestedEligibility(['DPIIT Registered Startup', 'Valid PoC or MVP demonstrator']);
      setSuggestedDeliverables(['Working pilot deployment with live dashboard', 'Comprehensive evaluation report']);
    }
  };

  const handleAnalyze = async (customTitle?: string, customProb?: string) => {
    setLoading(true);
    const t = customTitle || inputTitle;
    const p = customProb || inputProblem;

    try {
      const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const res = await fetch(`${API_BASE}/api/ai/analyze-requirement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: t, problem_description: p }),
      });

      if (res.ok) {
        const data = await res.json();
        setDomain(data.domain);
        setTechnologies(data.technologies || []);
        setKeyRequirements(data.keyRequirements || []);
        setExpectedSolution(data.expectedSolution || '');
        setPotentialImpact(data.potentialImpact || '');
        if (data.suggestedKpis) setSuggestedKpis(data.suggestedKpis);
        if (data.potentialRisks) setPotentialRisks(data.potentialRisks);
        if (data.suggestedEligibility) setSuggestedEligibility(data.suggestedEligibility);
        if (data.suggestedDeliverables) setSuggestedDeliverables(data.suggestedDeliverables);
        return;
      }
    } catch (e) {
      console.warn('Using client fallback AI engine');
    } finally {
      setLoading(false);
    }

    // Run resilient fallback simulation
    runFallbackSimulation(t);
  };

  const handleSelectPreset = (p: typeof presetProblems[0]) => {
    setInputTitle(p.title);
    setInputProblem(p.problem);
    handleAnalyze(p.title, p.problem);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 w-full">
        {/* Header matching Reference Image Panel 5 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>AI Public Innovation Analysis Tool</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                AI Analysis of Requirement
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Convert any civic problem statement into structured public procurement specifications.
              </p>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => navigate('/ai-recommendations')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>View Startup Matches</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>Login to Publish Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Interactive Problem Statement Input Form */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-4">
                <label className="block font-bold text-slate-700 mb-1">Challenge Title</label>
                <input
                  type="text"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-8">
                <label className="block font-bold text-slate-700 mb-1">Problem Description</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputProblem}
                    onChange={(e) => setInputProblem(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleAnalyze()}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>{loading ? 'Analyzing...' : 'Analyze Requirement'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Preset Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="text-slate-500 font-semibold">Try sample problem statements:</span>
              {presetProblems.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(p)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-full border border-slate-200 transition font-medium cursor-pointer"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Extracted Insights Card matching Reference Image Panel 5 */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-600" />
              <span>AI Extracted Insights</span>
            </h2>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              High Confidence (98%)
            </span>
          </div>

          <div className="p-6 space-y-4 text-xs">
            {/* Domain */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
              <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Domain
              </span>
              <div className="sm:col-span-9 font-bold text-slate-900 text-sm">
                {domain}
              </div>
            </div>

            {/* Technologies */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
              <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Technologies
              </span>
              <div className="sm:col-span-9 flex flex-wrap gap-1.5">
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-md font-semibold text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Requirements */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
              <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Key Requirements
              </span>
              <div className="sm:col-span-9 flex flex-wrap gap-2 text-slate-800 font-semibold">
                {keyRequirements.map((req, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{req}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Expected Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
              <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Expected Solution
              </span>
              <div className="sm:col-span-9 text-slate-800 font-medium leading-relaxed">
                {expectedSolution}
              </div>
            </div>

            {/* Potential Impact */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
              <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Potential Impact
              </span>
              <div className="sm:col-span-9 text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                {potentialImpact}
              </div>
            </div>

            {/* Suggested KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
              <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Suggested KPIs
              </span>
              <div className="sm:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(suggestedKpis).map(([key, val], idx) => (
                  <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 capitalize">{key.replace('_', ' ')}</div>
                    <div className="font-bold text-blue-900 text-xs">{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Eligibility & Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                Eligibility & Deliverables
              </span>
              <div className="sm:col-span-9 space-y-2 text-slate-700">
                <div>
                  <span className="font-bold text-slate-900">Startup Criteria:</span>{' '}
                  {suggestedEligibility.join(' • ')}
                </div>
                <div>
                  <span className="font-bold text-slate-900">Required Deliverables:</span>{' '}
                  {suggestedDeliverables.join(' • ')}
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() =>
                askMahiContext(
                  `Help me refine the KPIs and requirements for "${inputTitle}"`,
                  'ai_analysis'
                )
              }
              className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-blue-600" />
              <span>Ask Mahi to refine or improve this requirement</span>
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => navigate('/ai-recommendations')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
              >
                <span>View Matching Startups</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <span>Login as Government to Publish</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Mahi Pill matching Reference Image */}
        <MahiPill
          label="Ask Mahi to refine or improve this requirement"
          contextPage="ai_analysis"
          customPrompt="How do I refine this requirement to attract top DPIIT recognized startups?"
        />
    </div>
  );
};
