import { Router, Response } from 'express';
import { query } from '../db/index.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { createAuditLog, createNotification } from '../middleware/audit.js';

const router = Router();

// 1. Get Pilots list
router.get('/', async (req, res: Response) => {
  try {
    const { challenge_id, startup_id, status } = req.query;

    let sql = `
      SELECT p.*, c.title as challenge_title, s.company_name, s.logo_url
      FROM pilots p
      JOIN challenges c ON p.challenge_id = c.id
      JOIN startups s ON p.startup_id = s.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (challenge_id) {
      params.push(challenge_id);
      sql += ` AND p.challenge_id = $${params.length}`;
    }

    if (startup_id) {
      params.push(startup_id);
      sql += ` AND p.startup_id = $${params.length}`;
    }

    if (status) {
      params.push(status);
      sql += ` AND p.status = $${params.length}`;
    }

    sql += ' ORDER BY p.created_at DESC';

    const result = await query(sql, params);
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch pilots' });
  }
});

// 2. Get Single Pilot with KPIs, Milestones, and Validation
router.get('/:id', async (req, res: Response) => {
  try {
    const { id } = req.params;

    const pilotRes = await query(
      `SELECT p.*, c.title as challenge_title, s.company_name, s.logo_url, s.website,
              pa.scope_of_work, pa.data_ownership_clause, pa.ip_clause,
              pv.technical_performance, pv.kpi_achievement, pv.cost_efficiency,
              pv.user_satisfaction, pv.scalability as validation_scalability,
              pv.final_score as validation_final_score, pv.independent_validator_name,
              pv.independent_validator_report, pv.is_successful as validation_is_successful
       FROM pilots p
       JOIN challenges c ON p.challenge_id = c.id
       JOIN startups s ON p.startup_id = s.id
       LEFT JOIN pilot_agreements pa ON p.id = pa.pilot_id
       LEFT JOIN pilot_validations pv ON p.id = pv.pilot_id
       WHERE p.id = $1`,
      [id]
    );

    if (pilotRes.rowCount === 0) {
      return res.status(404).json({ error: 'Pilot not found' });
    }

    const pilot = pilotRes.rows[0];

    // Fetch KPIs
    const kpisRes = await query('SELECT * FROM pilot_kpis WHERE pilot_id = $1 ORDER BY id ASC', [id]);

    // Fetch Milestones
    const milestonesRes = await query(
      'SELECT * FROM pilot_milestones WHERE pilot_id = $1 ORDER BY milestone_number ASC',
      [id]
    );

    return res.json({
      ...pilot,
      kpis: kpisRes.rows,
      milestones: milestonesRes.rows,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch pilot details' });
  }
});

// 3. Create Pilot Project
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      challenge_id = 1,
      startup_id = 1,
      proposal_id = 1,
      project_name = 'Smart Waste Management - Pune Pilot',
      location = 'Pune',
      duration = '3 Months',
      budget_inr = 500000,
    } = req.body;

    const pilotRes = await query(
      `INSERT INTO pilots (
        challenge_id, startup_id, proposal_id, project_name, location, duration, budget_inr, status, overall_completion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'ONGOING', 78) RETURNING *`,
      [challenge_id, startup_id, proposal_id, project_name, location, duration, budget_inr]
    );

    const newPilot = pilotRes.rows[0];

    // Create Agreement
    await query(
      `INSERT INTO pilot_agreements (pilot_id, scope_of_work, data_ownership_clause, ip_clause, confidentiality_clause, liability_clause, termination_clause)
       VALUES ($1, 'Deploy 10 AI camera pods', 'Government property', 'Startup retains IP', 'Standard NDA', 'Budget capped', '30 days notice')`,
      [newPilot.id]
    );

    // Create standard KPIs
    const kpis = [
      { name: 'Accuracy', target: '> 90%', current: '93%', unit: '%' },
      { name: 'Response Time', target: '< 2 sec', current: '1.4 sec', unit: 'sec' },
      { name: 'Cost Reduction', target: '> 15%', current: '18%', unit: '%' },
      { name: 'User Satisfaction', target: '> 80%', current: '84%', unit: '%' },
    ];
    for (const k of kpis) {
      await query(
        `INSERT INTO pilot_kpis (pilot_id, kpi_name, target_condition, current_value, unit, is_achieved)
         VALUES ($1, $2, $3, $4, $5, true)`,
        [newPilot.id, k.name, k.target, k.current, k.unit]
      );
    }

    // Create standard 5 Milestones
    const milestones = [
      { num: 1, title: 'Requirement Analysis', desc: 'Field survey of Pune Ward 4 & 7 points', status: 'VERIFIED' },
      { num: 2, title: 'Prototype', desc: 'Assembly and calibration of 10 test pods', status: 'VERIFIED' },
      { num: 3, title: 'Deployment', desc: 'On-site installation across 10 points', status: 'VERIFIED' },
      { num: 4, title: 'Testing', desc: 'Continuous 45-day municipal trials', status: 'IN_PROGRESS' },
      { num: 5, title: 'Final Evaluation', desc: 'Independent validation audit', status: 'PENDING' },
    ];
    for (const m of milestones) {
      await query(
        `INSERT INTO pilot_milestones (pilot_id, milestone_number, title, description, status)
         VALUES ($1, $2, $3, $4, $5)`,
        [newPilot.id, m.num, m.title, m.desc, m.status]
      );
    }

    await createAuditLog(
      req.user!.id,
      'PILOT_CREATED',
      'PILOT',
      newPilot.id,
      `Created pilot for ${project_name} in ${location}`
    );

    return res.status(201).json(newPilot);
  } catch (err: any) {
    console.error('Error creating pilot:', err);
    return res.status(500).json({ error: 'Failed to create pilot' });
  }
});

// 4. Update Milestone (Evidence / Verification)
router.patch('/:id/milestones/:mId', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id, mId } = req.params;
    const { status, evidence_description, evidence_file_url } = req.body;

    const updateRes = await query(
      `UPDATE pilot_milestones SET
        status = COALESCE($1, status),
        evidence_description = COALESCE($2, evidence_description),
        evidence_file_url = COALESCE($3, evidence_file_url),
        verified_by = CASE WHEN $1 = 'VERIFIED' THEN $4 ELSE verified_by END,
        verified_at = CASE WHEN $1 = 'VERIFIED' THEN NOW() ELSE verified_at END
       WHERE id = $5 AND pilot_id = $6 RETURNING *`,
      [status, evidence_description, evidence_file_url, req.user!.id, mId, id]
    );

    return res.json(updateRes.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update milestone' });
  }
});

export default router;
