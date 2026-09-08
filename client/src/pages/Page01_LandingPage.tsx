import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  ShieldCheck,
  Users,
  Lightbulb,
  Target,
  ArrowRight,
  Bot,
  Building2,
  Sparkles,
  Award,
  CheckCircle2,
  Rocket,
  ShoppingBag,
  TrendingUp,
  Search,
  Check,
  ChevronRight,
  FileCheck2,
  Layers
} from 'lucide-react';

export const Page01_LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const { askMahiContext } = useMahi();

  const activeChallenges = [
    {
      id: 1,
      title: 'Smart Waste Management',
      dept: 'Dept. of Urban Development',
      budget: '₹10 Lakhs',
      deadline: '20 Oct 2026',
      tech: ['AI', 'IoT', 'Environment'],
      desc: 'AI-based waste segregation system for municipal areas to improve sorting efficiency and reduce landfill waste.'
    },
    {
      id: 2,
      title: 'Rural Healthcare Monitoring',
      dept: 'Dept. of Public Health',
      budget: '₹15 Lakhs',
      deadline: '25 Oct 2026',
      tech: ['IoT', 'Healthcare', 'Rural'],
      desc: 'Remote tele-diagnostic edge device network for Primary Health Centers in tribal and rural regions.'
    },
    {
      id: 3,
      title: 'AI Traffic Flow Optimization',
      dept: 'Dept. of Home & Transport',
      budget: '₹20 Lakhs',
      deadline: '15 Nov 2026',
      tech: ['AI', 'Computer Vision', 'Smart City'],
      desc: 'Adaptive camera-based traffic signal timing to eliminate corridor bottlenecks and reduce commute delays.'
    },
  ];

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* 1. HERO SECTION - Clean, Strictly Aligned Two-Column Layout    */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Direct Role Logins, CTAs, Badges */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              
              {/* Government Problem Statement Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/90 text-blue-800 rounded-full text-xs font-bold w-fit shadow-2xs border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Government Problem Statement ID 26136</span>
              </div>

              {/* Main Branding & Catchphrase */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  <span className="text-[#0b3b60]">Maha</span>
                  <span className="text-blue-600">Innovate</span>
                </h1>
                <p className="text-xl sm:text-2xl text-slate-800 font-extrabold leading-snug">
                  Connecting Government Problems with Innovative Startup Solutions
                </p>
              </div>

              {/* Subtitle / Core Mandate */}
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                A startup-friendly public procurement mechanism that enables government departments to identify, pilot, procure, and scale innovative solutions from eligible startups for the Government of Maharashtra.
              </p>

              {/* Primary Dual Role Action Buttons (As shown in Reference Image Screen 1) */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/login?role=government"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs sm:text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Login as Government</span>
                </Link>

                <Link
                  to="/login?role=startup"
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-blue-700 font-bold rounded-lg text-xs sm:text-sm border-2 border-blue-600 transition flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Rocket className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Login as Startup</span>
                </Link>
              </div>

              {/* Quick Links Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-0.5">
                <Link
                  to="/login?tab=register"
                  className="text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>Register Startup</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-slate-300">•</span>
                <Link
                  to="/ai-analysis"
                  className="text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition"
                >
                  <Bot className="w-3.5 h-3.5 text-blue-600" />
                  <span>Try AI Requirement Analysis</span>
                </Link>
                <span className="text-slate-300">•</span>
                <Link
                  to="/marketplace"
                  className="text-slate-700 hover:text-blue-600 transition"
                >
                  View Live Challenges
                </Link>
              </div>

              {/* Interactive Mahi Callout Card (Matching Reference Screen 1) */}
              <div
                onClick={() => askMahiContext('Help me understand the MahInnovate procurement process')}
                className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-center justify-between shadow-2xs hover:shadow-sm cursor-pointer transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Bot className="w-5 h-5 text-white group-hover:animate-bounce" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Hi! I'm Mahi 👋 <span className="font-normal text-slate-600">Need help? Ask me anything!</span>
                    </div>
                    <div className="text-[11px] text-blue-700 font-medium">
                      Your AI guide for public procurement and startup registration
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md shadow-xs transition shrink-0"
                >
                  Ask Mahi
                </button>
              </div>

              {/* 4 Core Pillars Strip */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-md shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Transparent
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold rounded-md shadow-2xs">
                  <Users className="w-3.5 h-3.5 text-indigo-600" /> Inclusive
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-md shadow-2xs">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Innovative
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-md shadow-2xs">
                  <Target className="w-3.5 h-3.5 text-rose-600" /> Impact Driven
                </span>
              </div>

            </div>

            {/* Right Column: Gateway of India Vector Artwork & Policy Framework Card (Matching Screen 1) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                
                {/* Visual Header Artwork: Mumbai Gateway of India Architectural Illustration */}
                <div className="relative bg-gradient-to-b from-sky-400 via-sky-300 to-amber-100 p-6 pt-8 pb-4 flex flex-col items-center justify-center border-b border-slate-200 overflow-hidden">
                  
                  {/* Subtle Sun & Cloud Accents */}
                  <div className="absolute top-4 right-8 w-12 h-12 rounded-full bg-amber-200/80 blur-xs" />
                  <div className="absolute top-6 right-10 w-8 h-8 rounded-full bg-amber-100" />

                  {/* Clean SVG Vector of Mumbai's Gateway of India */}
                  <svg viewBox="0 0 320 180" className="w-full max-w-[280px] h-auto drop-shadow-md">
                    {/* Sky / Horizon Ground line */}
                    <rect x="0" y="165" width="320" height="15" fill="#e2e8f0" />
                    <rect x="0" y="160" width="320" height="5" fill="#cbd5e1" />

                    {/* Gateway Base Plinth */}
                    <rect x="40" y="150" width="240" height="10" fill="#9a3412" rx="1" />
                    <rect x="45" y="145" width="230" height="5" fill="#c2410c" />

                    {/* Left Outer Turret / Pier */}
                    <rect x="50" y="60" width="35" height="85" fill="#b45309" />
                    <rect x="48" y="55" width="39" height="5" fill="#92400e" />
                    <polygon points="50,55 67.5,35 85,55" fill="#78350f" />
                    {/* Pier Windows / Jalis */}
                    <rect x="62" y="75" width="11" height="18" rx="5" fill="#451a03" />
                    <rect x="62" y="105" width="11" height="18" rx="5" fill="#451a03" />

                    {/* Right Outer Turret / Pier */}
                    <rect x="235" y="60" width="35" height="85" fill="#b45309" />
                    <rect x="233" y="55" width="39" height="5" fill="#92400e" />
                    <polygon points="235,55 252.5,35 270,55" fill="#78350f" />
                    {/* Pier Windows */}
                    <rect x="247" y="75" width="11" height="18" rx="5" fill="#451a03" />
                    <rect x="247" y="105" width="11" height="18" rx="5" fill="#451a03" />

                    {/* Central Grand Gateway Body */}
                    <rect x="85" y="50" width="150" height="95" fill="#d97706" />
                    <rect x="80" y="45" width="160" height="5" fill="#b45309" />
                    {/* Cornice & Parapet */}
                    <rect x="85" y="38" width="150" height="7" fill="#92400e" />
                    <circle cx="160" cy="30" r="14" fill="#78350f" />
                    <polygon points="160,10 156,22 164,22" fill="#d97706" />

                    {/* Central High Grand Arch */}
                    <path
                      d="M 125,145 L 125,95 A 35,35 0 0,1 195,95 L 195,145 Z"
                      fill="#312e81"
                    />
                    <path
                      d="M 130,145 L 130,96 A 30,30 0 0,1 190,96 L 190,145 Z"
                      fill="#1e1b4b"
                    />

                    {/* Decorative Indian Rosette Medallion */}
                    <circle cx="160" cy="72" r="7" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />

                    {/* Small Left Arch */}
                    <path d="M 95,145 L 95,115 A 12,12 0 0,1 119,115 L 119,145 Z" fill="#451a03" />
                    {/* Small Right Arch */}
                    <path d="M 201,145 L 201,115 A 12,12 0 0,1 225,115 L 225,145 Z" fill="#451a03" />
                  </svg>

                  {/* Caption */}
                  <div className="text-[11px] font-bold text-slate-800 tracking-wide mt-2">
                    Gateway of Maharashtra Public Innovation
                  </div>
                </div>

                {/* Policy Mechanism Breakdown */}
                <div className="p-5 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2 font-black text-slate-900 text-xs sm:text-sm">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Policy ID 26136 Rules</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                      Maharashtra Norms
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-900">Direct Procurement Exemption</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Startups whose pilot achieves a validated score of <strong>&gt; 85%</strong> qualify for direct procurement purchase orders without open re-tendering.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center font-semibold text-xs">
                    <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="text-blue-900 font-black text-lg">90 Days</div>
                      <div className="text-[10px] text-blue-700">Controlled Field Pilot</div>
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="text-emerald-900 font-black text-lg">100%</div>
                      <div className="text-[10px] text-emerald-700">Audit Traceability</div>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Nodal Agency: Urban Development Dept</span>
                    <Link to="/about" className="text-blue-600 hover:underline font-bold">
                      Read Policy Details →
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. 4-PHASE PROCUREMENT JOURNEY - Balanced Grid Cards           */}
      {/* ============================================================== */}
      <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
            Standardized Public Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            The MahInnovate Procurement Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Enabling government departments and startups to collaborate with transparency and speed
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Identify',
              desc: 'Government departments formulate outcome-based requirements. AI extracts structured KPIs, tech stacks, and risk profiles.',
              icon: Search,
              border: 'border-t-blue-600',
              badgeBg: 'bg-blue-50 text-blue-600',
            },
            {
              step: '02',
              title: 'Pilot',
              desc: 'Shortlisted startups deploy a 90-day field pilot with milestone sign-offs and live telemetry verification.',
              icon: Rocket,
              border: 'border-t-emerald-600',
              badgeBg: 'bg-emerald-50 text-emerald-600',
            },
            {
              step: '03',
              title: 'Procure',
              desc: 'Independent validation by technical panels. Solutions scoring >85% are awarded direct procurement purchase orders.',
              icon: ShoppingBag,
              border: 'border-t-indigo-600',
              badgeBg: 'bg-indigo-50 text-indigo-600',
            },
            {
              step: '04',
              title: 'Scale',
              desc: 'AI matches successful pilots with similar municipal corporations across Maharashtra for rapid statewide deployment.',
              icon: TrendingUp,
              border: 'border-t-purple-600',
              badgeBg: 'bg-purple-50 text-purple-600',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`bg-white rounded-xl p-6 border-t-4 ${item.border} border-x border-b border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition h-full`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-300">{item.step}</span>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.badgeBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                  Stage {item.step} of 04
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. AI REQUIREMENT ANALYSIS SPOTLIGHT - Strictly Aligned        */}
      {/* ============================================================== */}
      <section className="py-12 bg-gradient-to-r from-[#0b2b4d] via-[#0d345e] to-[#0b1e33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-blue-500/30 text-cyan-300 rounded-full text-xs font-semibold border border-blue-400/30">
                <Bot className="w-3.5 h-3.5" />
                <span>Public Innovation Feature</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                AI Requirement Analysis Engine
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Civic departments often face challenges in writing structured technical procurement specs. MahInnovate's AI converts unstructured problem statements into structured requirements, target KPIs, and eligible startup profiles with one click.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/ai-analysis"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Test AI Requirement Analyzer</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/marketplace"
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-xs sm:text-sm border border-white/20 transition cursor-pointer"
                >
                  Browse Active Challenges
                </Link>
              </div>
            </div>

            {/* Right Sample Card */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-xs space-y-3 shadow-xl">
              <div className="text-cyan-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Extraction Snapshot</span>
              </div>
              <div className="space-y-2 text-slate-200">
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Domain:</span>
                  <span className="font-bold text-white">Waste Management</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Technologies:</span>
                  <span className="font-bold text-white">Computer Vision, IoT</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Target KPI:</span>
                  <span className="font-bold text-emerald-400">Accuracy &gt; 90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Top Match:</span>
                  <span className="font-bold text-cyan-300">GreenTech (94%)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. LIVE CHALLENGES PREVIEW - Uniform Aligned Cards             */}
      {/* ============================================================== */}
      <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Maharashtra State Bidding
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Active Government Challenges
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Eligible DPIIT startups can submit solution proposals for funded 90-day pilots.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Challenges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeChallenges.map((ch) => (
            <div
              key={ch.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between space-y-4 h-full"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>{ch.dept}</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Open
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{ch.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 min-h-[32px]">{ch.desc}</p>

                <div className="flex flex-wrap gap-1.5 pt-1 min-h-[28px]">
                  {ch.tech.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">Pilot Budget</div>
                  <div className="font-extrabold text-slate-900 text-sm">{ch.budget}</div>
                </div>
                <Link
                  to="/login?role=startup"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Apply / Pilot</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Mahi Pill */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <MahiPill
          label="Hi! I'm Mahi 👋 Need help? Ask me anything!"
          contextPage="landing"
          customPrompt="Explain how MahInnovate connects startups with Maharashtra government departments"
        />
      </div>
    </div>
  );
};
