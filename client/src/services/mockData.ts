import {
  User,
  Startup,
  Challenge,
  AIRequirementAnalysis,
  StartupMatch,
  Proposal,
  Evaluation,
  Pilot,
  Procurement,
  PaymentItem,
  ScalingItem,
  AuditLog
} from '../types';

export const initialUsers: User[] = [
  {
    id: 1,
    name: 'Shri Rajesh Patil',
    email: 'officer@maharashtra.gov.in',
    role: 'government',
    designation: 'Officer / Urban Development Dept.',
    department_id: 1,
    phone: '+91 98201 12345'
  },
  {
    id: 2,
    name: 'Amit Deshmukh',
    email: 'greentech@startup.in',
    role: 'startup',
    designation: 'Founder & CEO, GreenTech Innovations',
    department_id: null,
    phone: '+91 98202 23456'
  },
  {
    id: 3,
    name: 'Dr. Sunita Sharma',
    email: 'evaluator@maha.gov.in',
    role: 'evaluator',
    designation: 'Chief Technical Evaluator',
    department_id: 1,
    phone: '+91 98203 34567'
  },
  {
    id: 4,
    name: 'MahaInnovate Admin',
    email: 'admin@mahinnovate.gov.in',
    role: 'admin',
    designation: 'System Administrator',
    department_id: null,
    phone: '+91 98204 45678'
  }
];

export const initialStartups: Startup[] = [
  {
    id: 1,
    company_name: 'GreenTech Innovations',
    logo_url: '🌱',
    industry: 'CleanTech',
    technologies: ['AI', 'IoT', 'Computer Vision'],
    team_size: 12,
    founded_year: 2020,
    website: 'www.greentech.in',
    dpiit_number: 'DIPP12345',
    is_dpiit_recognized: true,
    certifications: ['DPIIT Recognized', 'ISO 9001'],
    previous_projects: 'Smart bin system for Pune Municipal Corporation',
    about: 'We build AI-powered solutions for smart waste management to create cleaner and greener cities.',
    city: 'Pune',
    state: 'Maharashtra',
    verification_status: 'VERIFIED'
  },
  {
    id: 2,
    company_name: 'EcoVision Labs',
    logo_url: '👁️',
    industry: 'CleanTech',
    technologies: ['AI', 'Computer Vision'],
    team_size: 8,
    founded_year: 2021,
    website: 'www.ecovisionlabs.io',
    dpiit_number: 'DIPP23456',
    is_dpiit_recognized: true,
    certifications: ['DPIIT Recognized', 'ISO 27001'],
    previous_projects: 'Automated segregation camera pods in Thane',
    about: 'Computer vision for waste segregation and environmental intelligence.',
    city: 'Thane',
    state: 'Maharashtra',
    verification_status: 'VERIFIED'
  },
  {
    id: 3,
    company_name: 'CleanCity Solutions',
    logo_url: '🏙️',
    industry: 'Smart Cities',
    technologies: ['IoT', 'Waste Management'],
    team_size: 15,
    founded_year: 2019,
    website: 'www.cleancity.co.in',
    dpiit_number: 'DIPP34567',
    is_dpiit_recognized: true,
    certifications: ['DPIIT Recognized', 'CMMI Level 3'],
    previous_projects: 'Municipal waste fleet tracking in Nashik',
    about: 'Smart municipal solutions for automated urban civic governance.',
    city: 'Nashik',
    state: 'Maharashtra',
    verification_status: 'VERIFIED'
  }
];

export const initialChallenges: Challenge[] = [
  {
    id: 1,
    department_id: 1,
    department_name: 'Dept. of Urban Development',
    department_code: 'UDD',
    title: 'Smart Waste Management',
    problem_description: 'AI-based waste segregation system for municipal areas to improve efficiency and reduce landfill waste.',
    required_technologies: ['AI', 'IoT', 'Environment'],
    budget_inr: 1000000,
    expected_duration: '3 Months',
    location: 'Pune',
    eligibility_criteria: 'DPIIT recognized startups with proven machine learning or IoT prototypes.',
    required_deliverables: 'Automated classification hardware/software, dashboard, pilot report.',
    status: 'PUBLISHED',
    deadline: '2026-10-20',
    views_count: 342,
    created_at: '2026-09-01'
  },
  {
    id: 2,
    department_id: 2,
    department_name: 'Dept. of Public Health',
    department_code: 'PHD',
    title: 'Rural Healthcare Monitoring',
    problem_description: 'Remote health monitoring and diagnostic system for rural and tribal healthcare centers in Maharashtra.',
    required_technologies: ['IoT', 'Healthcare', 'Rural'],
    budget_inr: 1500000,
    expected_duration: '6 Months',
    location: 'Gadchiroli & Amravati',
    eligibility_criteria: 'Biomedical or IoT health startups with field-tested tele-diagnostic equipment.',
    required_deliverables: '10 edge diagnostic units, low-bandwidth cloud synchronization, health worker training.',
    status: 'PUBLISHED',
    deadline: '2026-10-25',
    views_count: 218,
    created_at: '2026-09-03'
  },
  {
    id: 3,
    department_id: 3,
    department_name: 'Dept. of Home & Transport',
    department_code: 'DHT',
    title: 'AI Traffic Flow Optimization',
    problem_description: 'Adaptive camera-based traffic signal timing to eliminate junction bottlenecks and reduce congestion.',
    required_technologies: ['AI', 'Computer Vision', 'Smart City'],
    budget_inr: 2000000,
    expected_duration: '4 Months',
    location: 'Mumbai & Navi Mumbai',
    eligibility_criteria: 'Startups with traffic computer vision algorithms and edge processing.',
    required_deliverables: 'Computer vision traffic sensor pilots at 5 junctions, dynamic signal controller.',
    status: 'PUBLISHED',
    deadline: '2026-11-15',
    views_count: 189,
    created_at: '2026-09-05'
  }
];

export const initialAIAnalysis: AIRequirementAnalysis = {
  challenge_id: 1,
  domain: 'Waste Management',
  technologies: ['Computer Vision', 'Machine Learning', 'IoT'],
  functional_requirements: [
    'Automated real-time classification into wet, dry, and plastic waste',
    'IoT bin fill-level sensing with automated alert triggers',
    'Centralized dashboard for municipal waste fleet dispatch'
  ],
  non_functional_requirements: [
    'Weatherproof IP67 rated edge camera enclosures',
    'Sub-second inference time (< 1.5s) on embedded hardware'
  ],
  key_requirements: ['Real-time', 'Scalable', 'Low Cost'],
  expected_solution: 'Automated waste classification',
  potential_impact: 'Cleaner cities, reduced landfill waste',
  suggested_kpis: {
    accuracy: '> 90%',
    response_time: '< 2 sec',
    cost_reduction: '> 15%',
    user_satisfaction: '> 80%'
  },
  potential_risks: [
    'Camera occlusion from dirt or dust',
    'Irregular waste stream packaging'
  ],
  suggested_eligibility: [
    'DPIIT Registered Startup',
    'Prior IoT or Computer Vision proof of concept',
    'Local Maharashtra support team'
  ],
  suggested_deliverables: [
    'Prototype deployment in 5 municipal ward bins',
    'Real-time telemetry portal',
    'Third-party safety certification'
  ]
};

export const initialMatches: StartupMatch[] = [
  {
    startup_id: 1,
    company_name: 'GreenTech Innovations',
    logo_url: '🌱',
    industry: 'CleanTech',
    technologies: ['AI', 'IoT', 'Smart City'],
    city: 'Pune',
    match_score: 94,
    breakdown: {
      tech: 30,
      domain: 20,
      experience: 15,
      capability: 14,
      budget: 10,
      scalability: 5,
      location: 4.8
    },
    match_reasons: [
      'Direct Computer Vision & IoT expertise',
      'Past project with Pune Municipal Corporation',
      'Fully compatible with budget'
    ],
    is_shortlisted: true
  },
  {
    startup_id: 2,
    company_name: 'EcoVision Labs',
    logo_url: '👁️',
    industry: 'CleanTech',
    technologies: ['AI', 'Computer Vision'],
    city: 'Thane',
    match_score: 89,
    breakdown: {
      tech: 28,
      domain: 18,
      experience: 13,
      capability: 15,
      budget: 10,
      scalability: 5,
      location: 4.5
    },
    match_reasons: [
      'Strong Computer Vision models',
      'ISO 27001 certified',
      'Proven camera pods'
    ],
    is_shortlisted: false
  },
  {
    startup_id: 3,
    company_name: 'CleanCity Solutions',
    logo_url: '🏙️',
    industry: 'Smart Cities',
    technologies: ['IoT', 'Waste Management'],
    city: 'Nashik',
    match_score: 82,
    breakdown: {
      tech: 24,
      domain: 20,
      experience: 15,
      capability: 11,
      budget: 8,
      scalability: 4,
      location: 4.2
    },
    match_reasons: [
      'Extensive municipal fleet IoT experience',
      'Large team',
      'Strong hardware deployment'
    ],
    is_shortlisted: false
  }
];

export const initialProposals: Proposal[] = [
  {
    id: 1,
    challenge_id: 1,
    challenge_title: 'Smart Waste Management',
    department_name: 'Dept. of Urban Development',
    startup_id: 1,
    company_name: 'GreenTech Innovations',
    solution_name: 'Smart Bin & Automated Segregation AI System',
    solution_description: 'High-throughput computer vision edge system with automated classification into wet, dry, plastic, and recyclable streams.',
    technology_used: ['AI', 'IoT', 'Computer Vision'],
    implementation_plan: 'Phase 1: Hardware sensor calibration; Phase 2: Pilot bin installation in 5 PMC wards; Phase 3: Telemetry sync and user training.',
    estimated_cost_inr: 500000,
    duration: '3 Months',
    previous_experience: 'Deployed 50 smart bins with Pune Municipal Corporation with 92% classification accuracy.',
    proposal_pdf_url: '/documents/greentech_proposal.pdf',
    certifications_url: '/documents/greentech_iso9001.pdf',
    status: 'APPROVED_FOR_PILOT',
    submitted_at: '2026-09-04'
  }
];

export const initialEvaluation: Evaluation = {
  id: 1,
  proposal_id: 1,
  evaluator_id: 3,
  technical_feasibility: 90,
  innovation: 95,
  cost_effectiveness: 85,
  scalability: 92,
  experience: 88,
  implementation: 86,
  security_compliance: 84,
  overall_score: 91.2,
  decision: 'APPROVED_FOR_PILOT',
  remarks: 'Exceptional innovation and technically viable architecture. Excellent alignment with Maharashtra smart city priorities.'
};

export const initialPilot: Pilot = {
  id: 1,
  challenge_id: 1,
  challenge_title: 'Smart Waste Management',
  startup_id: 1,
  company_name: 'GreenTech Innovations',
  proposal_id: 1,
  project_name: 'Smart Waste Management - Pune Pilot',
  location: 'Pune',
  duration: '3 Months',
  budget_inr: 500000,
  status: 'ONGOING',
  overall_completion: 78,
  start_date: '2026-06-01',
  end_date: '2026-09-01',
  kpis: [
    { id: 1, kpi_name: 'Accuracy', target_condition: '> 90%', current_value: '93%', unit: '%', is_achieved: true },
    { id: 2, kpi_name: 'Response Time', target_condition: '< 2 sec', current_value: '1.4 sec', unit: 'sec', is_achieved: true },
    { id: 3, kpi_name: 'Cost Reduction', target_condition: '> 15%', current_value: '18%', unit: '%', is_achieved: true },
    { id: 4, kpi_name: 'User Satisfaction', target_condition: '> 80%', current_value: '84%', unit: '%', is_achieved: true }
  ],
  milestones: [
    { id: 1, milestone_number: 1, title: 'Requirement Analysis', description: 'Field survey of Pune Ward 4 & 7 points', status: 'VERIFIED' },
    { id: 2, milestone_number: 2, title: 'Prototype', description: 'Assembly and calibration of 10 test pods', status: 'VERIFIED' },
    { id: 3, milestone_number: 3, title: 'Deployment', description: 'On-site installation across 10 points', status: 'VERIFIED' },
    { id: 4, milestone_number: 4, title: 'Testing', description: 'Continuous 45-day municipal waste trials', status: 'IN_PROGRESS' },
    { id: 5, milestone_number: 5, title: 'Final Evaluation', description: 'Comprehensive pilot report and audit', status: 'PENDING' }
  ]
};

export const initialProcurement: Procurement = {
  id: 1,
  pilot_id: 1,
  challenge_id: 1,
  startup_id: 1,
  company_name: 'GreenTech Innovations',
  solution_name: 'Smart Waste Management',
  pilot_score: 90.1,
  approved_budget_inr: 2500000,
  procurement_type: 'Direct / Approved Mechanism',
  contract_duration: '2 Years',
  status: 'PAYMENT_PROCESSING',
  po_number: 'PO-MAHA-2026-0042',
  po_date: '15 Oct 2026',
  contract_number: 'CT-UDD-2026-889',
  contract_date: '19 Oct 2026'
};

export const initialPayments: PaymentItem[] = [
  { id: 1, procurement_id: 1, milestone_name: 'Milestone 1 - Initial Hardware Setup', amount_inr: 100000, status: 'PAID', paid_at: '18 Nov 2026' },
  { id: 2, procurement_id: 1, milestone_name: 'Milestone 2 - Citywide Ward Integration', amount_inr: 150000, status: 'PAID', paid_at: '20 Dec 2026' },
  { id: 3, procurement_id: 1, milestone_name: 'Milestone 3 - Live Telemetry & Municipal Portal', amount_inr: 150000, status: 'APPROVED', due_date: '15 Jan 2027' },
  { id: 4, procurement_id: 1, milestone_name: 'Milestone 4 - Annual Maintenance & Scalability Audit', amount_inr: 100000, status: 'UNDER_REVIEW', due_date: '15 Mar 2027' }
];

export const initialScaling: ScalingItem[] = [
  { id: 1, pilot_id: 1, solution_name: 'Smart Waste Management', department_name: 'Pune Municipal Department', district: 'Pune', similarity_score: 95, tech_compatibility: 98, expected_impact: 'High', status: 'COMPLETED', expected_timeline: '-' },
  { id: 2, pilot_id: 1, solution_name: 'Smart Waste Management', department_name: 'Nashik Municipal Department', district: 'Nashik', similarity_score: 91, tech_compatibility: 95, expected_impact: 'High', status: 'DEPLOYMENT', expected_timeline: 'Dec 2026' },
  { id: 3, pilot_id: 1, solution_name: 'Smart Waste Management', department_name: 'Nagpur Municipal Department', district: 'Nagpur', similarity_score: 88, tech_compatibility: 92, expected_impact: 'High', status: 'APPROVAL', expected_timeline: 'Jan 2027' },
  { id: 4, pilot_id: 1, solution_name: 'Smart Waste Management', department_name: 'Thane Municipal Department', district: 'Thane', similarity_score: 86, tech_compatibility: 90, expected_impact: 'High', status: 'PLANNED', expected_timeline: 'Feb 2027' },
  { id: 5, pilot_id: 1, solution_name: 'Smart Waste Management', department_name: 'Aurangabad Municipal Department', district: 'Aurangabad (Chhatrapati Sambhajinagar)', similarity_score: 84, tech_compatibility: 89, expected_impact: 'High', status: 'PLANNED', expected_timeline: 'Mar 2027' }
];

export const initialAuditLogs: AuditLog[] = [
  { id: 1, user_id: 1, action: 'CHALLENGE_CREATED', entity_type: 'CHALLENGE', entity_id: '1', details: 'Created challenge: Smart Waste Management with budget 10,00,000 INR', ip_address: '10.0.12.44', created_at: '2 hours ago' },
  { id: 2, user_id: 1, action: 'CHALLENGE_PUBLISHED', entity_type: 'CHALLENGE', entity_id: '1', details: 'Challenge published: Rural Healthcare Solution', ip_address: '10.0.12.44', created_at: '5 hours ago' },
  { id: 3, user_id: 4, action: 'USER_VERIFIED', entity_type: 'USER', entity_id: '2', details: 'Startup GreenTech Innovations verified with DPIIT credentials', ip_address: '10.0.14.22', created_at: '19 hours ago' },
  { id: 4, user_id: 1, action: 'PROCUREMENT_APPROVED', entity_type: 'PROCUREMENT', entity_id: '1', details: 'Procurement approved for Smart Waste Management (2 Years contract)', ip_address: '10.0.12.44', created_at: '1 day ago' }
];
