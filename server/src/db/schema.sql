-- MahInnovate PostgreSQL Database Schema
-- Problem Statement ID 26136: Startup-friendly public procurement mechanism

-- 1. Departments
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    contact_email VARCHAR(255),
    budget_allocated NUMERIC(15, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users (Government Officers, Startups, Evaluators, Admins)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('government', 'startup', 'evaluator', 'admin')),
    designation VARCHAR(150),
    department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
    phone VARCHAR(50),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Startups
CREATE TABLE IF NOT EXISTS startups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    industry VARCHAR(150) NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    team_size INTEGER DEFAULT 1,
    founded_year INTEGER,
    website VARCHAR(255),
    dpiit_number VARCHAR(100),
    is_dpiit_recognized BOOLEAN DEFAULT TRUE,
    certifications TEXT[] NOT NULL DEFAULT '{}',
    previous_projects TEXT,
    about TEXT,
    address TEXT,
    city VARCHAR(100) DEFAULT 'Mumbai',
    state VARCHAR(100) DEFAULT 'Maharashtra',
    verification_status VARCHAR(50) DEFAULT 'VERIFIED' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Startup Documents
CREATE TABLE IF NOT EXISTS startup_documents (
    id SERIAL PRIMARY KEY,
    startup_id INTEGER REFERENCES startups(id) ON DELETE CASCADE,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Challenges
CREATE TABLE IF NOT EXISTS challenges (
    id SERIAL PRIMARY KEY,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    problem_description TEXT NOT NULL,
    required_technologies TEXT[] NOT NULL DEFAULT '{}',
    budget_inr NUMERIC(15, 2) NOT NULL,
    expected_duration VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    eligibility_criteria TEXT,
    required_deliverables TEXT,
    status VARCHAR(50) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'UNDER_ANALYSIS', 'READY_FOR_REVIEW', 'PUBLISHED', 'CLOSED')),
    deadline DATE,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. AI Requirement Analyses
CREATE TABLE IF NOT EXISTS ai_requirement_analyses (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER UNIQUE REFERENCES challenges(id) ON DELETE CASCADE,
    domain VARCHAR(150),
    technologies TEXT[],
    functional_requirements TEXT[],
    non_functional_requirements TEXT[],
    key_requirements TEXT[],
    expected_solution TEXT,
    potential_impact TEXT,
    suggested_kpis JSONB,
    potential_risks TEXT[],
    suggested_eligibility TEXT[],
    suggested_deliverables TEXT[],
    raw_ai_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Startup Matches & Recommendations
CREATE TABLE IF NOT EXISTS startup_matches (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    startup_id INTEGER REFERENCES startups(id) ON DELETE CASCADE,
    match_score NUMERIC(5, 2) NOT NULL,
    breakdown_json JSONB,
    match_reasons TEXT[],
    is_shortlisted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(challenge_id, startup_id)
);

-- 8. Proposals
CREATE TABLE IF NOT EXISTS proposals (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    startup_id INTEGER REFERENCES startups(id) ON DELETE CASCADE,
    solution_name VARCHAR(255) NOT NULL,
    solution_description TEXT NOT NULL,
    technology_used TEXT[] NOT NULL DEFAULT '{}',
    implementation_plan TEXT NOT NULL,
    estimated_cost_inr NUMERIC(15, 2) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    previous_experience TEXT,
    proposal_pdf_url TEXT,
    certifications_url TEXT,
    technical_doc_url TEXT,
    status VARCHAR(50) DEFAULT 'SUBMITTED' CHECK (status IN ('DRAFT', 'SUBMITTED', 'ELIGIBILITY_CHECK', 'UNDER_EVALUATION', 'SHORTLISTED', 'CLARIFICATION_REQUIRED', 'APPROVED_FOR_PILOT', 'REJECTED')),
    clarification_notes TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Proposal Evaluations
CREATE TABLE IF NOT EXISTS evaluations (
    id SERIAL PRIMARY KEY,
    proposal_id INTEGER UNIQUE REFERENCES proposals(id) ON DELETE CASCADE,
    evaluator_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    technical_feasibility NUMERIC(5, 2) DEFAULT 0,
    innovation NUMERIC(5, 2) DEFAULT 0,
    cost_effectiveness NUMERIC(5, 2) DEFAULT 0,
    scalability NUMERIC(5, 2) DEFAULT 0,
    experience NUMERIC(5, 2) DEFAULT 0,
    implementation NUMERIC(5, 2) DEFAULT 0,
    security_compliance NUMERIC(5, 2) DEFAULT 0,
    overall_score NUMERIC(5, 2) NOT NULL,
    remarks TEXT,
    decision VARCHAR(50) DEFAULT 'PENDING' CHECK (decision IN ('PENDING', 'APPROVED_FOR_PILOT', 'CLARIFICATION_REQUIRED', 'REJECTED')),
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Pilots
CREATE TABLE IF NOT EXISTS pilots (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    startup_id INTEGER REFERENCES startups(id) ON DELETE CASCADE,
    proposal_id INTEGER REFERENCES proposals(id) ON DELETE SET NULL,
    project_name VARCHAR(255) NOT NULL,
    location VARCHAR(150) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    budget_inr NUMERIC(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'ONGOING' CHECK (status IN ('PLANNED', 'AGREEMENT_PENDING', 'ONGOING', 'MILESTONE_REVIEW', 'VALIDATION', 'SUCCESSFUL', 'UNSUCCESSFUL')),
    overall_completion INTEGER DEFAULT 0 CHECK (overall_completion >= 0 AND overall_completion <= 100),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Pilot Agreements & Compliance
CREATE TABLE IF NOT EXISTS pilot_agreements (
    id SERIAL PRIMARY KEY,
    pilot_id INTEGER UNIQUE REFERENCES pilots(id) ON DELETE CASCADE,
    scope_of_work TEXT NOT NULL,
    data_ownership_clause TEXT NOT NULL,
    ip_clause TEXT NOT NULL,
    confidentiality_clause TEXT NOT NULL,
    liability_clause TEXT NOT NULL,
    termination_clause TEXT NOT NULL,
    government_accepted BOOLEAN DEFAULT TRUE,
    startup_accepted BOOLEAN DEFAULT TRUE,
    agreement_pdf_url TEXT,
    accepted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Pilot KPIs
CREATE TABLE IF NOT EXISTS pilot_kpis (
    id SERIAL PRIMARY KEY,
    pilot_id INTEGER REFERENCES pilots(id) ON DELETE CASCADE,
    kpi_name VARCHAR(255) NOT NULL,
    target_condition VARCHAR(100) NOT NULL,
    current_value VARCHAR(100) NOT NULL,
    unit VARCHAR(50),
    is_achieved BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Pilot Milestones & Evidence
CREATE TABLE IF NOT EXISTS pilot_milestones (
    id SERIAL PRIMARY KEY,
    pilot_id INTEGER REFERENCES pilots(id) ON DELETE CASCADE,
    milestone_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'VERIFIED')),
    evidence_description TEXT,
    evidence_file_url TEXT,
    verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    verified_at TIMESTAMP WITH TIME ZONE
);

-- 14. Pilot Final Evaluations & Independent Validation
CREATE TABLE IF NOT EXISTS pilot_validations (
    id SERIAL PRIMARY KEY,
    pilot_id INTEGER UNIQUE REFERENCES pilots(id) ON DELETE CASCADE,
    technical_performance NUMERIC(5, 2) DEFAULT 0,
    kpi_achievement NUMERIC(5, 2) DEFAULT 0,
    cost_efficiency NUMERIC(5, 2) DEFAULT 0,
    user_satisfaction NUMERIC(5, 2) DEFAULT 0,
    scalability NUMERIC(5, 2) DEFAULT 0,
    final_score NUMERIC(5, 2) NOT NULL,
    startup_report_summary TEXT,
    government_evaluation_summary TEXT,
    independent_validator_name VARCHAR(150),
    independent_validator_report TEXT,
    is_successful BOOLEAN DEFAULT TRUE,
    validation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Procurements
CREATE TABLE IF NOT EXISTS procurements (
    id SERIAL PRIMARY KEY,
    pilot_id INTEGER REFERENCES pilots(id) ON DELETE SET NULL,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    startup_id INTEGER REFERENCES startups(id) ON DELETE CASCADE,
    solution_name VARCHAR(255) NOT NULL,
    pilot_score NUMERIC(5, 2) NOT NULL,
    approved_budget_inr NUMERIC(15, 2) NOT NULL,
    procurement_type VARCHAR(150) DEFAULT 'Direct / Approved Mechanism',
    contract_duration VARCHAR(100) DEFAULT '2 Years',
    status VARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'PO_GENERATED', 'CONTRACT_PENDING', 'CONTRACT_SIGNED', 'PAYMENT_PROCESSING', 'COMPLETED')),
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. Purchase Orders & Contracts
CREATE TABLE IF NOT EXISTS purchase_orders (
    id SERIAL PRIMARY KEY,
    procurement_id INTEGER REFERENCES procurements(id) ON DELETE CASCADE,
    po_number VARCHAR(100) UNIQUE NOT NULL,
    issue_date DATE NOT NULL,
    total_amount_inr NUMERIC(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'GENERATED',
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contracts (
    id SERIAL PRIMARY KEY,
    procurement_id INTEGER REFERENCES procurements(id) ON DELETE CASCADE,
    contract_number VARCHAR(100) UNIQUE NOT NULL,
    signed_date DATE,
    effective_start DATE,
    effective_end DATE,
    status VARCHAR(50) DEFAULT 'SIGNED',
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. Milestone Payments
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    procurement_id INTEGER REFERENCES procurements(id) ON DELETE CASCADE,
    milestone_name VARCHAR(255) NOT NULL,
    amount_inr NUMERIC(15, 2) NOT NULL,
    due_date DATE,
    status VARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PAID', 'REJECTED')),
    invoice_file_url TEXT,
    receipt_file_url TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. Scaling Recommendations & Projects
CREATE TABLE IF NOT EXISTS scaling_recommendations (
    id SERIAL PRIMARY KEY,
    pilot_id INTEGER REFERENCES pilots(id) ON DELETE CASCADE,
    solution_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    similarity_score NUMERIC(5, 2) NOT NULL,
    tech_compatibility NUMERIC(5, 2) NOT NULL,
    expected_impact VARCHAR(50) DEFAULT 'High',
    status VARCHAR(50) DEFAULT 'PLANNED' CHECK (status IN ('RECOMMENDED', 'PLANNED', 'APPROVAL', 'DEPLOYMENT', 'COMPLETED')),
    expected_timeline VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 19. Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'INFO',
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 20. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    details TEXT,
    ip_address VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
