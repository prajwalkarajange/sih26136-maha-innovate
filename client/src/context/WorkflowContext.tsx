import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Challenge,
  AIRequirementAnalysis,
  StartupMatch,
  Proposal,
  Evaluation,
  Pilot,
  Procurement,
  PaymentItem,
  ScalingItem,
  Startup
} from '../types';
import { api } from '../services/api';

interface WorkflowContextType {
  challenges: Challenge[];
  activeChallenge: Challenge | null;
  setActiveChallengeId: (id: number) => void;
  aiAnalysis: AIRequirementAnalysis | null;
  runAnalysisForActiveChallenge: () => Promise<AIRequirementAnalysis>;
  matches: StartupMatch[];
  toggleShortlist: (startupId: number) => Promise<void>;
  startups: Startup[];
  proposals: Proposal[];
  activeProposal: Proposal | null;
  submitProposal: (data: Partial<Proposal>) => Promise<Proposal>;
  evaluation: Evaluation | null;
  saveEvaluation: (data: Partial<Evaluation>) => Promise<Evaluation>;
  pilot: Pilot | null;
  createPilot: (data: Partial<Pilot>) => Promise<Pilot>;
  procurement: Procurement | null;
  approveProcurement: () => Promise<Procurement>;
  payments: PaymentItem[];
  updatePaymentStatus: (id: number, status: PaymentItem['status']) => Promise<void>;
  scaling: ScalingItem[];
  updateScalingStatus: (id: number, status: ScalingItem['status']) => Promise<void>;
  refreshAll: () => Promise<void>;
  resetDemoData: () => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallengeId, setActiveChallengeIdState] = useState<number>(1);
  const [aiAnalysis, setAiAnalysis] = useState<AIRequirementAnalysis | null>(null);
  const [matches, setMatches] = useState<StartupMatch[]>([]);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [activeProposalId, setActiveProposalId] = useState<number>(1);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const [procurement, setProcurement] = useState<Procurement | null>(null);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [scaling, setScaling] = useState<ScalingItem[]>([]);

  const refreshAll = async () => {
    const chList = await api.getChallenges();
    setChallenges(chList);

    const stList = await api.getStartups();
    setStartups(stList);

    const analysis = await api.getAIAnalysis(activeChallengeId);
    setAiAnalysis(analysis);

    const matchList = await api.getMatches(activeChallengeId);
    setMatches(matchList);

    const propList = await api.getProposals();
    setProposals(propList);

    const evalData = await api.getEvaluation(activeProposalId);
    setEvaluation(evalData);

    const pilotData = await api.getPilot(1);
    setPilot(pilotData);

    const procData = await api.getProcurement(1);
    setProcurement(procData);

    const payList = await api.getPayments();
    setPayments(payList);

    const scaleList = await api.getScalingRecommendations();
    setScaling(scaleList);
  };

  useEffect(() => {
    refreshAll();
  }, [activeChallengeId]);

  const setActiveChallengeId = (id: number) => {
    setActiveChallengeIdState(id);
  };

  const activeChallenge = challenges.find(c => c.id === activeChallengeId) || challenges[0] || null;
  const activeProposal = proposals.find(p => p.id === activeProposalId) || proposals[0] || null;

  const runAnalysisForActiveChallenge = async () => {
    const res = await api.runAIAnalysis(activeChallengeId);
    setAiAnalysis(res);
    const updatedMatches = await api.getMatches(activeChallengeId);
    setMatches(updatedMatches);
    return res;
  };

  const toggleShortlist = async (startupId: number) => {
    await api.toggleShortlist(startupId, activeChallengeId);
    const updated = await api.getMatches(activeChallengeId);
    setMatches(updated);
  };

  const submitProposal = async (data: Partial<Proposal>) => {
    const res = await api.submitProposal({ ...data, challenge_id: activeChallengeId });
    setProposals(prev => [res, ...prev]);
    setActiveProposalId(res.id);
    return res;
  };

  const saveEvaluation = async (data: Partial<Evaluation>) => {
    const res = await api.saveEvaluation({ ...data, proposal_id: activeProposalId });
    setEvaluation(res);
    return res;
  };

  const createPilot = async (data: Partial<Pilot>) => {
    const res = await api.createPilot(data);
    setPilot(res);
    return res;
  };

  const approveProcurement = async () => {
    const res = await api.approveProcurement(1);
    setProcurement(res);
    return res;
  };

  const updatePaymentStatus = async (id: number, status: PaymentItem['status']) => {
    await api.updatePaymentStatus(id, status);
    const updated = await api.getPayments();
    setPayments(updated);
  };

  const updateScalingStatus = async (id: number, status: ScalingItem['status']) => {
    await api.updateScalingStatus(id, status);
    const updated = await api.getScalingRecommendations();
    setScaling(updated);
  };

  const resetDemoData = () => {
    localStorage.removeItem('mahinnovate_state_v1');
    window.location.reload();
  };

  return (
    <WorkflowContext.Provider
      value={{
        challenges,
        activeChallenge,
        setActiveChallengeId,
        aiAnalysis,
        runAnalysisForActiveChallenge,
        matches,
        toggleShortlist,
        startups,
        proposals,
        activeProposal,
        submitProposal,
        evaluation,
        saveEvaluation,
        pilot,
        createPilot,
        procurement,
        approveProcurement,
        payments,
        updatePaymentStatus,
        scaling,
        updateScalingStatus,
        refreshAll,
        resetDemoData,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) throw new Error('useWorkflow must be used within a WorkflowProvider');
  return context;
};
