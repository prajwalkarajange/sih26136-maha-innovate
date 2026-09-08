import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../context/WorkflowContext';
import { useMahi } from '../context/MahiContext';
import { MahiPill } from '../components/MahiPill';
import {
  ShoppingBag,
  FileCheck,
  CheckCircle2,
  Building2,
  Calendar,
  IndianRupee,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const Page15_ProcurementPage: React.FC = () => {
  const navigate = useNavigate();
  const { procurement, approveProcurement } = useWorkflow();
  const { askMahiContext } = useMahi();
  const [loading, setLoading] = useState(false);
  const [poGenerated, setPoGenerated] = useState(false);

  // Exact values matching Reference Image Panel 15
  const startup = 'GreenTech Innovations';
  const solution = 'Smart Waste Management';
  const pilotScore = '90.1%';
  const approvedBudget = '₹25,00,000';
  const procurementType = 'Direct / Approved Mechanism';
  const contractDuration = '2 Years';

  const handleGeneratePO = () => {
    setPoGenerated(true);
    alert('Purchase Order PO-MAHA-2026-0042 generated successfully!');
  };

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approveProcurement();
      navigate('/contract-tracking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header matching Reference Image */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 w-fit mb-1">
            <span>Government Procurement Mechanism (Policy ID 26136)</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">
            Procurement Details
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct public procurement authorization following successful 90.1% validated pilot.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Authorized Direct Route
        </span>
      </div>

      {poGenerated && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Purchase Order <strong>PO-MAHA-2026-0042</strong> generated and dispatched for contract execution.</span>
        </div>
      )}

      {/* Procurement Details Card matching Reference Image */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-6 space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3 pb-3 border-b border-slate-100">
          <span className="sm:col-span-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
            Startup
          </span>
          <div className="sm:col-span-8 font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>{startup}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3 pb-3 border-b border-slate-100">
          <span className="sm:col-span-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
            Solution
          </span>
          <div className="sm:col-span-8 font-semibold text-slate-800">
            {solution}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3 pb-3 border-b border-slate-100">
          <span className="sm:col-span-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
            Pilot Score
          </span>
          <div className="sm:col-span-8 font-black text-emerald-600 text-sm">
            {pilotScore}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3 pb-3 border-b border-slate-100">
          <span className="sm:col-span-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
            Approved Budget
          </span>
          <div className="sm:col-span-8 font-black text-blue-700 text-sm">
            {approvedBudget}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3 pb-3 border-b border-slate-100">
          <span className="sm:col-span-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
            Procurement Type
          </span>
          <div className="sm:col-span-8 font-semibold text-slate-800">
            {procurementType}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-3 pb-1">
          <span className="sm:col-span-4 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
            Contract Duration
          </span>
          <div className="sm:col-span-8 font-semibold text-slate-800">
            {contractDuration}
          </div>
        </div>

        {/* Action Buttons matching Reference Image */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button
            onClick={handleGeneratePO}
            className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>Generate Purchase Order</span>
          </button>

          <button
            onClick={handleApprove}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{loading ? 'Approving...' : 'Approve Procurement'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Mahi Pill matching Reference Image */}
      <MahiPill
        label="Ask Mahi about procurement process or documents"
        contextPage="procurement"
        customPrompt="Explain the legal direct procurement exemption under Maharashtra Startup Policy 26136"
      />
    </div>
  );
};
