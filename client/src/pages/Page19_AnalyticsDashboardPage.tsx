import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MahiPill } from '../components/MahiPill';
import {
  Users,
  Target,
  FileText,
  Rocket,
  Award,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Download
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const Page19_AnalyticsDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Metrics matching exact numbers in Reference Image Panel 19
  const stats = [
    { label: 'Registered Startups', value: '1,250', icon: Users, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Challenges', value: '85', icon: Target, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Proposals', value: '420', icon: FileText, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { label: 'Active Pilots', value: '32', icon: Rocket, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { label: 'Successful Pilots', value: '21', icon: Award, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { label: 'Scaled Solutions', value: '8', icon: TrendingUp, color: 'text-emerald-700 bg-emerald-100 border-emerald-200' },
  ];

  // Bar chart data matching Reference Image (Department-wise Procurement)
  const departmentData = [
    { department: 'Pune', value: 45 },
    { department: 'Nashik', value: 28 },
    { department: 'Nagpur', value: 32 },
    { department: 'Thane', value: 38 },
    { department: 'Aurangabad', value: 20 },
  ];

  // Technology Categories pie/donut data matching Reference Image
  const techData = [
    { name: 'AI / ML', value: 35, color: '#3b82f6' },
    { name: 'IoT', value: 25, color: '#06b6d4' },
    { name: 'Healthcare', value: 15, color: '#f59e0b' },
    { name: 'CleanTech', value: 15, color: '#10b981' },
    { name: 'Others', value: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 w-fit mb-1">
            <span>State Innovation Insights & Impact</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Analytics Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time public procurement metrics and startup performance across Maharashtra.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting comprehensive statewide analytics report (PDF)...')}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics Dossier</span>
        </button>
      </div>

      {/* 6 Top Stat Cards matching Reference Image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs text-center"
            >
              <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-1.5 border ${s.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xl font-black text-slate-900">{s.value}</div>
              <div className="text-[10px] font-semibold text-slate-500 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid matching Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Department-wise Procurement Bar Chart matching Reference Image */}
        <div className="md:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Department-wise Procurement (₹ Lakhs)</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">FY 2026-27</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="department" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip
                  formatter={(value: any) => [`₹${value} Lakhs`, 'Procurement Volume']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Technology Categories Donut Chart matching Reference Image */}
        <div className="md:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <PieIcon className="w-4 h-4 text-emerald-600" />
              <span>Technology Categories</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Distribution</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={techData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {techData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconSize={8}
                  wrapperStyle={{ fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi to generate custom reports"
        contextPage="analytics"
        customPrompt="Generate a comparative analytics report on CleanTech vs MedTech pilot success rates"
      />
    </div>
  );
};
