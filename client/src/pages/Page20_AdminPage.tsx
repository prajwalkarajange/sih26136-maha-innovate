import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  Shield,
  Users,
  Award,
  Building2,
  Target,
  CheckCircle2,
  Clock,
  Search,
  Lock,
  FileCheck2,
  Settings,
  ArrowRight
} from 'lucide-react';

export const Page20_AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { startups } = useWorkflow();
  const { askMahiContext } = useMahi();

  const [activeTab, setActiveTab] = useState<'overview' | 'startups' | 'audit' | 'settings'>('overview');

  // Exact stats matching Reference Image Panel 20
  const adminStats = [
    { label: 'Total Users', value: '1,250', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Startups', value: '650', icon: Award, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Departments', value: '85', icon: Building2, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Challenges', value: '420', icon: Target, color: 'text-amber-600 bg-amber-50' },
  ];

  const recentActivities = [
    { text: 'New startup registered (CleanCity Solutions)', time: '2 hours ago', iconColor: 'text-emerald-600' },
    { text: 'Challenge published (Rural Healthcare Solution)', time: '5 hours ago', iconColor: 'text-blue-600' },
    { text: 'User verified (GreenTech Innovations DPIIT status)', time: '19 hours ago', iconColor: 'text-emerald-600' },
    { text: 'Procurement approved (Smart Waste Management contract)', time: '1 day ago', iconColor: 'text-blue-600' },
  ];

  const auditLogs = [
    { id: 'LOG-8821', user: 'officer@maharashtra.gov.in', action: 'PROCUREMENT_APPROVED', entity: 'PO-MAHA-2026-0042', ip: '10.0.12.44', time: '1 day ago' },
    { id: 'LOG-8820', user: 'evaluator@maha.gov.in', action: 'PROPOSAL_EVALUATED', entity: 'Proposal #1 (91.2)', ip: '10.0.14.88', time: '1 day ago' },
    { id: 'LOG-8819', user: 'greentech@startup.in', action: 'PROPOSAL_SUBMITTED', entity: 'Solution #1', ip: '114.143.120.12', time: '2 days ago' },
    { id: 'LOG-8818', user: 'officer@maharashtra.gov.in', action: 'CHALLENGE_PUBLISHED', entity: 'Challenge #1', ip: '10.0.12.44', time: '3 days ago' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 w-fit mb-1">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> System Administration & Governance</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full platform administration, DPIIT verification queues, and immutable audit logs.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded transition ${activeTab === 'overview' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded transition ${activeTab === 'audit' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
          >
            Audit Logs
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded transition ${activeTab === 'settings' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* 4 Quick Stat Cards matching Reference Image Panel 20 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {adminStats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-slate-900">{s.value}</div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">{s.label}</div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities matching Reference Image */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Recent Activities</span>
          </h3>

          <div className="space-y-3 text-xs">
            {recentActivities.map((act, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className={`w-4 h-4 ${act.iconColor}`} />
                  <span className="text-slate-800">{act.text}</span>
                </div>
                <span className="text-[11px] text-slate-400">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Logs Table */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Immutable Audit Trail</h3>
            <span className="text-[11px] text-slate-500">Every sensitive action is permanently logged</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Log ID</th>
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Entity</th>
                  <th className="py-2.5 px-3">IP Address</th>
                  <th className="py-2.5 px-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-blue-700">{log.id}</td>
                    <td className="py-2.5 px-3 text-slate-800">{log.user}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{log.entity}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">{log.ip}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* System Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900">Platform Governance Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-bold text-slate-900">Direct Procurement Score Threshold</div>
                <div className="text-slate-500 text-[11px]">Minimum validated pilot score required for direct procurement without open tendering</div>
              </div>
              <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">85.0%</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-bold text-slate-900">DPIIT Verification Enforcement</div>
                <div className="text-slate-500 text-[11px]">Require mandatory DPIIT recognition certificate for government challenge applications</div>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">ENABLED</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-bold text-slate-900">Mahi AI Assistant Auto-Guidance</div>
                <div className="text-slate-500 text-[11px]">Enable proactive guidance and pre-flight proposal validation across all 20 pages</div>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi to manage users, rules or system settings"
        contextPage="admin"
        customPrompt="Explain administrative controls, role-based permissions, and audit log compliance"
      />
    </div>
  );
};
