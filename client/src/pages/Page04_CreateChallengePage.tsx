import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Sparkles,
  Send,
  Save,
  HelpCircle,
  CheckCircle2,
  Bot,
  ArrowRight
} from 'lucide-react';

export const Page04_CreateChallengePage: React.FC = () => {
  const navigate = useNavigate();
  const { createPilot, activeChallenge, runAnalysisForActiveChallenge } = useWorkflow();
  const { askMahiContext } = useMahi();

  const [title, setTitle] = useState('Smart Waste Management');
  const [description, setDescription] = useState(
    'AI-based waste segregation system for municipal areas to improve efficiency and reduce landfill waste.'
  );
  const [technologies, setTechnologies] = useState('Computer Vision, Machine Learning, IoT');
  const [budget, setBudget] = useState('10,00,000');
  const [duration, setDuration] = useState('3 Months');
  const [location, setLocation] = useState('Pune');
  const [eligibility, setEligibility] = useState(
    'DPIIT recognized startups with proven machine learning or IoT prototypes.'
  );
  const [deliverables, setDeliverables] = useState(
    'Automated classification hardware/software, dashboard, pilot report.'
  );

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      await runAnalysisForActiveChallenge();
      navigate('/ai-analysis');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('Challenge published successfully! Startups can now view it in the marketplace.');
    setTimeout(() => {
      navigate('/marketplace');
    }, 1200);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl font-black text-slate-900">Create New Challenge</h1>
          <p className="text-xs text-slate-500">
            Post an outcome-based public challenge to discover, pilot, and procure startup solutions.
          </p>
        </div>

        {/* Mahi Helper callout matching Reference Image */}
        <button
          type="button"
          onClick={() =>
            askMahiContext(
              'Help me formulate an outcome-based government challenge for waste management',
              'create_challenge'
            )
          }
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition"
        >
          <Bot className="w-4 h-4 text-blue-600" />
          <span>Need help to create a challenge? <strong>Ask Mahi</strong></span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Challenge Form matching Reference Image */}
      <form onSubmit={handlePublish} className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4 text-xs">
        {/* Challenge Title */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Challenge Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter challenge title (e.g. Smart Waste Management)"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
          />
        </div>

        {/* Problem Description */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Problem Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe the civic or operational problem in detail..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Required Technology */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Required Technology
          </label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="Select or enter technology (e.g. Computer Vision, Machine Learning, IoT)"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
          />
        </div>

        {/* Budget & Expected Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Budget (INR)
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter budget in INR (e.g. 10,00,000)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Expected Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
            >
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="12 Months">12 Months</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter deployment location (e.g. Pune Municipal Corporation)"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
          />
        </div>

        {/* Eligibility Criteria */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Eligibility Criteria
          </label>
          <textarea
            rows={2}
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            placeholder="Enter eligibility criteria for startups..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Required Deliverables */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Required Deliverables
          </label>
          <textarea
            rows={2}
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            placeholder="List expected deliverables..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Form Action Buttons matching Reference Image */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => alert('Draft saved to database!')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save Draft</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold rounded-lg flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>{loading ? 'Analyzing...' : 'Analyze Requirement'}</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition"
            >
              <span>Publish Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Need help to create a challenge? Ask Mahi"
        contextPage="create_challenge"
        customPrompt="How do I structure this problem statement to attract top startups?"
      />
    </div>
  );
};
