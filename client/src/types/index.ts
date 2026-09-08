export type UserRole = 'government' | 'startup' | 'evaluator' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  designation?: string;
  department_id?: number | null;
  phone?: string;
  avatar_url?: string;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  budget_allocated: number;
  contact_email: string;
}

export interface Startup {
  id: number;
  user_id?: number;
  company_name: string;
  logo_url: string;
  industry: string;
  technologies: string[];
  team_size: number;
  founded_year: number;
  website: string;
  dpiit_number: string;
  is_dpiit_recognized: boolean;
  certifications: string[];
  previous_projects: string;
  about: string;
  address?: string;
  city: string;
  state: string;
  verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export type ChallengeStatus = 'DRAFT' | 'UNDER_ANALYSIS' | 'READY_FOR_REVIEW' | 'PUBLISHED' | 'CLOSED';

export interface Challenge {
  id: number;
  department_id: number;
  department_name?: string;
  department_code?: string;
  created_by?: number;
  title: string;
  problem_description: string;
  required_technologies: string[];
  budget_inr: number;
  expected_duration: string;
  location: string;
  eligibility_criteria: string;
  required_deliverables: string;
  status: ChallengeStatus;
  deadline: string;
  views_count?: number;
  created_at?: string;
}

export interface AIRequirementAnalysis {
  id?: number;
  challenge_id: number;
  domain: string;
  technologies: string[];
  functional_requirements?: string[];
  non_functional_requirements?: string[];
  key_requirements: string[];
  expected_solution: string;
  potential_impact: string;
  suggested_kpis: Record<string, string>;
  potential_risks: string[];
  suggested_eligibility: string[];
  suggested_deliverables: string[];
}

export interface StartupMatch {
  startup_id: number;
  company_name: string;
  logo_url: string;
  industry: string;
  technologies: string[];
  city: string;
  match_score: number;
  breakdown: {
    tech: number;
    domain: number;
    experience: number;
    capability: number;
    budget: number;
    scalability: number;
    location: number;
  };
  match_reasons: string[];
  is_shortlisted: boolean;
}

export type ProposalStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'ELIGIBILITY_CHECK'
  | 'UNDER_EVALUATION'
  | 'SHORTLISTED'
  | 'CLARIFICATION_REQUIRED'
  | 'APPROVED_FOR_PILOT'
  | 'REJECTED';

export interface Proposal {
  id: number;
  challenge_id: number;
  challenge_title?: string;
  department_name?: string;
  startup_id: number;
  company_name?: string;
  solution_name: string;
  solution_description: string;
  technology_used: string[];
  implementation_plan: string;
  estimated_cost_inr: number;
  duration: string;
  previous_experience: string;
  proposal_pdf_url?: string;
  certifications_url?: string;
  status: ProposalStatus;
  submitted_at?: string;
}

export interface Evaluation {
  id: number;
  proposal_id: number;
  evaluator_id?: number;
  technical_feasibility: number;
  innovation: number;
  cost_effectiveness: number;
  scalability: number;
  experience: number;
  implementation: number;
  security_compliance: number;
  overall_score: number;
  decision: 'PENDING' | 'APPROVED_FOR_PILOT' | 'CLARIFICATION_REQUIRED' | 'REJECTED';
  remarks: string;
  evaluated_at?: string;
}

export interface ComparisonRow {
  parameter: string;
  startupA: string | number;
  startupB: string | number;
  startupC: string | number;
  isHeader?: boolean;
}

export type PilotStatus =
  | 'PLANNED'
  | 'AGREEMENT_PENDING'
  | 'ONGOING'
  | 'MILESTONE_REVIEW'
  | 'VALIDATION'
  | 'SUCCESSFUL'
  | 'UNSUCCESSFUL';

export interface PilotKPI {
  id: number;
  kpi_name: string;
  target_condition: string;
  current_value: string;
  unit: string;
  is_achieved: boolean;
}

export interface PilotMilestone {
  id: number;
  milestone_number: number;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'VERIFIED';
  evidence_description?: string;
  evidence_file_url?: string;
  completed_at?: string;
  verified_at?: string;
}

export interface Pilot {
  id: number;
  challenge_id: number;
  challenge_title?: string;
  startup_id: number;
  company_name?: string;
  proposal_id?: number;
  project_name: string;
  location: string;
  duration: string;
  budget_inr: number;
  status: PilotStatus;
  overall_completion: number;
  kpis: PilotKPI[];
  milestones: PilotMilestone[];
  start_date?: string;
  end_date?: string;
}

export interface PilotValidation {
  id: number;
  pilot_id: number;
  technical_performance: number;
  kpi_achievement: number;
  cost_efficiency: number;
  user_satisfaction: number;
  scalability: number;
  final_score: number;
  is_successful: boolean;
  independent_validator_name: string;
  validator_summary: string;
}

export interface Procurement {
  id: number;
  pilot_id: number;
  challenge_id: number;
  startup_id: number;
  company_name: string;
  solution_name: string;
  pilot_score: number;
  approved_budget_inr: number;
  procurement_type: string;
  contract_duration: string;
  status:
    | 'PENDING'
    | 'APPROVED'
    | 'PO_GENERATED'
    | 'CONTRACT_PENDING'
    | 'CONTRACT_SIGNED'
    | 'PAYMENT_PROCESSING'
    | 'COMPLETED';
  po_number?: string;
  po_date?: string;
  contract_number?: string;
  contract_date?: string;
}

export interface PaymentItem {
  id: number;
  procurement_id: number;
  milestone_name: string;
  amount_inr: number;
  status: 'PENDING' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'PAID' | 'REJECTED';
  due_date?: string;
  paid_at?: string;
  invoice_url?: string;
  receipt_url?: string;
}

export interface ScalingItem {
  id: number;
  pilot_id: number;
  solution_name: string;
  department_name: string;
  district: string;
  similarity_score: number;
  tech_compatibility: number;
  expected_impact: string;
  status: 'RECOMMENDED' | 'PLANNED' | 'APPROVAL' | 'DEPLOYMENT' | 'COMPLETED';
  expected_timeline: string;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: string;
  link_url?: string;
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string;
  ip_address: string;
  created_at: string;
}

export interface MahiChatMessage {
  id: string;
  sender: 'user' | 'mahi';
  text: string;
  timestamp: string;
  suggestedActions?: Array<{ label: string; action: string; path?: string }>;
}
