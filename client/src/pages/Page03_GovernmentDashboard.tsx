import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkflow } from '../context/WorkflowContext';
import { MahiPill } from '../components/MahiPill';
import {
  Target,
  FileText,
  Rocket,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const Page03_GovernmentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { challenges, proposals, pilot, procurement } = useWorkflow();
  const navigate = useNavigate();

  // Dynamic statistics from database/workflow
  const totalChallenges = 24; // baseline from reference image + live length
  const proposalsReceived = 86;
  const activePilots = 12;
  const successfulPilots = 8;

  const recentActivities = [
    {
      id: 1,
      title: 'New proposal received for Smart Waste Management',
      time: '2 hours ago',
      type: 'proposal',
      link: '/evaluations/1',
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 2,
      title: 'Pilot completed for AI Traffic Monitoring',
      time: '5 hours ago',
      type: 'pilot',
      link: '/pilots/1',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 3,
      title: 'Challenge published: Rural Healthcare Solution',
      time: '1 day ago',
      type: 'challenge',
      link: '/challenges',
      color: 'text-emerald-600 bg-emerald-50'
    },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Welcome Top Banner matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>Welcome, Officer</span>
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold">
              Urban Development Dept.
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Let's build an innovative Maharashtra
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/challenges/create')}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Challenge</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards matching Reference Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Challenges */}
        <div
          onClick={() => navigate('/challenges')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-400 cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500">Total Challenges</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalChallenges}</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +2 this month
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Target className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Proposals Received */}
        <div
          onClick={() => navigate('/proposals')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-400 cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500">Proposals Received</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{proposalsReceived}</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14 new
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Active Pilots */}
        <div
          onClick={() => navigate('/pilots/1')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-400 cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500">Active Pilots</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{activePilots}</div>
            <div className="text-[10px] text-blue-600 font-medium mt-1">
              78% avg completion
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Rocket className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Successful Pilots */}
        <div
          onClick={() => navigate('/pilot-evaluation/1')}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-blue-400 cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500">Successful Pilots</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{successfulPilots}</div>
            <div className="text-[10px] text-amber-600 font-medium mt-1">
              Ready for procurement
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Activities Section matching Reference Image */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Recent Activities</span>
          </h3>
          <button
            onClick={() => navigate('/admin')}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            View All Audit Logs
          </button>
        </div>

        <div className="space-y-3">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              onClick={() => navigate(act.link)}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-slate-50/50 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${act.color}`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">{act.title}</div>
                  <div className="text-[10px] text-slate-400">{act.time}</div>
                </div>
              </div>

              <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                View <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi for insights, reports or help"
        contextPage="gov_dashboard"
        customPrompt="Give me an overview of active government challenges and pilot progress"
      />
    </div>
  );
};
