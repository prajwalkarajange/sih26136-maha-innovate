import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Award,
  CheckCircle2,
  Rocket,
  ShoppingBag,
  TrendingUp,
  FileCheck2,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
          <span>Government Problem Statement ID 26136</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
          Startup Friendly Public Procurement Mechanism
        </h1>

        <blockquote className="border-l-4 border-blue-600 pl-4 py-1 text-slate-700 italic text-sm leading-relaxed bg-slate-50 rounded-r-lg">
          "A startup-friendly public procurement mechanism that enables government departments to identify, pilot, procure, and scale innovative solutions from eligible startups."
        </blockquote>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Traditionally, public procurement rules (such as minimum annual turnover, prior 3-year government experience, and substantial Earnest Money Deposits) disqualify early-stage innovative startups from bidding for state contracts. 
          <strong> MahInnovate</strong> resolves this systemic bottleneck for the Government of Maharashtra through an outcome-driven, pilot-validated procurement pathway.
        </p>
      </div>

      {/* 4 Pillars of the Mechanism */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Outcome-Based Identification</h3>
          <p className="text-slate-600 leading-relaxed">
            Departments post civic challenges defined by desired outcomes rather than prescriptive technical specifications. AI analyzes the requirement and extracts structured KPIs.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Controlled 90-Day Pilot Sandbox</h3>
          <p className="text-slate-600 leading-relaxed">
            Selected startups deploy a controlled field pilot (e.g. 10 smart waste pods in Pune) with milestone-based grant funding and structured telemetry verification.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Direct Procurement Exemption</h3>
          <p className="text-slate-600 leading-relaxed">
            If independent evaluation validates that the pilot achieved <strong>&gt; 85%</strong> of its KPI benchmarks, the solution is legally eligible for direct procurement without open retendering.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            4
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Rapid Statewide Scaling</h3>
          <p className="text-slate-600 leading-relaxed">
            AI recommends the proven solution to other municipal corporations facing similar civic problems (e.g., Nashik, Nagpur, Thane) for streamlined scale-up.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div>
          <h3 className="text-base font-bold">Experience the MahInnovate Platform</h3>
          <p className="text-xs text-blue-100 mt-1">
            Test the workflow with pre-configured Government Officer, Startup, Evaluator, and Admin roles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/ai-analysis"
            className="px-4 py-2 bg-white text-blue-800 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-100 transition cursor-pointer"
          >
            Try AI Analysis
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-800 text-white border border-blue-400 rounded-lg text-xs font-bold hover:bg-blue-900 transition cursor-pointer"
          >
            Login with Test Accounts
          </Link>
        </div>
      </div>
    </div>
  );
};
