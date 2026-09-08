import bcrypt from 'bcryptjs';
import { query, execSql } from './index.js';
import { initDb } from './init.js';

export async function seedDb() {
  console.log('Seeding database with realistic MahInnovate demonstration data...');
  await initDb();

  // Check if already seeded
  const userCheck = await query('SELECT COUNT(*) as count FROM users');
  if (parseInt(userCheck.rows[0].count, 10) > 0) {
    console.log('Database already has data. Truncating and re-seeding...');
    await execSql(`
      TRUNCATE TABLE audit_logs, notifications, scaling_recommendations, payments, contracts, purchase_orders,
      procurements, pilot_validations, pilot_milestones, pilot_kpis, pilot_agreements, pilots,
      evaluations, proposals, startup_matches, ai_requirement_analyses, challenges,
      startup_documents, startups, users, departments CASCADE;
    `);
  }

  // 1. Departments
  const depts = [
    { name: 'Dept. of Urban Development', code: 'UDD', budget: 50000000, email: 'udd@maharashtra.gov.in' },
    { name: 'Dept. of Public Health', code: 'PHD', budget: 40000000, email: 'phd@maharashtra.gov.in' },
    { name: 'Dept. of Home & Transport', code: 'DHT', budget: 35000000, email: 'transport@maharashtra.gov.in' },
    { name: 'Dept. of Agriculture', code: 'DOA', budget: 30000000, email: 'agri@maharashtra.gov.in' },
    { name: 'Dept. of Environment & Climate Change', code: 'ECC', budget: 25000000, email: 'environment@maharashtra.gov.in' },
  ];

  for (const d of depts) {
    await query(
      'INSERT INTO departments (name, code, contact_email, budget_allocated) VALUES ($1, $2, $3, $4)',
      [d.name, d.code, d.email, d.budget]
    );
  }

  // 2. Users
  const passwordHash = await bcrypt.hash('password123', 10);

  const users = [
    {
      name: 'Shri Rajesh Patil',
      email: 'officer@maharashtra.gov.in',
      role: 'government',
      designation: 'Officer / Urban Development Dept.',
      deptId: 1,
      phone: '+91 98201 12345'
    },
    {
      name: 'Amit Deshmukh',
      email: 'greentech@startup.in',
      role: 'startup',
      designation: 'Founder & CEO, GreenTech Innovations',
      deptId: null,
      phone: '+91 98202 23456'
    },
    {
      name: 'Dr. Sunita Sharma',
      email: 'evaluator@maha.gov.in',
      role: 'evaluator',
      designation: 'Chief Technical Evaluator',
      deptId: 1,
      phone: '+91 98203 34567'
    },
    {
      name: 'MahaInnovate Admin',
      email: 'admin@mahinnovate.gov.in',
      role: 'admin',
      designation: 'System Administrator',
      deptId: null,
      phone: '+91 98204 45678'
    },
    {
      name: 'Priya Kulkarni',
      email: 'ecovision@startup.in',
      role: 'startup',
      designation: 'CTO, EcoVision Labs',
      deptId: null,
      phone: '+91 98205 56789'
    },
    {
      name: 'Vikas Shinde',
      email: 'cleancity@startup.in',
      role: 'startup',
      designation: 'Managing Director, CleanCity Solutions',
      deptId: null,
      phone: '+91 98206 67890'
    }
  ];

  for (const u of users) {
    await query(
      'INSERT INTO users (name, email, password_hash, role, designation, department_id, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [u.name, u.email, passwordHash, u.role, u.designation, u.deptId, u.phone]
    );
  }

  // 3. Startups
  // User ID 2: GreenTech Innovations
  await query(`
    INSERT INTO startups (
      user_id, company_name, logo_url, industry, technologies, team_size, founded_year,
      website, dpiit_number, certifications, previous_projects, about, address, city, state, verification_status
    ) VALUES (
      2, 'GreenTech Innovations', '/logos/greentech.svg', 'CleanTech',
      ARRAY['AI', 'IoT', 'Computer Vision'], 12, 2020,
      'www.greentech.in', 'DIPP12345',
      ARRAY['DPIIT Recognized', 'ISO 9001'],
      'Smart bin system for Pune Municipal Corporation',
      'We build AI-powered solutions for smart waste management to create cleaner and greener cities.',
      'Plot 42, Hinjawadi Phase 1', 'Pune', 'Maharashtra', 'VERIFIED'
    )
  `);

  // User ID 5: EcoVision Labs
  await query(`
    INSERT INTO startups (
      user_id, company_name, logo_url, industry, technologies, team_size, founded_year,
      website, dpiit_number, certifications, previous_projects, about, address, city, state, verification_status
    ) VALUES (
      5, 'EcoVision Labs', '/logos/ecovision.svg', 'CleanTech',
      ARRAY['AI', 'Computer Vision'], 8, 2021,
      'www.ecovisionlabs.io', 'DIPP23456',
      ARRAY['DPIIT Recognized', 'ISO 27001'],
      'Automated segregation camera pods in Thane',
      'Computer vision for waste segregation and environmental intelligence.',
      'Kothrud Tech Park', 'Pune', 'Maharashtra', 'VERIFIED'
    )
  `);

  // User ID 6: CleanCity Solutions
  await query(`
    INSERT INTO startups (
      user_id, company_name, logo_url, industry, technologies, team_size, founded_year,
      website, dpiit_number, certifications, previous_projects, about, address, city, state, verification_status
    ) VALUES (
      6, 'CleanCity Solutions', '/logos/cleancity.svg', 'Smart Cities',
      ARRAY['IoT', 'Waste Management'], 15, 2019,
      'www.cleancity.co.in', 'DIPP34567',
      ARRAY['DPIIT Recognized', 'CMMI Level 3'],
      'Smart municipal waste fleet monitoring in Nashik',
      'Smart municipal solutions for automated urban civic governance.',
      'MIDC Ambad', 'Nashik', 'Maharashtra', 'VERIFIED'
    )
  `);

  // 4. Challenges
  // Challenge 1: Smart Waste Management
  const ch1 = await query(`
    INSERT INTO challenges (
      department_id, created_by, title, problem_description, required_technologies,
      budget_inr, expected_duration, location, eligibility_criteria, required_deliverables,
      status, deadline
    ) VALUES (
      1, 1, 'Smart Waste Management',
      'AI-based waste segregation system for municipal areas to improve efficiency and reduce landfill waste.',
      ARRAY['AI', 'IoT', 'Environment'],
      1000000, '3 Months', 'Pune',
      'DPIIT recognized startups with proven machine learning or IoT prototypes.',
      'Automated classification hardware/software, dashboard, pilot report.',
      'PUBLISHED', '2026-10-20'
    ) RETURNING id
  `);
  const ch1Id = ch1.rows[0].id;

  // Challenge 2: Rural Healthcare Monitoring
  await query(`
    INSERT INTO challenges (
      department_id, created_by, title, problem_description, required_technologies,
      budget_inr, expected_duration, location, eligibility_criteria, required_deliverables,
      status, deadline
    ) VALUES (
      2, 1, 'Rural Healthcare Monitoring',
      'Remote health monitoring and diagnostic system for rural and tribal healthcare centers in Maharashtra.',
      ARRAY['IoT', 'Healthcare', 'Rural'],
      1500000, '6 Months', 'Gadchiroli & Amravati',
      'Biomedical or IoT health startups with field-tested tele-diagnostic equipment.',
      '10 edge diagnostic units, low-bandwidth cloud synchronization, health worker training.',
      'PUBLISHED', '2026-10-25'
    )
  `);

  // Challenge 3: AI Traffic Optimization
  await query(`
    INSERT INTO challenges (
      department_id, created_by, title, problem_description, required_technologies,
      budget_inr, expected_duration, location, eligibility_criteria, required_deliverables,
      status, deadline
    ) VALUES (
      3, 1, 'AI Traffic Flow Optimization',
      'Adaptive camera-based traffic signal timing to eliminate junction bottlenecks and reduce congestion.',
      ARRAY['AI', 'Computer Vision', 'Smart City'],
      2000000, '4 Months', 'Mumbai & Navi Mumbai',
      'Startups with traffic computer vision algorithms and edge processing.',
      'Computer vision traffic sensor pilots at 5 junctions, dynamic signal controller.',
      'PUBLISHED', '2026-11-15'
    )
  `);

  // 5. AI Requirement Analysis for Challenge 1
  await query(`
    INSERT INTO ai_requirement_analyses (
      challenge_id, domain, technologies, functional_requirements, non_functional_requirements,
      key_requirements, expected_solution, potential_impact, suggested_kpis, potential_risks,
      suggested_eligibility, suggested_deliverables
    ) VALUES (
      $1, 'Waste Management',
      ARRAY['Computer Vision', 'Machine Learning', 'IoT'],
      ARRAY['Real-time detection of wet, dry, and hazardous waste', 'Automated pneumatic sorting flap actuation', 'IoT fill-level monitoring'],
      ARRAY['Sub-second latency', '99% uptime', 'Weatherproof IP67 enclosure'],
      ARRAY['Real-time', 'Scalable', 'Low Cost'],
      'Automated waste classification and segregation mechanism at municipal bin level',
      'Cleaner cities, reduced landfill waste by 40%, lower municipal processing costs',
      '{"accuracy": "> 90%", "response_time": "< 2 sec", "cost_reduction": "> 15%", "user_satisfaction": "> 80%"}'::jsonb,
      ARRAY['Camera occlusion from dirt or dust', 'Irregular waste stream density', 'Intermittent cellular network in dense wards'],
      ARRAY['DPIIT Registered Startup', 'Prior IoT or Computer Vision proof of concept', 'Local Maharashtra support team'],
      ARRAY['Prototype deployment in 5 municipal ward bins', 'Real-time telemetry portal', 'Third-party safety certification']
    )
  `, [ch1Id]);

  // 6. Startup Matches
  await query(`
    INSERT INTO startup_matches (challenge_id, startup_id, match_score, breakdown_json, match_reasons, is_shortlisted)
    VALUES
    ($1, 1, 94.00, '{"tech": 30, "domain": 20, "experience": 15, "capability": 14, "budget": 10, "scalability": 5}'::jsonb, ARRAY['Direct Computer Vision & IoT expertise', 'Past project with Pune Municipal Corporation', 'Fully compatible with budget'], true),
    ($1, 2, 89.00, '{"tech": 28, "domain": 18, "experience": 13, "capability": 15, "budget": 10, "scalability": 5}'::jsonb, ARRAY['Strong Computer Vision models', 'ISO 27001 certified', 'Proven camera pods'], false),
    ($1, 3, 82.00, '{"tech": 24, "domain": 20, "experience": 15, "capability": 11, "budget": 8, "scalability": 4}'::jsonb, ARRAY['Extensive municipal fleet IoT experience', 'Large team', 'Strong hardware deployment'], false)
  `, [ch1Id]);

  // 7. Proposals
  const p1 = await query(`
    INSERT INTO proposals (
      challenge_id, startup_id, solution_name, solution_description, technology_used,
      implementation_plan, estimated_cost_inr, duration, previous_experience,
      proposal_pdf_url, certifications_url, status
    ) VALUES (
      $1, 1, 'Smart Bin & Automated Segregation AI System',
      'High-throughput computer vision edge system with automated classification into wet, dry, plastic, and recyclable streams.',
      ARRAY['AI', 'IoT', 'Computer Vision'],
      'Phase 1: Hardware sensor calibration; Phase 2: Pilot bin installation in 5 PMC wards; Phase 3: Telemetry sync and user training.',
      500000, '3 Months',
      'Deployed 50 smart bins with Pune Municipal Corporation with 92% classification accuracy.',
      '/uploads/greentech_proposal.pdf', '/uploads/greentech_iso9001.pdf', 'APPROVED_FOR_PILOT'
    ) RETURNING id
  `, [ch1Id]);
  const p1Id = p1.rows[0].id;

  // 8. Proposal Evaluation
  await query(`
    INSERT INTO evaluations (
      proposal_id, evaluator_id, technical_feasibility, innovation, cost_effectiveness,
      scalability, experience, implementation, security_compliance, overall_score, decision, remarks
    ) VALUES (
      $1, 3, 90.0, 95.0, 85.0, 92.0, 88.0, 86.0, 84.0, 91.2, 'APPROVED_FOR_PILOT',
      'Exceptional innovation and technically viable architecture. Excellent alignment with Maharashtra smart city priorities.'
    )
  `, [p1Id]);

  // 9. Pilots
  const pilot1 = await query(`
    INSERT INTO pilots (
      challenge_id, startup_id, proposal_id, project_name, location, duration,
      budget_inr, status, overall_completion, start_date, end_date
    ) VALUES (
      $1, 1, $2, 'Smart Waste Management - Pune Pilot', 'Pune', '3 Months',
      500000, 'ONGOING', 78, '2026-06-01', '2026-09-01'
    ) RETURNING id
  `, [ch1Id, p1Id]);
  const pilot1Id = pilot1.rows[0].id;

  // 10. Pilot Agreements
  await query(`
    INSERT INTO pilot_agreements (
      pilot_id, scope_of_work, data_ownership_clause, ip_clause, confidentiality_clause,
      liability_clause, termination_clause, government_accepted, startup_accepted
    ) VALUES (
      $1,
      'Deploy 10 AI-enabled waste classification units in Pune Ward 4 & 7. Monitor real-time segregation metrics for 90 days.',
      'All municipal telemetry data generated remains sole property of Government of Maharashtra.',
      'Startup retains core algorithmic IP; Government obtains non-exclusive irrevocable license for statewide municipal use.',
      'Mutual NDA adhered under Maharashtra State Cybersecurity & Data Protection Framework.',
      'Limited to pilot budget amount; standard force majeure clauses apply.',
      '30 days notice for material breach of KPI benchmarks.',
      true, true
    )
  `, [pilot1Id]);

  // 11. Pilot KPIs
  await query(`
    INSERT INTO pilot_kpis (pilot_id, kpi_name, target_condition, current_value, unit, is_achieved)
    VALUES
    ($1, 'Accuracy', '> 90%', '93%', '%', true),
    ($1, 'Response Time', '< 2 sec', '1.4 sec', 'sec', true),
    ($1, 'Cost Reduction', '> 15%', '18%', '%', true),
    ($1, 'User Satisfaction', '> 80%', '84%', '%', true)
  `, [pilot1Id]);

  // 12. Pilot Milestones
  await query(`
    INSERT INTO pilot_milestones (pilot_id, milestone_number, title, description, status, evidence_description, evidence_file_url, completed_at, verified_at)
    VALUES
    ($1, 1, 'Requirement Analysis', 'Detailed field survey of Pune Ward 4 & 7 waste disposal points and electrical specs', 'VERIFIED', 'Field survey report & site photos signed by Ward Officer', '/uploads/milestone_1_report.pdf', '2026-06-15', '2026-06-18'),
    ($1, 2, 'Prototype', 'Assembly and factory acceptance testing of 10 smart bin computer vision pods', 'VERIFIED', 'Hardware testing certificates and lab calibration video', '/uploads/milestone_2_test.pdf', '2026-07-05', '2026-07-08'),
    ($1, 3, 'Deployment', 'Physical on-site deployment in 10 designated waste centers', 'VERIFIED', 'Installation completion certificates from Pune Municipal Corporation', '/uploads/milestone_3_deploy.pdf', '2026-07-25', '2026-07-28'),
    ($1, 4, 'Testing', 'Continuous 45-day operational stress testing with real municipal waste streams', 'IN_PROGRESS', 'Weekly telemetry logs showing 93% accuracy across 42,000 items', '/uploads/milestone_4_log.pdf', null, null),
    ($1, 5, 'Final Evaluation', 'Independent validation and comprehensive pilot outcome report', 'PENDING', null, null, null, null)
  `, [pilot1Id]);

  // 13. Pilot Validation
  await query(`
    INSERT INTO pilot_validations (
      pilot_id, technical_performance, kpi_achievement, cost_efficiency, user_satisfaction,
      scalability, final_score, startup_report_summary, government_evaluation_summary,
      independent_validator_name, independent_validator_report, is_successful
    ) VALUES (
      $1, 93.0, 91.0, 88.0, 84.0, 84.0, 90.1,
      'System processed 120,000+ waste transactions with high reliability.',
      'Met and exceeded all pilot criteria set forth by Urban Development Dept.',
      'Prof. Aniruddh Joshi, IIT Bombay Innovation Council',
      'The edge vision architecture demonstrates robust resilience under high ambient dust and temperature variations.',
      true
    )
  `, [pilot1Id]);

  // 14. Procurements
  const proc1 = await query(`
    INSERT INTO procurements (
      pilot_id, challenge_id, startup_id, solution_name, pilot_score, approved_budget_inr,
      procurement_type, contract_duration, status, approved_by
    ) VALUES (
      $1, $2, 1, 'Smart Waste Management', 90.1, 2500000,
      'Direct / Approved Mechanism', '2 Years', 'PAYMENT_PROCESSING', 1
    ) RETURNING id
  `, [pilot1Id, ch1Id]);
  const proc1Id = proc1.rows[0].id;

  // 15. Purchase Orders & Contracts
  await query(`
    INSERT INTO purchase_orders (procurement_id, po_number, issue_date, total_amount_inr, status, file_url)
    VALUES ($1, 'PO-MAHA-2026-0042', '2026-10-15', 2500000, 'GENERATED', '/uploads/Purchase_Order_PO-MAHA-2026-0042.pdf')
  `, [proc1Id]);

  await query(`
    INSERT INTO contracts (procurement_id, contract_number, signed_date, effective_start, effective_end, status, file_url)
    VALUES ($1, 'CT-UDD-2026-889', '2026-10-19', '2026-11-01', '2028-10-31', 'SIGNED', '/uploads/Contract_CT-UDD-2026-889.pdf')
  `, [proc1Id]);

  // 16. Payments
  await query(`
    INSERT INTO payments (procurement_id, milestone_name, amount_inr, due_date, status, paid_at, invoice_file_url, receipt_file_url)
    VALUES
    ($1, 'Milestone 1 - Initial Hardware Setup', 100000, '2026-11-15', 'PAID', '2026-11-18', '/uploads/Invoice_MS1.pdf', '/uploads/Receipt_MS1.pdf'),
    ($1, 'Milestone 2 - Citywide Ward Integration', 150000, '2026-12-15', 'PAID', '2026-12-20', '/uploads/Invoice_MS2.pdf', '/uploads/Receipt_MS2.pdf'),
    ($1, 'Milestone 3 - Live Telemetry & Municipal Portal', 150000, '2027-01-15', 'APPROVED', null, '/uploads/Invoice_MS3.pdf', null),
    ($1, 'Milestone 4 - Annual Maintenance & Scalability Audit', 100000, '2027-03-15', 'UNDER_REVIEW', null, '/uploads/Invoice_MS4.pdf', null)
  `, [proc1Id]);

  // 17. Scaling Recommendations
  await query(`
    INSERT INTO scaling_recommendations (
      pilot_id, solution_name, department_name, district, similarity_score, tech_compatibility, expected_impact, status, expected_timeline
    ) VALUES
    ($1, 'Smart Waste Management', 'Pune Municipal Department', 'Pune', 95.0, 98.0, 'High', 'COMPLETED', '-'),
    ($1, 'Smart Waste Management', 'Nashik Municipal Department', 'Nashik', 91.0, 95.0, 'High', 'DEPLOYMENT', 'Dec 2026'),
    ($1, 'Smart Waste Management', 'Nagpur Municipal Department', 'Nagpur', 88.0, 92.0, 'High', 'APPROVAL', 'Jan 2027'),
    ($1, 'Smart Waste Management', 'Thane Municipal Department', 'Thane', 86.0, 90.0, 'High', 'PLANNED', 'Feb 2027'),
    ($1, 'Smart Waste Management', 'Aurangabad Municipal Department', 'Aurangabad (Chhatrapati Sambhajinagar)', 84.0, 89.0, 'High', 'PLANNED', 'Mar 2027')
  `, [pilot1Id]);

  // 18. Notifications
  await query(`
    INSERT INTO notifications (user_id, title, message, type, link_url, is_read)
    VALUES
    (1, 'New Proposal Received', 'GreenTech Innovations submitted a proposal for Smart Waste Management.', 'PROPOSAL', '/proposals/1', false),
    (1, 'Pilot Completed Stage', 'AI Traffic Monitoring completed milestone 3 with 98% telemetry uptime.', 'PILOT', '/pilots/1', false),
    (1, 'Challenge Published', 'Rural Healthcare Solution published successfully to startup marketplace.', 'CHALLENGE', '/challenges', true),
    (2, 'Pilot Approved', 'Congratulations! Your proposal for Smart Waste Management has been approved for a live pilot in Pune.', 'SUCCESS', '/pilots/1', false),
    (2, 'Payment Approved', 'Milestone 2 payment of ₹1,50,000 has been approved and processed.', 'PAYMENT', '/payments', false)
  `);

  // 19. Audit Logs
  await query(`
    INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, ip_address, created_at)
    VALUES
    (1, 'CHALLENGE_CREATED', 'CHALLENGE', '1', 'Created challenge: Smart Waste Management with budget 10,00,000 INR', '10.0.12.44', NOW() - INTERVAL '3 days'),
    (1, 'CHALLENGE_PUBLISHED', 'CHALLENGE', '1', 'Status changed from DRAFT to PUBLISHED', '10.0.12.44', NOW() - INTERVAL '2 days'),
    (2, 'PROPOSAL_SUBMITTED', 'PROPOSAL', '1', 'GreenTech Innovations submitted proposal for Smart Waste Management', '114.143.120.12', NOW() - INTERVAL '1 day'),
    (3, 'PROPOSAL_EVALUATED', 'EVALUATION', '1', 'Evaluated proposal with overall score 91.2/100 and approved for pilot', '10.0.14.88', NOW() - INTERVAL '18 hours'),
    (1, 'PILOT_CREATED', 'PILOT', '1', 'Created pilot project in Pune with 4 target KPIs and 5 milestones', '10.0.12.44', NOW() - INTERVAL '12 hours'),
    (1, 'PROCUREMENT_APPROVED', 'PROCUREMENT', '1', 'Approved 2-year public procurement contract under Approved Mechanism', '10.0.12.44', NOW() - INTERVAL '2 hours')
  `);

  console.log('Database seeded successfully!');
}

if (process.argv[1].endsWith('seed.ts') || process.argv[1].endsWith('seed.js')) {
  seedDb()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
