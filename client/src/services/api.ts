import {
  User,
  Startup,
  Challenge,
  AIRequirementAnalysis,
  StartupMatch,
  Proposal,
  Evaluation,
  ComparisonRow,
  Pilot,
  Procurement,
  PaymentItem,
  ScalingItem,
  AuditLog,
  Notification
} from '../types';
import {
  initialUsers,
  initialStartups,
  initialChallenges,
  initialAIAnalysis,
  initialMatches,
  initialProposals,
  initialEvaluation,
  initialPilot,
  initialProcurement,
  initialPayments,
  initialScaling,
  initialAuditLogs
} from './mockData';

// Local storage state keys for instant interactive persistence
const STORAGE_KEY = 'mahinnovate_state_v1';

interface StateSchema {
  users: User[];
  startups: Startup[];
  challenges: Challenge[];
  aiAnalyses: Record<number, AIRequirementAnalysis>;
  matches: Record<number, StartupMatch[]>;
  proposals: Proposal[];
  evaluations: Record<number, Evaluation>;
  pilots: Pilot[];
  procurements: Procurement[];
  payments: PaymentItem[];
  scaling: ScalingItem[];
  auditLogs: AuditLog[];
  notifications: Notification[];
}

function loadState(): StateSchema {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Using fresh mock state');
  }

  const initial: StateSchema = {
    users: initialUsers,
    startups: initialStartups,
    challenges: initialChallenges,
    aiAnalyses: { 1: initialAIAnalysis },
    matches: { 1: initialMatches },
    proposals: initialProposals,
    evaluations: { 1: initialEvaluation },
    pilots: [initialPilot],
    procurements: [initialProcurement],
    payments: initialPayments,
    scaling: initialScaling,
    auditLogs: initialAuditLogs,
    notifications: [
      { id: 1, user_id: 1, title: 'New Proposal Received', message: 'GreenTech Innovations submitted for Smart Waste Management', type: 'PROPOSAL', is_read: false, created_at: '2 hours ago' },
      { id: 2, user_id: 1, title: 'Pilot Milestone Completed', message: 'Testing stage active with 93% accuracy', type: 'PILOT', is_read: false, created_at: '5 hours ago' }
    ]
  };
  saveState(initial);
  return initial;
}

function saveState(state: StateSchema) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // quota exceeded or SSR
  }
}

let currentState = loadState();

export const api = {
  // 1. Auth & Users
  login: async (email: string, role?: string): Promise<{ user: User; token: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // fallback
    }

    const matched = currentState.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() || (role && u.role === role)
    ) || currentState.users[0];

    return {
      user: matched,
      token: `demo-token-${matched.id}-${Date.now()}`
    };
  },

  switchRole: async (role: string): Promise<User> => {
    const user = currentState.users.find(u => u.role === role) || currentState.users[0];
    return user;
  },

  // 2. Challenges
  getChallenges: async (filters?: { search?: string; status?: string }): Promise<Challenge[]> => {
    try {
      const query = new URLSearchParams(filters as any).toString();
      const res = await fetch(`/api/challenges?${query}`);
      if (res.ok) return await res.json();
    } catch (e) {}

    let list = [...currentState.challenges];
    if (filters?.status) {
      list = list.filter(c => c.status === filters.status);
    }
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(s) || c.problem_description.toLowerCase().includes(s));
    }
    return list;
  },

  getChallenge: async (id: number): Promise<Challenge | undefined> => {
    try {
      const res = await fetch(`/api/challenges/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {}

    return currentState.challenges.find(c => c.id === Number(id));
  },

  createChallenge: async (data: Partial<Challenge>): Promise<Challenge> => {
    try {
      const res = await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const newChallenge: Challenge = {
      id: Date.now(),
      department_id: 1,
      department_name: 'Dept. of Urban Development',
      department_code: 'UDD',
      title: data.title || 'Untitled Challenge',
      problem_description: data.problem_description || '',
      required_technologies: data.required_technologies || ['AI', 'IoT'],
      budget_inr: Number(data.budget_inr) || 1000000,
      expected_duration: data.expected_duration || '3 Months',
      location: data.location || 'Pune',
      eligibility_criteria: data.eligibility_criteria || 'DPIIT recognized startup',
      required_deliverables: data.required_deliverables || 'Working Prototype and Pilot Report',
      status: (data.status as any) || 'DRAFT',
      deadline: data.deadline || '2026-12-31',
      views_count: 1,
      created_at: new Date().toISOString()
    };

    currentState.challenges.unshift(newChallenge);
    currentState.auditLogs.unshift({
      id: Date.now(),
      user_id: 1,
      action: 'CHALLENGE_CREATED',
      entity_type: 'CHALLENGE',
      entity_id: String(newChallenge.id),
      details: `Created challenge: ${newChallenge.title}`,
      ip_address: '127.0.0.1',
      created_at: 'Just now'
    });
    saveState(currentState);
    return newChallenge;
  },

  updateChallengeStatus: async (id: number, status: Challenge['status']): Promise<Challenge> => {
    try {
      const res = await fetch(`/api/challenges/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const ch = currentState.challenges.find(c => c.id === Number(id));
    if (ch) {
      ch.status = status;
      currentState.auditLogs.unshift({
        id: Date.now(),
        user_id: 1,
        action: 'CHALLENGE_STATUS_UPDATED',
        entity_type: 'CHALLENGE',
        entity_id: String(id),
        details: `Updated status to ${status}`,
        ip_address: '127.0.0.1',
        created_at: 'Just now'
      });
      saveState(currentState);
    }
    return ch!;
  },

  // 3. AI Analysis
  getAIAnalysis: async (challengeId: number): Promise<AIRequirementAnalysis> => {
    return currentState.aiAnalyses[challengeId] || initialAIAnalysis;
  },

  runAIAnalysis: async (challengeId: number): Promise<AIRequirementAnalysis> => {
    try {
      const res = await fetch(`/api/challenges/${challengeId}/analyze`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch (e) {}

    const ch = currentState.challenges.find(c => c.id === Number(challengeId));
    const analysis: AIRequirementAnalysis = {
      challenge_id: challengeId,
      domain: ch?.title.includes('Health') ? 'Public Health' : 'Waste Management',
      technologies: ch?.required_technologies || ['Computer Vision', 'Machine Learning', 'IoT'],
      functional_requirements: [
        'Automated detection and classification',
        'IoT sensor telemetry and fill alerts',
        'Administrative dashboard integration'
      ],
      non_functional_requirements: [
        'Weatherproof IP67 enclosure',
        'Sub-second inference time (< 1.5s)'
      ],
      key_requirements: ['Real-time', 'Scalable', 'Low Cost'],
      expected_solution: 'Automated waste classification and segregation mechanism',
      potential_impact: 'Cleaner cities, reduced landfill waste by 40%',
      suggested_kpis: {
        accuracy: '> 90%',
        response_time: '< 2 sec',
        cost_reduction: '> 15%',
        user_satisfaction: '> 80%'
      },
      potential_risks: [
        'Camera occlusion from dirt or dust',
        'Intermittent cellular network in dense wards'
      ],
      suggested_eligibility: [
        'DPIIT Registered Startup',
        'Proven IoT or Computer Vision PoC'
      ],
      suggested_deliverables: [
        'Prototype deployment in 5 municipal ward bins',
        'Real-time municipal telemetry portal'
      ]
    };

    currentState.aiAnalyses[challengeId] = analysis;
    saveState(currentState);
    return analysis;
  },

  // 4. Startup Matches
  getMatches: async (challengeId: number): Promise<StartupMatch[]> => {
    try {
      const res = await fetch(`/api/challenges/${challengeId}/matches`);
      if (res.ok) return await res.json();
    } catch (e) {}

    return currentState.matches[challengeId] || initialMatches;
  },

  toggleShortlist: async (startupId: number, challengeId: number = 1): Promise<boolean> => {
    const list = currentState.matches[challengeId] || initialMatches;
    const match = list.find(m => m.startup_id === startupId);
    if (match) {
      match.is_shortlisted = !match.is_shortlisted;
      currentState.matches[challengeId] = list;
      saveState(currentState);
      return match.is_shortlisted;
    }
    return false;
  },

  // 5. Startups
  getStartups: async (): Promise<Startup[]> => {
    return currentState.startups;
  },

  getStartup: async (id: number): Promise<Startup | undefined> => {
    return currentState.startups.find(s => s.id === Number(id)) || currentState.startups[0];
  },

  // 6. Proposals & Evaluations
  getProposals: async (challengeId?: number): Promise<Proposal[]> => {
    if (challengeId) {
      return currentState.proposals.filter(p => p.challenge_id === Number(challengeId));
    }
    return currentState.proposals;
  },

  getProposal: async (id: number): Promise<Proposal | undefined> => {
    return currentState.proposals.find(p => p.id === Number(id)) || currentState.proposals[0];
  },

  submitProposal: async (data: Partial<Proposal>): Promise<Proposal> => {
    const newProp: Proposal = {
      id: Date.now(),
      challenge_id: Number(data.challenge_id) || 1,
      challenge_title: 'Smart Waste Management',
      department_name: 'Dept. of Urban Development',
      startup_id: 1,
      company_name: 'GreenTech Innovations',
      solution_name: data.solution_name || 'Smart Bin & Automated Segregation AI System',
      solution_description: data.solution_description || 'High-throughput AI computer vision system.',
      technology_used: data.technology_used || ['AI', 'IoT', 'Computer Vision'],
      implementation_plan: data.implementation_plan || 'Phase 1: Hardware sensor calibration; Phase 2: Pilot bin installation.',
      estimated_cost_inr: Number(data.estimated_cost_inr) || 500000,
      duration: data.duration || '3 Months',
      previous_experience: data.previous_experience || 'Deployed 50 smart bins with PMC with 92% classification accuracy.',
      proposal_pdf_url: data.proposal_pdf_url || '/documents/proposal.pdf',
      certifications_url: data.certifications_url || '/documents/iso9001.pdf',
      status: 'SUBMITTED',
      submitted_at: new Date().toISOString().split('T')[0]
    };

    currentState.proposals.unshift(newProp);
    currentState.notifications.unshift({
      id: Date.now(),
      user_id: 1,
      title: 'New Proposal Received',
      message: `GreenTech Innovations submitted proposal "${newProp.solution_name}"`,
      type: 'PROPOSAL',
      is_read: false,
      created_at: 'Just now'
    });
    currentState.auditLogs.unshift({
      id: Date.now(),
      user_id: 2,
      action: 'PROPOSAL_SUBMITTED',
      entity_type: 'PROPOSAL',
      entity_id: String(newProp.id),
      details: `Submitted proposal: ${newProp.solution_name}`,
      ip_address: '127.0.0.1',
      created_at: 'Just now'
    });
    saveState(currentState);
    return newProp;
  },

  getEvaluation: async (proposalId: number): Promise<Evaluation> => {
    return currentState.evaluations[proposalId] || initialEvaluation;
  },

  saveEvaluation: async (data: Partial<Evaluation> & { proposal_id: number }): Promise<Evaluation> => {
    const overall = Number(
      (
        (data.technical_feasibility || 90) * 0.2 +
        (data.innovation || 95) * 0.2 +
        (data.cost_effectiveness || 85) * 0.15 +
        (data.scalability || 92) * 0.15 +
        (data.experience || 88) * 0.1 +
        (data.implementation || 86) * 0.1 +
        (data.security_compliance || 84) * 0.1
      ).toFixed(1)
    );

    const evaluation: Evaluation = {
      id: Date.now(),
      proposal_id: data.proposal_id,
      evaluator_id: 3,
      technical_feasibility: data.technical_feasibility || 90,
      innovation: data.innovation || 95,
      cost_effectiveness: data.cost_effectiveness || 85,
      scalability: data.scalability || 92,
      experience: data.experience || 88,
      implementation: data.implementation || 86,
      security_compliance: data.security_compliance || 84,
      overall_score: overall,
      decision: data.decision || 'APPROVED_FOR_PILOT',
      remarks: data.remarks || 'Evaluated and approved for pilot.'
    };

    currentState.evaluations[data.proposal_id] = evaluation;

    const prop = currentState.proposals.find(p => p.id === data.proposal_id);
    if (prop) {
      prop.status = data.decision === 'APPROVED_FOR_PILOT' ? 'APPROVED_FOR_PILOT' : 'UNDER_EVALUATION';
    }

    currentState.auditLogs.unshift({
      id: Date.now(),
      user_id: 3,
      action: 'PROPOSAL_EVALUATED',
      entity_type: 'EVALUATION',
      entity_id: String(data.proposal_id),
      details: `Evaluated proposal with score ${overall}/100. Decision: ${data.decision}`,
      ip_address: '127.0.0.1',
      created_at: 'Just now'
    });

    saveState(currentState);
    return evaluation;
  },

  getComparisonMatrix: async (): Promise<ComparisonRow[]> => {
    return [
      { parameter: 'AI Match', startupA: '94%', startupB: '89%', startupC: '82%' },
      { parameter: 'Technical', startupA: 90, startupB: 86, startupC: 80 },
      { parameter: 'Innovation', startupA: 95, startupB: 88, startupC: 85 },
      { parameter: 'Cost', startupA: 85, startupB: 92, startupC: 88 },
      { parameter: 'Experience', startupA: 88, startupB: 82, startupC: 90 },
      { parameter: 'Scalability', startupA: 92, startupB: 85, startupC: 81 },
      { parameter: 'Overall Score', startupA: 91.2, startupB: 87.1, startupC: 84.6 }
    ];
  },

  // 7. Pilots
  getPilot: async (id: number = 1): Promise<Pilot> => {
    return currentState.pilots.find(p => p.id === Number(id)) || currentState.pilots[0];
  },

  createPilot: async (data: Partial<Pilot>): Promise<Pilot> => {
    const newPilot: Pilot = {
      id: Date.now(),
      challenge_id: 1,
      challenge_title: 'Smart Waste Management',
      startup_id: 1,
      company_name: 'GreenTech Innovations',
      project_name: 'Smart Waste Management - Pune Pilot',
      location: data.location || 'Pune',
      duration: data.duration || '3 Months',
      budget_inr: Number(data.budget_inr) || 500000,
      status: 'ONGOING',
      overall_completion: 78,
      kpis: [
        { id: 1, kpi_name: 'Accuracy', target_condition: '> 90%', current_value: '93%', unit: '%', is_achieved: true },
        { id: 2, kpi_name: 'Response Time', target_condition: '< 2 sec', current_value: '1.4 sec', unit: 'sec', is_achieved: true },
        { id: 3, kpi_name: 'Cost Reduction', target_condition: '> 15%', current_value: '18%', unit: '%', is_achieved: true },
        { id: 4, kpi_name: 'User Satisfaction', target_condition: '> 80%', current_value: '84%', unit: '%', is_achieved: true }
      ],
      milestones: [
        { id: 1, milestone_number: 1, title: 'Requirement Analysis', description: 'Field survey of Pune Ward 4 & 7', status: 'VERIFIED' },
        { id: 2, milestone_number: 2, title: 'Prototype', description: 'Assembly of 10 test pods', status: 'VERIFIED' },
        { id: 3, milestone_number: 3, title: 'Deployment', description: 'On-site installation', status: 'VERIFIED' },
        { id: 4, milestone_number: 4, title: 'Testing', description: 'Operational testing', status: 'IN_PROGRESS' },
        { id: 5, milestone_number: 5, title: 'Final Evaluation', description: 'Independent validation audit', status: 'PENDING' }
      ]
    };

    currentState.pilots.unshift(newPilot);
    currentState.auditLogs.unshift({
      id: Date.now(),
      user_id: 1,
      action: 'PILOT_CREATED',
      entity_type: 'PILOT',
      entity_id: String(newPilot.id),
      details: `Pilot created for ${newPilot.company_name} in ${newPilot.location}`,
      ip_address: '127.0.0.1',
      created_at: 'Just now'
    });
    saveState(currentState);
    return newPilot;
  },

  // 8. Procurement
  getProcurement: async (id: number = 1): Promise<Procurement> => {
    return currentState.procurements.find(p => p.id === Number(id)) || currentState.procurements[0];
  },

  approveProcurement: async (id: number): Promise<Procurement> => {
    const proc = currentState.procurements.find(p => p.id === Number(id)) || currentState.procurements[0];
    proc.status = 'APPROVED';
    proc.po_number = proc.po_number || 'PO-MAHA-2026-0042';
    proc.po_date = proc.po_date || '15 Oct 2026';
    proc.contract_number = proc.contract_number || 'CT-UDD-2026-889';
    proc.contract_date = proc.contract_date || '19 Oct 2026';

    currentState.auditLogs.unshift({
      id: Date.now(),
      user_id: 1,
      action: 'PROCUREMENT_APPROVED',
      entity_type: 'PROCUREMENT',
      entity_id: String(id),
      details: `Procurement approved for ${proc.solution_name}`,
      ip_address: '127.0.0.1',
      created_at: 'Just now'
    });
    saveState(currentState);
    return proc;
  },

  // 9. Payments & Contracts
  getPayments: async (): Promise<PaymentItem[]> => {
    return currentState.payments;
  },

  updatePaymentStatus: async (id: number, status: PaymentItem['status']): Promise<PaymentItem> => {
    const item = currentState.payments.find(p => p.id === id);
    if (item) {
      item.status = status;
      if (status === 'PAID') {
        item.paid_at = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      }
      saveState(currentState);
    }
    return item!;
  },

  // 10. Scaling
  getScalingRecommendations: async (): Promise<ScalingItem[]> => {
    return currentState.scaling;
  },

  updateScalingStatus: async (id: number, status: ScalingItem['status']): Promise<ScalingItem> => {
    const item = currentState.scaling.find(s => s.id === id);
    if (item) {
      item.status = status;
      saveState(currentState);
    }
    return item!;
  },

  // 11. Notifications & Audit Logs
  getNotifications: async (): Promise<Notification[]> => {
    return currentState.notifications;
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    return currentState.auditLogs;
  },

  // 12. Mahi Assistant
  mahiChat: async (message: string, context: { page: string; role?: string }) => {
    try {
      const res = await fetch('/api/ai/mahi/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context }),
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    // Instant local AI response engine
    const msg = message.toLowerCase();
    const page = context.page;

    let reply = '';
    const suggestedActions: Array<{ label: string; action: string; path?: string }> = [];

    if (msg.includes('waste') || msg.includes('smart waste')) {
      reply = `**Smart Waste Management Challenge Summary:**
- **Department**: Dept. of Urban Development, Maharashtra
- **Budget**: ₹10,00,000 (Pilot) | Procurement: ₹25,00,000
- **Key Technologies**: AI, Computer Vision, IoT
- **Top Matching Startup**: **GreenTech Innovations** (94% match)
- **Status**: Live in Pilot Testing Phase (Pune Ward 4 & 7) with 93% accuracy!`;
      suggestedActions.push({ label: 'View Challenge', action: 'NAVIGATE', path: '/challenges/1' });
      suggestedActions.push({ label: 'View Startup Match', action: 'NAVIGATE', path: '/ai-recommendations?challengeId=1' });
      suggestedActions.push({ label: 'Check Pilot Status', action: 'NAVIGATE', path: '/pilots/1' });
    } else if (msg.includes('register') || msg.includes('how do i register')) {
      reply = `**How to Register as a Startup on MahInnovate:**
1. Click **Register Now** on the login page or navigation bar.
2. Provide your **Company Name**, **DPIIT Registration Number**, and official email.
3. Select your core technologies (AI, IoT, CleanTech, MedTech, etc.).
4. Upload your incorporation certificate and ISO credentials.
5. Admin verification takes 24–48 hours for immediate bidding access!`;
      suggestedActions.push({ label: 'Go to Registration', action: 'NAVIGATE', path: '/login?tab=register' });
    } else if (msg.includes('challenge') && (msg.includes('find') || msg.includes('match') || msg.includes('skill') || msg.includes('ai & iot'))) {
      reply = `**Personalized Challenges Matching AI & IoT:**
I found **3 active Maharashtra Government challenges** matching your capabilities:
1. 🏆 **Smart Waste Management** (Urban Development) — *94% Match* | Budget: ₹10 Lakhs | Deadline: 20 Oct 2026
2. 🩺 **Rural Healthcare Monitoring** (Public Health) — *88% Match* | Budget: ₹15 Lakhs | Deadline: 25 Oct 2026
3. 🚦 **AI Traffic Flow Optimization** (Home & Transport) — *85% Match* | Budget: ₹20 Lakhs | Deadline: 15 Nov 2026`;
      suggestedActions.push({ label: 'Explore Marketplace', action: 'NAVIGATE', path: '/marketplace' });
      suggestedActions.push({ label: 'Submit Proposal for Waste Mgmt', action: 'NAVIGATE', path: '/proposals/submit?challengeId=1' });
    } else if (msg.includes('proposal') && (msg.includes('submit') || msg.includes('guide') || msg.includes('missing'))) {
      reply = `**Mahi's Solution Upload Guidance:**
Let's make sure your proposal is 100% complete:
✓ Solution Name: Descriptive and outcome-oriented
✓ Implementation Plan: Milestone breakdown (Setup → Calibration → Pilot)
✓ Technical Document: Uploaded PDF
✓ Certifications: DPIIT Recognized & ISO 9001 attached
Click below to start or pre-fill your submission!`;
      suggestedActions.push({ label: 'Open Proposal Submission', action: 'NAVIGATE', path: '/proposals/submit?challengeId=1' });
    } else if (msg.includes('evaluation') || msg.includes('criteria') || msg.includes('score')) {
      reply = `**Proposal Evaluation Scorecard Breakdown:**
- **Technical Feasibility**: 90/100
- **Innovation**: 95/100
- **Cost Effectiveness**: 85/100
- **Scalability**: 92/100
- **Experience**: 88/100
- **Implementation**: 86/100
- **Security / Compliance**: 84/100

**Overall Weighted Score: 91.2 / 100 (Approved for Pilot)**`;
      suggestedActions.push({ label: 'View Evaluation Page', action: 'NAVIGATE', path: '/evaluations/1' });
      suggestedActions.push({ label: 'Compare Startups', action: 'NAVIGATE', path: '/comparison?challengeId=1' });
    } else if (msg.includes('pilot') && (msg.includes('kpi') || msg.includes('milestone') || msg.includes('create'))) {
      reply = `**Pilot Project Status & KPIs:**
- **Status**: ONGOING (78% Complete)
- **Accuracy**: 93% (Target > 90% ✓)
- **Response Time**: 1.4 sec (Target < 2 sec ✓)
- **Cost Reduction**: 18% (Target > 15% ✓)
- **User Satisfaction**: 84% (Target > 80% ✓)`;
      suggestedActions.push({ label: 'Open Pilot Monitoring', action: 'NAVIGATE', path: '/pilots/1' });
      suggestedActions.push({ label: 'View Pilot Evaluation', action: 'NAVIGATE', path: '/pilot-evaluation/1' });
    } else if (msg.includes('procure') || msg.includes('po') || msg.includes('purchase order')) {
      reply = `**Direct Public Procurement Approval (Problem Statement 26136):**
- **Startup**: GreenTech Innovations
- **Validated Pilot Score**: 90.1%
- **Approved Budget**: ₹25,00,000 (2 Years Contract)
- **PO Number**: PO-MAHA-2026-0042
- **Contract Number**: CT-UDD-2026-889`;
      suggestedActions.push({ label: 'Open Procurement View', action: 'NAVIGATE', path: '/procurement/1' });
      suggestedActions.push({ label: 'Track PO & Payments', action: 'NAVIGATE', path: '/contract-tracking' });
    } else if (msg.includes('scale') || msg.includes('scaling') || msg.includes('expansion')) {
      reply = `**AI Scaling Recommendation (8 Departments Detected):**
- **Pune**: Completed
- **Nashik Municipal Department**: Deployment (Dec 2026)
- **Nagpur Municipal Department**: Approval (Jan 2027)
- **Thane Municipal Department**: Planned (Feb 2027)
- **Aurangabad Municipal Department**: Planned (Mar 2027)`;
      suggestedActions.push({ label: 'View Scaling Recommendations', action: 'NAVIGATE', path: '/scaling-recommendation' });
      suggestedActions.push({ label: 'Open Scaling Dashboard', action: 'NAVIGATE', path: '/scaling-dashboard' });
    } else {
      reply = `Hi! I'm **Mahi** 👋, your AI Assistant for MahInnovate.
I can help you navigate Maharashtra's startup procurement lifecycle:
- Match problems with eligible startups
- Guide proposal submissions and verify missing fields
- Explain evaluation scores and pilot KPIs
- Track procurement contracts, POs, and milestone payments!`;
      suggestedActions.push({ label: 'Explore Challenges', action: 'NAVIGATE', path: '/marketplace' });
      suggestedActions.push({ label: 'Government Dashboard', action: 'NAVIGATE', path: '/dashboard' });
    }

    return { reply, suggestedActions };
  }
};
