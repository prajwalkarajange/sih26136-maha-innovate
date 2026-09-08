import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Circle,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  Upload
} from 'lucide-react';

export const Page16_ContractPaymentTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const { payments, updatePaymentStatus } = useWorkflow();
  const { askMahiContext } = useMahi();

  // Vertical timeline stages matching Reference Image Panel 16
  const timelineStages = [
    { title: 'Procurement Approved', date: '12 Oct 2026', status: 'COMPLETED' },
    { title: 'Purchase Order Generated', date: '15 Oct 2026', status: 'COMPLETED' },
    { title: 'Contract Signed', date: '19 Oct 2026', status: 'COMPLETED' },
    { title: 'Payment Processing', date: 'In Progress', status: 'IN_PROGRESS' },
    { title: 'Deployment', date: 'Pending', status: 'PENDING' },
  ];

  // Documents matching Reference Image
  const documents = [
    { name: 'Purchase Order.pdf', type: 'PO', date: '15 Oct 2026' },
    { name: 'Contract.pdf', type: 'Contract', date: '19 Oct 2026' },
    { name: 'Invoice.pdf', type: 'Invoice', date: '18 Nov 2026' },
    { name: 'Payment Receipt.pdf', type: 'Receipt', date: '20 Dec 2026' },
  ];

  const handleDownload = (docName: string) => {
    alert(`Downloading verified procurement document: ${docName}`);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 w-fit mb-1">
            <span>Contract Management & Milestone Disbursements</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Contract & Payment Tracking Page
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time tracking of purchase orders, signed state agreements, and milestone invoices.
          </p>
        </div>

        <button
          onClick={() => navigate('/scaling-recommendation')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>View Scaling Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid: Procurement Status Timeline & Documents matching Reference Image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Column: Procurement Status Timeline matching Reference Image */}
        <div className="md:col-span-6 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Procurement Status
          </h3>

          <div className="space-y-4">
            {timelineStages.map((stage, idx) => (
              <div key={idx} className="flex items-start gap-3 relative">
                {/* Vertical connecting line */}
                {idx < timelineStages.length - 1 && (
                  <div className="absolute left-2.5 top-5 w-0.5 h-8 bg-slate-200" />
                )}

                {/* Stage Icon */}
                <div className="relative z-10">
                  {stage.status === 'COMPLETED' ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  ) : stage.status === 'IN_PROGRESS' ? (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center ring-4 ring-blue-100">
                      <Clock className="w-3 h-3 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                      <Circle className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{stage.title}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        stage.status === 'COMPLETED'
                          ? 'text-emerald-700 bg-emerald-50'
                          : stage.status === 'IN_PROGRESS'
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      {stage.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Documents List matching Reference Image */}
        <div className="md:col-span-6 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Documents
          </h3>

          <div className="space-y-2.5">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{doc.name}</div>
                    <div className="text-[10px] text-slate-400">{doc.date}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(doc.name)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-blue-600 border border-slate-300 rounded font-semibold text-xs flex items-center gap-1 transition shadow-2xs"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestone Payments Breakdown Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 text-sm">
          Milestone Payments (Total: ₹5,00,000)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3">Milestone</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{p.milestone_name}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">₹{p.amount_inr.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'APPROVED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {p.status === 'APPROVED' && (
                      <button
                        onClick={() => updatePaymentStatus(p.id, 'PAID')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold shadow-2xs transition"
                      >
                        Release Payment
                      </button>
                    )}
                    {p.status === 'PAID' && (
                      <span className="text-[11px] text-emerald-700 font-semibold">Processed ✓</span>
                    )}
                    {p.status === 'UNDER_REVIEW' && (
                      <button
                        onClick={() => updatePaymentStatus(p.id, 'APPROVED')}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold shadow-2xs transition"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi about payment status or upload documents"
        contextPage="contract_tracking"
        customPrompt="What is the current status of milestone payments and required invoice submissions?"
      />
    </div>
  );
};
