import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Building2,
  Globe,
  Award,
  Users,
  Calendar,
  FileCheck2,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';

export const Page07_StartupProfilePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startups, toggleShortlist } = useWorkflow();
  const { askMahiContext } = useMahi();

  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'products' | 'experience' | 'documents'>('overview');

  const startup = startups.find(s => s.id === Number(id)) || startups[0];

  return (
    <div className="space-y-6 w-full">
      {/* Header Profile Card matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl shadow-2xs">
              {startup.logo_url}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900">
                  {startup.company_name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" /> DPIIT Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {startup.city}, {startup.state} • Founded {startup.founded_year}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleShortlist(startup.id)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition cursor-pointer"
            >
              Shortlist
            </button>
            <button
              onClick={() => navigate('/proposals/submit')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            >
              Invite to Challenge
            </button>
          </div>
        </div>

        {/* Tab Navigation matching Reference Image */}
        <div className="flex items-center gap-6 mt-6 border-b border-slate-200 text-xs font-semibold">
          {(['overview', 'team', 'products', 'experience', 'documents'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 capitalize transition cursor-pointer ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content: Overview matching Reference Image exact fields */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-3 border-b border-slate-100">
            <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Industry
            </span>
            <div className="sm:col-span-9 font-semibold text-slate-900">
              {startup.industry}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-3 border-b border-slate-100">
            <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Technologies
            </span>
            <div className="sm:col-span-9 flex flex-wrap gap-1.5 font-medium">
              {startup.technologies.map((t, idx) => (
                <span key={idx} className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-3 border-b border-slate-100">
            <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Team Size
            </span>
            <div className="sm:col-span-9 text-slate-800 font-medium">
              {startup.team_size} Employees
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-3 border-b border-slate-100">
            <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Founded
            </span>
            <div className="sm:col-span-9 text-slate-800 font-medium">
              {startup.founded_year}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-3 border-b border-slate-100">
            <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Previous Projects
            </span>
            <div className="sm:col-span-9 font-semibold text-slate-900">
              {startup.previous_projects}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-3 border-b border-slate-100">
            <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Certifications
            </span>
            <div className="sm:col-span-9 flex flex-wrap gap-1.5">
              {startup.certifications.map((c, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-semibold border border-emerald-200">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pb-3 border-b border-slate-100">
            <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              Website
            </span>
            <div className="sm:col-span-9 font-medium text-blue-600">
              <a href={`https://${startup.website}`} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <span>{startup.website}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <span className="sm:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
              About
            </span>
            <div className="sm:col-span-9 text-slate-700 leading-relaxed font-medium">
              {startup.about}
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 text-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Key Leadership Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900">Amit Deshmukh</div>
              <div className="text-slate-500 text-[11px]">Founder & CEO (Ex-IIT Bombay)</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900">Dr. Sneha Kulkarni</div>
              <div className="text-slate-500 text-[11px]">Chief AI Scientist</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900">Rahul Varma</div>
              <div className="text-slate-500 text-[11px]">Head of Hardware & IoT</div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 text-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Verified Credentials & Documents</h3>
          <div className="space-y-2">
            {[
              { name: 'DPIIT Recognition Certificate.pdf', size: '1.2 MB' },
              { name: 'ISO 9001 Quality Management Audit.pdf', size: '2.4 MB' },
              { name: 'Pune Municipal Corporation Pilot Completion Letter.pdf', size: '890 KB' },
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-slate-800">{doc.name}</span>
                  <span className="text-[10px] text-slate-400">({doc.size})</span>
                </div>
                <button
                  onClick={() => alert(`Downloading verified document: ${doc.name}`)}
                  className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi about this startup or compare with others"
        contextPage="startup_profile"
        customPrompt="Provide an executive summary of GreenTech Innovations credentials and past PMC deployments"
      />
    </div>
  );
};
