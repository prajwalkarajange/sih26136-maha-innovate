import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Bot,
  Sparkles,
  Send,
  Building2,
  ArrowRight
} from 'lucide-react';

export const Page09_ProposalSubmissionPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { activeChallenge, submitProposal } = useWorkflow();
  const { askMahiContext } = useMahi();

  const [solutionName, setSolutionName] = useState('Smart Bin & Automated Segregation AI System');
  const [solutionDescription, setSolutionDescription] = useState(
    'High-throughput computer vision edge system with automated classification into wet, dry, plastic, and recyclable streams.'
  );
  const [technologyUsed, setTechnologyUsed] = useState('AI, IoT, Computer Vision');
  const [implementationPlan, setImplementationPlan] = useState(
    'Phase 1: Hardware sensor calibration; Phase 2: Pilot bin installation in 5 PMC wards; Phase 3: Telemetry sync and user training.'
  );
  const [estimatedCost, setEstimatedCost] = useState('500000');
  const [duration, setDuration] = useState('3 Months');
  const [previousExperience, setPreviousExperience] = useState(
    'Deployed 50 smart bins with Pune Municipal Corporation with 92% classification accuracy.'
  );

  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Real-time Mahi pre-flight validation
  const missingFields: string[] = [];
  if (!solutionName.trim()) missingFields.push('Solution Name');
  if (!solutionDescription.trim()) missingFields.push('Solution Description');
  if (!implementationPlan.trim()) missingFields.push('Implementation Plan');
  if (!estimatedCost.trim()) missingFields.push('Estimated Cost');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const techArray = technologyUsed.split(',').map(t => t.trim());
      await submitProposal({
        solution_name: solutionName,
        solution_description: solutionDescription,
        technology_used: techArray,
        implementation_plan: implementationPlan,
        estimated_cost_inr: Number(estimatedCost),
        duration,
        previous_experience: previousExperience,
        proposal_pdf_url: '/documents/greentech_proposal.pdf',
        certifications_url: '/documents/greentech_iso9001.pdf',
      });

      setSubmittedSuccess(true);
      setTimeout(() => {
        navigate('/evaluations/1');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMahiAssist = () => {
    askMahiContext(
      'Review my proposal for Smart Waste Management. Are there any missing documents or weak sections?',
      'proposal_submission'
    );
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner with Mahi Solution Upload Assistant */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 flex items-center gap-1 w-fit mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Challenge: {activeChallenge?.title || 'Smart Waste Management'}</span>
          </span>
          <h1 className="text-xl font-black text-slate-900">
            Submit Your Proposal
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Present your innovative startup solution to Maharashtra government evaluators.
          </p>
        </div>

        <button
          type="button"
          onClick={handleMahiAssist}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition"
        >
          <Bot className="w-4 h-4 text-blue-600" />
          <span>Need help to write or upload? <strong>Ask Mahi</strong></span>
        </button>
      </div>

      {submittedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <div>Proposal Submitted Successfully! (Status: SUBMITTED)</div>
            <div className="text-[11px] text-emerald-600 font-normal mt-0.5">
              Government department notified. Redirecting to evaluation scorecard...
            </div>
          </div>
        </div>
      )}

      {/* Form matching Reference Image */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4 text-xs">
        {/* Solution Name & Description */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Solution Name
            </label>
            <input
              type="text"
              value={solutionName}
              onChange={(e) => setSolutionName(e.target.value)}
              required
              placeholder="Enter solution name"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Solution Description
            </label>
            <input
              type="text"
              value={solutionDescription}
              onChange={(e) => setSolutionDescription(e.target.value)}
              required
              placeholder="Describe your solution..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Technology Used */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Technology Used
          </label>
          <input
            type="text"
            value={technologyUsed}
            onChange={(e) => setTechnologyUsed(e.target.value)}
            required
            placeholder="Enter technologies (e.g. AI, IoT, Computer Vision)"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
          />
        </div>

        {/* Implementation Plan, Cost, Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-800 mb-1">
              Implementation Plan
            </label>
            <textarea
              rows={3}
              value={implementationPlan}
              onChange={(e) => setImplementationPlan(e.target.value)}
              required
              placeholder="Describe implementation plan & milestones..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Estimated Cost (INR)
              </label>
              <input
                type="text"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                required
                placeholder="Enter cost (e.g. 5,00,000)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden font-medium"
              >
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Previous Experience */}
        <div>
          <label className="block font-bold text-slate-800 mb-1">
            Previous Experience
          </label>
          <input
            type="text"
            value={previousExperience}
            onChange={(e) => setPreviousExperience(e.target.value)}
            placeholder="Describe relevant experience or previous government projects..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        {/* File Uploads matching Reference Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Upload Proposal PDF */}
          <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
            <label className="block font-bold text-slate-800 mb-1">
              Upload Proposal (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setProposalFile(e.target.files?.[0] || null)}
              className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block mt-1">
              greentech_proposal.pdf (Attached)
            </span>
          </div>

          {/* Upload Certifications */}
          <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
            <label className="block font-bold text-slate-800 mb-1">
              Upload Certifications
            </label>
            <input
              type="file"
              accept=".pdf,.png,.jpg"
              onChange={(e) => setCertFile(e.target.files?.[0] || null)}
              className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block mt-1">
              DPIIT & ISO 9001.pdf (Attached)
            </span>
          </div>
        </div>

        {/* Submit Button matching Reference Image */}
        <div className="pt-4 flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-80 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-2 cursor-pointer text-xs"
          >
            <span>{loading ? 'Submitting...' : 'Submit Proposal'}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Need help to write or upload your solution? Ask Mahi"
        contextPage="proposal_submission"
        customPrompt="Guide me step-by-step in writing and uploading this proposal"
      />
    </div>
  );
};
