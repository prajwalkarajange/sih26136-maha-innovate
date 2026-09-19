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
  Layers,
  FileText,
  BarChart3,
  Settings
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
      {/* 1. HERO SECTION - Exact 1:1 Match to Reference Image           */}
      {/* ============================================================== */}
      <section 
        className="relative w-full overflow-hidden bg-slate-900 border-b border-slate-200 lg:h-[calc(100vh-64px)] min-h-[640px] flex flex-col justify-between"
      >
        {/* Full Hero Background Image: gateway_bg.jpg with water and boats fully preserved */}
        <div 
          className="absolute inset-0 z-0 bg-no-repeat bg-cover pointer-events-none"
          style={{
            backgroundImage: "url('/gateway_bg.jpg')",
            backgroundPosition: '85% 82%',
          }}
        />

        {/* Soft white/sky wash overlay on the left to guarantee 100% crisp typography */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 32%, rgba(255,255,255,0.65) 52%, rgba(255,255,255,0.15) 70%, rgba(255,255,255,0) 85%)'
          }}
        />

        {/* Vertically and horizontally centered content block in the left region */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center py-6">
          <div className="w-full max-w-xl lg:max-w-2xl flex flex-col items-center text-center">
            {/* Title: MahaInnovate */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-[#0f2d59] leading-none mb-3.5">
              MahaInnovate
            </h1>

            {/* Subtitle: Connecting Government Problems with Innovative Startup Solutions */}
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#1d63ed] leading-tight mb-4">
              Connecting Government Problems<br />with Innovative Startup Solutions
            </h2>

            {/* Paragraph: A startup-friendly public procurement mechanism... */}
            <p className="text-sm sm:text-base lg:text-[16px] text-slate-700 font-medium leading-relaxed max-w-lg mb-6 text-center">
              A startup-friendly public procurement mechanism to identify, pilot, procure and scale innovative solutions for a better Maharashtra.
            </p>

            {/* Action Buttons: 2 Rows, Perfectly Centered */}
            <div className="flex flex-col items-center gap-3 w-full">
              {/* Row 1: [ Login as Government ]  [ Login as Startup ] */}
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  to="/login?role=government"
                  className="px-6 py-2.5 sm:py-3 bg-[#1877f2] hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95 text-center cursor-pointer min-w-[185px]"
                >
                  Login as Government
                </Link>

                <Link
                  to="/login?role=startup"
                  className="px-6 py-2.5 sm:py-3 bg-white/85 hover:bg-white text-[#1877f2] hover:text-blue-700 font-bold text-sm sm:text-base rounded-xl border-2 border-[#1877f2] shadow-sm hover:shadow-md transition-all transform active:scale-95 text-center cursor-pointer min-w-[160px]"
                >
                  Login as Startup
                </Link>
              </div>

              {/* Row 2: [ Register Startup ] - centered under button group */}
              <div className="flex items-center justify-center">
                <Link
                  to="/login?tab=register"
                  className="px-8 py-2.5 sm:py-3 bg-white/85 hover:bg-white text-[#1877f2] hover:text-blue-700 font-bold text-sm sm:text-base rounded-xl border-2 border-[#1877f2] shadow-sm hover:shadow-md transition-all transform active:scale-95 text-center cursor-pointer min-w-[175px]"
                >
                  Register Startup
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area: Tagline & 4 Value Pillars Bar Over Water */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Centered Tagline: "Innovate | Collaborate | Build a Better Maharashtra" */}
          <div className="w-full text-center pb-2.5 px-4">
            <p className="text-xs sm:text-sm md:text-base font-semibold text-[#0f2d59] tracking-wide drop-shadow-2xs">
              &ldquo;Innovate | Collaborate | Build a Better Maharashtra&rdquo;
            </p>
          </div>

          {/* 4 Value Pillars Bar at Bottom */}
          <div className="w-full bg-white/85 backdrop-blur-md border-t border-slate-200/80 shadow-xs py-3 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center">
              
              {/* 1. Transparent */}
              <div className="flex items-center gap-2.5 text-[#0f2d59]">
                <div className="w-7 h-7 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#0f2d59] fill-none stroke-[2.2]">
                    <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span className="font-bold text-sm sm:text-base tracking-tight">Transparent</span>
              </div>

              {/* 2. Inclusive */}
              <div className="flex items-center gap-2.5 text-[#0f2d59]">
                <div className="w-7 h-7 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#0f2d59] fill-none stroke-[2]">
                    <circle cx="12" cy="12" r="2.5" fill="#0f2d59" />
                    <circle cx="6" cy="7" r="2" fill="#0f2d59" />
                    <circle cx="18" cy="7" r="2" fill="#0f2d59" />
                    <circle cx="6" cy="17" r="2" fill="#0f2d59" />
                    <circle cx="18" cy="17" r="2" fill="#0f2d59" />
                    <line x1="12" y1="12" x2="6" y2="7" />
                    <line x1="12" y1="12" x2="18" y2="7" />
                    <line x1="12" y1="12" x2="6" y2="17" />
                    <line x1="12" y1="12" x2="18" y2="17" />
                  </svg>
                </div>
                <span className="font-bold text-sm sm:text-base tracking-tight">Inclusive</span>
              </div>

              {/* 3. Innovative */}
              <div className="flex items-center gap-2.5 text-[#0f2d59]">
                <div className="w-7 h-7 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#0f2d59] fill-none stroke-[2.2]" strokeLinecap="round">
                    <circle cx="12" cy="12" r="4" />
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
                    <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
                    <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
                    <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
                  </svg>
                </div>
                <span className="font-bold text-sm sm:text-base tracking-tight">Innovative</span>
              </div>

              {/* 4. Impact Driven */}
              <div className="flex items-center gap-2.5 text-[#0f2d59]">
                <div className="w-7 h-7 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#0f2d59] fill-none stroke-[2.2]">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="2" x2="12" y2="6" strokeLinecap="round" />
                    <line x1="12" y1="18" x2="12" y2="22" strokeLinecap="round" />
                    <line x1="2" y1="12" x2="6" y2="12" strokeLinecap="round" />
                    <line x1="18" y1="12" x2="22" y2="12" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="font-bold text-sm sm:text-base tracking-tight">Impact Driven</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* STATE PORTAL OVERVIEW & STATS BAR (Image 1 Exact Match)       */}
      {/* ============================================================== */}
      <section className="bg-slate-50/70 border-b border-slate-200 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* 1. TOP 4 QUICK NAVIGATION CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1: Government Challenges */}
            <Link
              to="/marketplace"
              className="p-5 rounded-2xl bg-[#eff6ff] hover:bg-[#e0edff] border border-blue-100/90 shadow-2xs hover:shadow-md hover:scale-[1.03] transition-all duration-200 transform group flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600/10 text-[#0f2d59] flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-[#0f2d59]" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-blue-600 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-extrabold text-[#0f2d59] text-base leading-tight">
                  Government Challenges <span className="block text-sm font-semibold text-slate-700 font-sans mt-0.5">शासकीय आव्हाने</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Explore real-world problems from various departments
                </p>
              </div>
            </Link>

            {/* Card 2: Startup Opportunities */}
            <Link
              to="/login?role=startup"
              className="p-5 rounded-2xl bg-[#fff7ed] hover:bg-[#ffedd5] border border-amber-100/90 shadow-2xs hover:shadow-md hover:scale-[1.03] transition-all duration-200 transform group flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-amber-700" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-amber-600 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-extrabold text-[#0f2d59] text-base leading-tight">
                  Startup Opportunities <span className="block text-sm font-semibold text-slate-700 font-sans mt-0.5">स्टार्टअप संधी</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Discover opportunities to collaborate with Government
                </p>
              </div>
            </Link>

            {/* Card 3: Submit Proposal */}
            <Link
              to="/login?role=startup"
              className="p-5 rounded-2xl bg-[#f0fdf4] hover:bg-[#dcfce7] border border-emerald-100/90 shadow-2xs hover:shadow-md hover:scale-[1.03] transition-all duration-200 transform group flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-emerald-600 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-extrabold text-[#0f2d59] text-base leading-tight">
                  Submit Proposal <span className="block text-sm font-semibold text-slate-700 font-sans mt-0.5">प्रस्ताव सादर करा</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Share your innovative solution for a challenge
                </p>
              </div>
            </Link>

            {/* Card 4: Track Application */}
            <Link
              to="/login"
              className="p-5 rounded-2xl bg-[#f5f3ff] hover:bg-[#ede9fe] border border-purple-100/90 shadow-2xs hover:shadow-md hover:scale-[1.03] transition-all duration-200 transform group flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 rounded-xl bg-purple-600/10 text-purple-700 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-purple-700" />
                </div>
                <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-purple-600 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-extrabold text-[#0f2d59] text-base leading-tight">
                  Track Application <span className="block text-sm font-semibold text-slate-700 font-sans mt-0.5">अर्जाचा मागोवा घ्या</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Check the status of your proposal, pilot or procurement
                </p>
              </div>
            </Link>
          </div>

          {/* 2. STATS BAR CARDS (5 METRICS) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5">
            <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 gap-4 md:gap-0">
              
              {/* Stat 1 */}
              <div className="flex items-center gap-3.5 px-2 sm:px-4 py-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0f2d59] shrink-0 border border-blue-100">
                  <Target className="w-5 h-5 text-[#0f2d59]" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 leading-none">24</div>
                  <div className="text-xs font-bold text-slate-700 mt-1 leading-tight">Government Challenges</div>
                  <div className="text-[11px] text-slate-500 font-medium">शासकीय आव्हाने</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3.5 px-2 sm:px-4 py-2 pt-4 md:pt-2">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 border border-amber-100">
                  <Users className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 leading-none">112</div>
                  <div className="text-xs font-bold text-slate-700 mt-1 leading-tight">Registered Startups</div>
                  <div className="text-[11px] text-slate-500 font-medium">नोंदणीकृत स्टार्टअप्स</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3.5 px-2 sm:px-4 py-2 pt-4 md:pt-2">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-100">
                  <Settings className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 leading-none">8</div>
                  <div className="text-xs font-bold text-slate-700 mt-1 leading-tight">Ongoing Pilots</div>
                  <div className="text-[11px] text-slate-500 font-medium">चालू पायलट प्रकल्प</div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-3.5 px-2 sm:px-4 py-2 pt-4 md:pt-2">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-700 shrink-0 border border-purple-100">
                  <FileText className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 leading-none">5</div>
                  <div className="text-xs font-bold text-slate-700 mt-1 leading-tight">Procurements Initiated</div>
                  <div className="text-[11px] text-slate-500 font-medium">खरेदी प्रक्रिया सुरु</div>
                </div>
              </div>

              {/* Stat 5 */}
              <div className="flex items-center gap-3.5 px-2 sm:px-4 py-2 pt-4 md:pt-2">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 shrink-0 border border-indigo-100">
                  <BarChart3 className="w-5 h-5 text-indigo-700" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 leading-none">12+</div>
                  <div className="text-xs font-bold text-slate-700 mt-1 leading-tight">Departments Involved</div>
                  <div className="text-[11px] text-slate-500 font-medium">सहभागी विभाग</div>
                </div>
              </div>

            </div>
          </div>

          {/* 3. FEATURE GRID: LATEST UPDATES | MANTRALAYA QUOTE | MAHI ASSISTANT CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Column 1: Latest Updates | नवीन घडामोडी */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                    <span>Latest Updates</span>
                    <span className="text-slate-400 font-normal">|</span>
                    <span className="text-sm font-semibold text-slate-600 font-sans">नवीन घडामोडी</span>
                  </h3>
                  <Link to="/marketplace" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition flex items-center gap-0.5">
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {/* Dynamic Date helper */}
                  {(() => {
                    const formatDate = (offsetDays: number) => {
                      const d = new Date();
                      d.setDate(d.getDate() - offsetDays);
                      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                    };
                    return (
                      <>
                        <div className="py-2.5 flex items-start gap-3">
                          <span className="font-bold text-blue-700 shrink-0 min-w-[78px]">{formatDate(0)}</span>
                          <p className="text-slate-800 font-semibold leading-snug">
                            New challenge on Smart Waste Management published by Urban Development Department.{' '}
                            <span className="bg-red-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded ml-1 animate-[pulse_1.5s_ease-in-out_infinite] inline-block shadow-2xs">
                              New
                            </span>
                          </p>
                        </div>
                        <div className="py-2.5 flex items-start gap-3">
                          <span className="font-semibold text-slate-400 shrink-0 min-w-[78px]">{formatDate(3)}</span>
                          <p className="text-slate-700 font-medium leading-snug">
                            Pilot project for Water Quality Monitoring approved.
                          </p>
                        </div>
                        <div className="py-[#0f2d59] py-2.5 flex items-start gap-3">
                          <span className="font-semibold text-slate-400 shrink-0 min-w-[78px]">{formatDate(5)}</span>
                          <p className="text-slate-700 font-medium leading-snug">
                            5 new startups registered this week.
                          </p>
                        </div>
                        <div className="py-2.5 flex items-start gap-3">
                          <span className="font-semibold text-slate-400 shrink-0 min-w-[78px]">{formatDate(7)}</span>
                          <p className="text-slate-700 font-medium leading-snug">
                            Invitation for proposals – AI in Agriculture (Extended Deadline).
                          </p>
                        </div>
                        <div className="py-2.5 flex items-start gap-3">
                          <span className="font-semibold text-slate-400 shrink-0 min-w-[78px]">{formatDate(10)}</span>
                          <p className="text-slate-700 font-medium leading-snug">
                            Procurement process initiated for E-Health Kiosk.
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Column 2: Mantralaya Photo & State Quote Card (With Hover scale & color effect) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col sm:flex-row h-full hover:shadow-md hover:scale-[1.02] hover:border-amber-300/80 transition-all duration-200 transform cursor-pointer group">
              <div className="w-full sm:w-1/2 relative min-h-[160px] bg-slate-100 overflow-hidden">
                <img
                  src="/mantralaya_mumbai.jpg"
                  alt="Mantralaya, Mumbai"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  Mantralaya, Mumbai
                </span>
              </div>
              <div className="w-full sm:w-1/2 p-5 bg-[#fffbeb] group-hover:bg-[#fef3c7]/60 border-t sm:border-t-0 sm:border-l border-amber-100/80 flex flex-col justify-center space-y-2 transition-colors">
                <span className="text-amber-600 text-3xl font-serif leading-none">&ldquo;</span>
                <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug font-serif">
                  Together for a more innovative, inclusive and prosperous Maharashtra.&rdquo;
                </p>
                <p className="text-[11px] text-amber-800 font-medium pt-1">
                  — Government of Maharashtra
                </p>
              </div>
            </div>

            {/* Column 3: Mahi - Your Assistant Card (With Hover scale & color effect) */}
            <div 
              onClick={() => askMahiContext('Help me understand the MahInnovate procurement process and active challenges')}
              className="lg:col-span-3 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 rounded-2xl border border-blue-200/80 hover:border-blue-400 p-5 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-200 transform cursor-pointer flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#0f2d59] group-hover:bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs transition-colors">
                    <Bot className="w-5 h-5 text-white group-hover:animate-bounce" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 group-hover:text-blue-700 text-sm leading-tight transition-colors">
                    Mahi – Your Assistant
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Get instant information about challenges, guidelines, procurement process and more.
                </p>

                <div className="px-4 py-2 bg-[#0f2d59] group-hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 w-fit mt-2">
                  <span>Ask Mahi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Decorative Marathi Slogan Watermark */}
              <div className="pt-3 border-t border-blue-100/60 mt-3 flex justify-end">
                <span className="text-[11px] font-bold text-amber-700 italic tracking-wide">
                  &ldquo; प्रश्न विचारा, उत्तरे मिळवा ! &rdquo;
                </span>
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
      {/* SUCCESS STORIES SECTION (#success-stories)                     */}
      {/* ============================================================== */}
      <section id="success-stories" className="py-12 lg:py-16 bg-slate-50/70 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Statewide Public Procurement Success
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Government Innovation Success Stories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Validated startup pilots that transitioned into direct procurement orders and statewide replication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                dept: 'Nashik Municipal Corporation',
                title: 'Automated IoT Canal Leakage & Pressure Sensing',
                startup: 'AquaSense Labs (DPIIT Reg)',
                score: '92.4%',
                badge: 'Scaled Statewide',
                badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                metric: '34% Water Loss Cut',
                desc: 'Deployed real-time acoustic sensors across 42km distribution lines, saving 18 MLD potable water in trial sector.',
                po: 'PO-NMC-2025-081',
              },
              {
                dept: 'Public Health Dept (Gadchiroli & Amravati)',
                title: 'Portable AI Retinal Screening in Tribal PHCs',
                startup: 'NetraVision Health (DPIIT Reg)',
                score: '94.8%',
                badge: 'Direct PO Issued',
                badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
                metric: '12,400+ Screenings',
                desc: 'Offline-first smartphone fundus camera deployed at 18 remote PHCs with 98.2% diagnostic concordance.',
                po: 'PO-PHD-2025-144',
              },
              {
                dept: 'Pune Smart City (PSCDCL)',
                title: 'Adaptive AI Corridor Signal Optimization',
                startup: 'UrbanSync Mobility (DPIIT Reg)',
                score: '89.6%',
                badge: 'Pilot Validated',
                badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
                metric: '22% Congestion Cut',
                desc: 'Computer vision camera loop tuning signal cycles dynamically, cutting peak transit wait on 6 high-density junctions.',
                po: 'PO-PSC-2026-029',
              },
            ].map((story, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-500 truncate flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{story.dept}</span>
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shrink-0 ${story.badgeColor}`}>
                      {story.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{story.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{story.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Evaluator Score:</span>
                    <span className="font-extrabold text-emerald-600">{story.score}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Key Outcome:</span>
                    <span className="font-bold text-slate-900">{story.metric}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-50">
                    <span>{story.startup}</span>
                    <span className="font-mono text-[10px] text-blue-600 font-semibold">{story.po}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
