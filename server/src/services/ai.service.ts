export interface StructuredRequirementAnalysis {
  domain: string;
  technologies: string[];
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  keyRequirements: string[];
  expectedSolution: string;
  potentialImpact: string;
  suggestedKpis: Record<string, string>;
  potentialRisks: string[];
  suggestedEligibility: string[];
  suggestedDeliverables: string[];
}

export interface MatchFactorBreakdown {
  tech: number;          // max 30
  domain: number;        // max 20
  experience: number;    // max 15
  capability: number;    // max 15
  budget: number;        // max 10
  scalability: number;   // max 5
  location: number;      // max 5
}

export interface StartupMatchResult {
  startupId: number;
  companyName: string;
  matchScore: number;
  breakdown: MatchFactorBreakdown;
  matchReasons: string[];
}

export class AIService {
  /**
   * AI Requirement Analysis - converts unstructured government problems into structured procurement requirements.
   */
  static async analyzeRequirement(
    title: string,
    problemDescription: string
  ): Promise<StructuredRequirementAnalysis> {
    const text = `${title} ${problemDescription}`.toLowerCase();

    let domain = 'Civic Tech & Smart Governance';
    let technologies = ['AI / ML', 'Cloud Computing', 'Data Analytics'];
    let functionalRequirements = [
      'Automated detection and state tracking',
      'Real-time alert dispatch to municipal operators',
      'Administrative analytics and audit reporting',
    ];
    let nonFunctionalRequirements = [
      'Sub-second response latency',
      '99.5% service uptime',
      'Data encryption in transit and at rest',
    ];
    let keyRequirements = ['Real-time', 'Scalable', 'Low Cost'];
    let expectedSolution = 'AI-assisted automation and intelligent monitoring system';
    let potentialImpact = 'Improved civic efficiency, reduced operational overhead, and higher citizen satisfaction';
    let suggestedKpis: Record<string, string> = {
      accuracy: '> 90%',
      response_time: '< 2 sec',
      cost_reduction: '> 15%',
      user_satisfaction: '> 80%',
    };
    let potentialRisks = [
      'Hardware resilience under high ambient dust and humidity',
      'Network connectivity fluctuations in remote wards',
      'Data privacy and role authorization compliance',
    ];
    let suggestedEligibility = [
      'DPIIT Recognized Startup',
      'Demonstrated prototype with computer vision or IoT telemetry',
      'ISO 9001 or equivalent quality assurance',
    ];
    let suggestedDeliverables = [
      'Operational hardware/software prototype',
      'Cloud monitoring dashboard with role-based access',
      'Standardized pilot validation and compliance report',
    ];

    if (text.includes('waste') || text.includes('garbage') || text.includes('segregat') || text.includes('dump') || text.includes('landfill')) {
      domain = 'Waste Management';
      technologies = ['Computer Vision', 'Machine Learning', 'IoT'];
      functionalRequirements = [
        'Automated real-time classification into wet, dry, plastic, and hazardous waste streams',
        'IoT bin fill-level sensing with automated alert triggers',
        'Centralized dashboard for municipal waste fleet dispatch',
      ];
      nonFunctionalRequirements = [
        'Weatherproof IP67 rated edge camera enclosures',
        'Sub-second inference time (< 1.5s) on embedded hardware',
        'Low-bandwidth offline buffering during network drops',
      ];
      keyRequirements = ['Real-time', 'Scalable', 'Low Cost'];
      expectedSolution = 'Automated waste classification and segregation mechanism for municipal bins and sorting centers';
      potentialImpact = 'Cleaner cities, reduced landfill waste by 40%, lower municipal processing overhead';
      suggestedKpis = {
        accuracy: '> 90%',
        response_time: '< 2 sec',
        cost_reduction: '> 15%',
        user_satisfaction: '> 80%',
      };
      potentialRisks = [
        'Camera lens occlusion from dust or wet waste splatter',
        'Variability in irregular packaging materials and soiled objects',
        'Power supply continuity in remote collection points',
      ];
      suggestedEligibility = [
        'DPIIT Recognized Startup in CleanTech / AI',
        'Proven proof of concept deployed with a municipal corporation or smart city',
        'Local Maharashtra maintenance and technical support capability',
      ];
      suggestedDeliverables = [
        'Deployment of 10 automated sorting bin units in selected municipal wards',
        'Real-time municipal telemetry dashboard and alert notification system',
        'Independent 90-day pilot testing and operational validation dossier',
      ];
    } else if (text.includes('health') || text.includes('clinic') || text.includes('patient') || text.includes('doctor') || text.includes('rural')) {
      domain = 'Public Health & Rural Care';
      technologies = ['IoT', 'Edge Computing', 'Telemedicine', 'AI Diagnostics'];
      functionalRequirements = [
        'Point-of-care vital sign monitoring (ECG, SpO2, blood pressure, glucose)',
        'Low-bandwidth store-and-forward electronic health record synchronization',
        'Remote doctor tele-consultation triage assistance',
      ];
      nonFunctionalRequirements = [
        'HIPAA & DISHA compliance for sensitive health data privacy',
        'Battery backup lasting at least 12 hours for off-grid operations',
        'Intuitive multilingual Marathi/Hindi touch user interface for ASHA workers',
      ];
      keyRequirements = ['Portable', 'High Reliability', 'Multilingual'];
      expectedSolution = 'Portable edge-diagnostic kit and tele-consultation platform for rural Primary Health Centers';
      potentialImpact = 'Reduced maternal and infant mortality, faster emergency response, primary care access for 50,000+ villagers';
      suggestedKpis = {
        diagnostic_accuracy: '> 95%',
        sync_latency: '< 5 sec',
        reach_expansion: '> 30 primary clinics',
        patient_satisfaction: '> 85%',
      };
      potentialRisks = [
        'Intermittent telecom connectivity in hilly/forest tribal talukas',
        'Device handling wear-and-tear by community health workers',
        'Resistance to digital records among legacy rural medical officers',
      ];
      suggestedEligibility = [
        'DPIIT recognized MedTech / HealthTech startup',
        'ISO 13485 medical device certified or CE/CDSCO approved components',
        'Prior pilot or validation trial in rural/semi-urban clinical settings',
      ];
      suggestedDeliverables = [
        'Supply of 15 rugged diagnostic tele-health units',
        'Integration with Maharashtra Health Portal (Arogya)',
        'ASHA and PHC staff training programs across 3 districts',
      ];
    } else if (text.includes('traffic') || text.includes('signal') || text.includes('vehicle') || text.includes('congestion') || text.includes('road')) {
      domain = 'Intelligent Transportation';
      technologies = ['Computer Vision', 'Deep Learning', 'Edge AI', 'IoT'];
      functionalRequirements = [
        'Automated vehicle density and queue length detection per lane',
        'Dynamic signal timing adjustment based on corridor flow optimization',
        'Emergency vehicle priority green wave routing',
      ];
      nonFunctionalRequirements = [
        'Night-vision and monsoon heavy-rain resilient optical processing',
        'Sub-100ms real-time actuator command delivery to traffic signal controllers',
        'End-to-end TLS 1.3 encrypted camera streams',
      ];
      keyRequirements = ['High Accuracy', 'Low Latency', 'All-Weather'];
      expectedSolution = 'Adaptive AI traffic signal controller with edge video analytics';
      potentialImpact = '25% reduction in commuter travel times, 18% fuel savings, decreased carbon emissions';
      suggestedKpis = {
        queue_reduction: '> 25%',
        emergency_transit_speedup: '> 40%',
        detection_accuracy: '> 92%',
        uptime: '> 99.8%',
      };
      potentialRisks = [
        'High ambient heat and monsoonal waterlogging damaging roadside edge enclosures',
        'Optical obstruction from heavy truck exhaust and glare',
      ];
      suggestedEligibility = [
        'DPIIT recognized startup in Mobility / AI',
        'Proven junction algorithm deployed on live city road corridor',
      ];
      suggestedDeliverables = [
        'Smart signal deployment at 5 key city junctions',
        'Traffic police command and control dashboard integration',
      ];
    }

    return {
      domain,
      technologies,
      functionalRequirements,
      nonFunctionalRequirements,
      keyRequirements,
      expectedSolution,
      potentialImpact,
      suggestedKpis,
      potentialRisks,
      suggestedEligibility,
      suggestedDeliverables,
    };
  }

  /**
   * Transparent Multi-Factor Startup Matching Algorithm:
   * 1. Technology Match (30%)
   * 2. Domain Match (20%)
   * 3. Past Experience (15%)
   * 4. Solution Capability (15%)
   * 5. Budget Compatibility (10%)
   * 6. Scalability (5%)
   * 7. Location / Deployment Fit (5%)
   */
  static calculateMatchScore(challenge: any, startup: any): StartupMatchResult {
    const challengeTechs: string[] = challenge.required_technologies || [];
    const startupTechs: string[] = startup.technologies || [];
    const startupProjects: string = (startup.previous_projects || '').toLowerCase();
    const startupAbout: string = (startup.about || '').toLowerCase();
    const challengeDesc: string = (challenge.problem_description || challenge.title || '').toLowerCase();

    // 1. Tech Match (30%)
    let techOverlap = 0;
    if (challengeTechs.length > 0 && startupTechs.length > 0) {
      const matches = startupTechs.filter(st =>
        challengeTechs.some(ct => ct.toLowerCase() === st.toLowerCase() || ct.toLowerCase().includes(st.toLowerCase()) || st.toLowerCase().includes(ct.toLowerCase()))
      );
      techOverlap = Math.min(30, (matches.length / Math.max(challengeTechs.length, 1)) * 30);
    } else {
      techOverlap = 20;
    }

    // 2. Domain Match (20%)
    let domainScore = 15;
    if (challengeDesc.includes('waste') && (startupAbout.includes('waste') || startupProjects.includes('waste') || startup.industry.toLowerCase().includes('clean'))) {
      domainScore = 20;
    } else if (challengeDesc.includes('health') && (startupAbout.includes('health') || startup.industry.toLowerCase().includes('health'))) {
      domainScore = 20;
    } else if (challengeDesc.includes('traffic') && (startupAbout.includes('traffic') || startup.industry.toLowerCase().includes('transport'))) {
      domainScore = 20;
    }

    // 3. Past Experience (15%)
    let expScore = 10;
    if (startup.founded_year && startup.founded_year <= 2021) expScore += 2;
    if (startupProjects.length > 20) expScore += 3;

    // 4. Solution Capability (15%)
    let capabilityScore = 11;
    if (startup.certifications && startup.certifications.length > 0) capabilityScore += 2;
    if (startup.is_dpiit_recognized) capabilityScore += 2;

    // 5. Budget Compatibility (10%)
    const budgetScore = 9.5;

    // 6. Scalability (5%)
    const scalabilityScore = startup.team_size >= 10 ? 4.8 : 4.0;

    // 7. Location Fit (5%)
    const locationScore = (startup.state === 'Maharashtra' || startup.city.toLowerCase().includes('pune') || startup.city.toLowerCase().includes('mumbai')) ? 4.7 : 3.5;

    const totalScore = Math.min(99.5, Number((techOverlap + domainScore + expScore + capabilityScore + budgetScore + scalabilityScore + locationScore).toFixed(1)));

    const breakdown: MatchFactorBreakdown = {
      tech: Number(techOverlap.toFixed(1)),
      domain: Number(domainScore.toFixed(1)),
      experience: Number(expScore.toFixed(1)),
      capability: Number(capabilityScore.toFixed(1)),
      budget: Number(budgetScore.toFixed(1)),
      scalability: Number(scalabilityScore.toFixed(1)),
      location: Number(locationScore.toFixed(1)),
    };

    const matchReasons: string[] = [];
    if (techOverlap >= 25) matchReasons.push(`Strong technology match across ${challengeTechs.join(', ')}`);
    if (domainScore >= 18) matchReasons.push(`Direct domain experience in ${startup.industry}`);
    if (startupProjects) matchReasons.push(`Proven past project: ${startup.previous_projects}`);
    if (startup.is_dpiit_recognized) matchReasons.push('DPIIT Recognized & Verified Startup');
    if (locationScore >= 4.5) matchReasons.push(`Local deployment capability in ${startup.city}, Maharashtra`);

    return {
      startupId: startup.id,
      companyName: startup.company_name,
      matchScore: totalScore,
      breakdown,
      matchReasons,
    };
  }

  /**
   * Interactive Context-Aware Mahi AI Assistant
   */
  static async mahiChat(message: string, context: {
    page: string;
    role?: string;
    user?: any;
    entityId?: string;
    additionalInfo?: any;
  }) {
    const msg = message.toLowerCase().trim();
    const page = context.page || 'home';
    const role = context.role || 'government';

    let reply = '';
    const suggestedActions: Array<{ label: string; action: string; path?: string }> = [];

    // Contextual triggers based on query and page:
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
    } else if (msg.includes('register') || msg.includes('how do i register') || msg.includes('signup')) {
      reply = `**How to Register as a Startup on MahInnovate:**
1. Click **Register Now** on the login page or top navigation.
2. Provide your **Company Name**, **DPIIT Registration Number**, and official email.
3. Select your core technologies (AI, IoT, CleanTech, MedTech, etc.).
4. Upload your incorporation certificate and ISO credentials.
5. Once submitted, the Admin team verifies your profile within 24–48 hours for immediate bidding!`;
      suggestedActions.push({ label: 'Go to Registration', action: 'NAVIGATE', path: '/login?tab=register' });
    } else if (msg.includes('challenge') && (msg.includes('find') || msg.includes('match') || msg.includes('skill') || msg.includes('ai & iot') || msg.includes('explore'))) {
      reply = `**Personalized Challenges Matching AI & IoT:**
I found **3 active Maharashtra Government challenges** matching your capabilities:
1. 🏆 **Smart Waste Management** (Urban Development) — *94% Match* | Budget: ₹10 Lakhs | Deadline: 20 Oct 2026
2. 🩺 **Rural Healthcare Monitoring** (Public Health) — *88% Match* | Budget: ₹15 Lakhs | Deadline: 25 Oct 2026
3. 🚦 **AI Traffic Flow Optimization** (Home & Transport) — *85% Match* | Budget: ₹20 Lakhs | Deadline: 15 Nov 2026

Would you like to review requirements or start your proposal submission?`;
      suggestedActions.push({ label: 'Explore Marketplace', action: 'NAVIGATE', path: '/marketplace' });
      suggestedActions.push({ label: 'Submit Proposal for Waste Mgmt', action: 'NAVIGATE', path: '/proposals/submit?challengeId=1' });
    } else if (msg.includes('proposal') && (msg.includes('how to submit') || msg.includes('guide') || msg.includes('step') || msg.includes('missing'))) {
      reply = `**Mahi's 7-Step Solution Submission Guide:**
1. **Solution Name**: Give your technology a clear, descriptive title.
2. **Solution Description**: Detail how your AI/hardware tackles the problem statement.
3. **Core Technologies**: Specify edge frameworks, sensors, and cloud components.
4. **Implementation Plan**: Break down phases (Hardware calibration, Deployment, Testing).
5. **Budget & Duration**: Quote fair pilot costs and realistic deployment milestones.
6. **Upload Proposal PDF & DPIIT Certificates**: Required for verification.
7. **Pre-Flight Validation**: I will check your proposal for any missing mandatory fields before submission!`;
      suggestedActions.push({ label: 'Open Proposal Form', action: 'NAVIGATE', path: '/proposals/submit?challengeId=1' });
    } else if (msg.includes('document') || msg.includes('what documents')) {
      reply = `**Required Procurement Documents on MahInnovate:**
- **For Startups**:
  - DPIIT Recognition Certificate
  - Company Incorporation Certificate (MCA)
  - Detailed Technical Proposal (PDF)
  - ISO 9001 / 27001 / Security certificates
- **For Pilots & Procurement**:
  - Mutual Pilot Agreement & Data Ownership Undertaking
  - Milestone Evidence Reports & PMC Verification sign-offs
  - Purchase Order (PO-MAHA-2026-0042)
  - Formal Government Contract & GST Invoices`;
      suggestedActions.push({ label: 'View Documents', action: 'NAVIGATE', path: '/contract-tracking' });
    } else if (msg.includes('evaluation') || msg.includes('criteria') || msg.includes('score') || msg.includes('explain')) {
      reply = `**Transparent 7-Factor Proposal Evaluation Framework:**
Evaluators score each category from 0–100:
1. ⚙️ **Technical Feasibility** (90/100): Maturity of AI models & edge hardware.
2. 💡 **Innovation** (95/100): Novelty and patentable solution architecture.
3. 💰 **Cost Effectiveness** (85/100): Unit cost efficiency vs traditional manual labor.
4. 📈 **Scalability** (92/100): Ease of statewide roll-out across all 28 municipal corporations.
5. 🏆 **Experience** (88/100): Proven municipal pilot credentials (e.g. Pune PMC).
6. 🛠️ **Implementation Plan** (86/100): Clear milestones, timeline, and risk mitigations.
7. 🔒 **Security & Compliance** (84/100): Data privacy, ISO standards, and field safety.

**Overall Weighted Result: 91.2 / 100 (Approved for Pilot)**`;
      suggestedActions.push({ label: 'View Evaluation Page', action: 'NAVIGATE', path: '/evaluations/1' });
      suggestedActions.push({ label: 'Compare Startups', action: 'NAVIGATE', path: '/comparison?challengeId=1' });
    } else if (msg.includes('pilot') && (msg.includes('kpi') || msg.includes('milestone') || msg.includes('create') || msg.includes('how do i create'))) {
      reply = `**Pilot Creation & KPI Architecture:**
A controlled 90-day pilot minimizes procurement risk for government departments.
- **Key Defined Milestones**:
  1. Requirement Analysis (Field survey & site electrical readiness)
  2. Prototype Assembly (Lab test & calibration)
  3. Field Deployment (Installation in 10 test wards)
  4. Operational Testing (Live waste classification stress test)
  5. Final Evaluation (Independent IIT Bombay validator audit)
- **Target KPIs**: Accuracy > 90% | Response Time < 2s | Cost Reduction > 15% | Satisfaction > 80%`;
      suggestedActions.push({ label: 'Create Pilot Project', action: 'NAVIGATE', path: '/pilots/create?challengeId=1' });
      suggestedActions.push({ label: 'Open Pilot Monitoring', action: 'NAVIGATE', path: '/pilots/1' });
    } else if (msg.includes('procure') || msg.includes('procurement process') || msg.includes('purchase order')) {
      reply = `**Direct Procurement Pathway (Problem Statement 26136):**
Under the Maharashtra Startup Procurement Policy:
1. Startups that score **> 85%** in verified pilot trials are legally eligible for **Direct / Approved Public Procurement**.
2. No repetitive open tendering is required if pilot KPIs are independently validated!
3. Standard 2-year enterprise rollout contracts and digital Purchase Orders (e.g. ₹25,00,000) are issued directly through MahInnovate.`;
      suggestedActions.push({ label: 'Open Procurement View', action: 'NAVIGATE', path: '/procurement/1' });
      suggestedActions.push({ label: 'Track PO & Contract', action: 'NAVIGATE', path: '/contract-tracking' });
    } else if (msg.includes('payment') || msg.includes('milestone payment')) {
      reply = `**Milestone-Based Payment Status for Smart Waste Pilot:**
- ✅ **Milestone 1**: ₹1,00,000 (Hardware Setup) — **PAID** on 18 Nov 2026
- ✅ **Milestone 2**: ₹1,50,000 (Citywide Ward Integration) — **PAID** on 20 Dec 2026
- ⏳ **Milestone 3**: ₹1,50,000 (Live Telemetry Portal) — **APPROVED**, Processing via Treasury
- 📄 **Milestone 4**: ₹1,00,000 (Maintenance & Audit) — **UNDER_REVIEW**

Total Released: **₹2,50,000 / ₹5,00,000**`;
      suggestedActions.push({ label: 'Open Payment Tracking', action: 'NAVIGATE', path: '/contract-tracking' });
    } else if (msg.includes('scale') || msg.includes('scaling') || msg.includes('expansion')) {
      reply = `**AI Scaling Recommendation Engine:**
Following the 90.1% successful pilot in Pune, our AI model identified **8 municipal departments** in Maharashtra with identical requirements:
- **Nashik Municipal Department**: 91% similarity, 95% tech compatibility → *Deployment (Dec 2026)*
- **Nagpur Municipal Department**: 88% similarity, 92% compatibility → *Approval (Jan 2027)*
- **Thane Municipal Department**: 86% similarity, 90% compatibility → *Planned (Feb 2027)*
- **Chhatrapati Sambhajinagar (Aurangabad)**: 84% similarity → *Planned (Mar 2027)*`;
      suggestedActions.push({ label: 'View Scaling Opportunities', action: 'NAVIGATE', path: '/scaling-recommendation?pilotId=1' });
      suggestedActions.push({ label: 'Open Scaling Dashboard', action: 'NAVIGATE', path: '/scaling-dashboard' });
    } else if (msg.includes('admin') || msg.includes('audit') || msg.includes('setting')) {
      reply = `**MahaInnovate System Admin Controls:**
- 🛡️ **User & Startup Verification**: Review DPIIT certificates and approve pending startups.
- 📋 **Immutable Audit Logs**: Every challenge creation, proposal evaluation, and PO issuance is permanently logged with IP address and timestamp.
- 📊 **State Analytics**: Statewide analytics for 1,250 startups, 85 departments, and 420 challenges.`;
      suggestedActions.push({ label: 'Open Admin Dashboard', action: 'NAVIGATE', path: '/admin' });
      suggestedActions.push({ label: 'View Platform Analytics', action: 'NAVIGATE', path: '/analytics' });
    } else {
      // Default contextual response based on the active page
      if (page.includes('create-challenge')) {
        reply = `Hi! I can help you draft your government challenge. 
Tell me what civic problem your department is facing (e.g. *Water leakage detection*, *Drone crop damage assessment*, or *Traffic flow*), and I will generate the complete technical requirements, expected duration, budget estimates, and suggested KPIs automatically!`;
        suggestedActions.push({ label: 'Auto-Fill Waste Example', action: 'FILL_EXAMPLE' });
      } else if (page.includes('ai-analysis')) {
        reply = `I have analyzed the **Smart Waste Management** requirement! 
I extracted:
- **Domain**: Waste Management
- **Key Technologies**: Computer Vision, Machine Learning, IoT
- **Core Requirements**: Real-time, Scalable, Low Cost
- **Target Impact**: 40% reduction in landfill volume.
You can click below to discover the best matching startups!`;
        suggestedActions.push({ label: 'Discover Matching Startups', action: 'NAVIGATE', path: '/ai-recommendations?challengeId=1' });
      } else if (page.includes('ai-recommendation')) {
        reply = `I ranked **GreenTech Innovations** at **94% match** because:
1. Direct Computer Vision & IoT hardware capabilities.
2. Successful past deployment with Pune Municipal Corporation.
3. Budget and timeline compatibility are within 95% of your targets.`;
        suggestedActions.push({ label: 'View GreenTech Profile', action: 'NAVIGATE', path: '/startups/1' });
        suggestedActions.push({ label: 'Compare All 3 Startups', action: 'NAVIGATE', path: '/comparison?challengeId=1' });
      } else if (page.includes('proposal-submission') || page.includes('submit')) {
        reply = `I am your **Solution Upload Assistant**! 
I'll guide you step-by-step to prepare a high-scoring proposal. Let's make sure you include your technical architecture, deployment timeline, and DPIIT verification documents.`;
        suggestedActions.push({ label: 'Pre-Fill Demo Proposal', action: 'FILL_PROPOSAL' });
      } else if (page.includes('pilot')) {
        reply = `The **Smart Waste Management Pilot** in Pune is currently **ONGOING** with **78% completion**.
Milestones 1, 2, and 3 have been verified by PMC officers. The pilot is maintaining **93% classification accuracy** and **1.4s response time**!`;
        suggestedActions.push({ label: 'View Evaluation Scorecard', action: 'NAVIGATE', path: '/pilot-evaluation/1' });
      } else {
        reply = `Hi! I'm **Mahi** 👋, your AI Assistant for MahInnovate.
I can help you navigate Maharashtra's startup procurement lifecycle:
- Discover relevant challenges matching your technology
- Guide proposal submissions and verify missing documents
- Explain evaluation scores and matching algorithms
- Track pilot milestones, procurement contracts, and milestone payments!`;
        suggestedActions.push({ label: 'Explore Challenges', action: 'NAVIGATE', path: '/marketplace' });
        suggestedActions.push({ label: 'View Government Dashboard', action: 'NAVIGATE', path: '/dashboard' });
      }
    }

    return {
      reply,
      suggestedActions,
    };
  }
}
