import { Router, Response } from 'express';
import { query } from '../db/index.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { createAuditLog, createNotification } from '../middleware/audit.js';
import { AIService } from '../services/ai.service.js';

const router = Router();

// 1. List Challenges with search and filtering
router.get('/', async (req, res: Response) => {
  try {
    const { search, technology, status, department_id, limit = 50 } = req.query;

    let sql = `
      SELECT c.*, d.name as department_name, d.code as department_code,
             u.name as creator_name,
             (SELECT COUNT(*) FROM proposals p WHERE p.challenge_id = c.id) as proposal_count
      FROM challenges c
      LEFT JOIN departments d ON c.department_id = d.id
      LEFT JOIN users u ON c.created_by = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      params.push(status);
      sql += ` AND c.status = $${params.length}`;
    }

    if (department_id) {
      params.push(department_id);
      sql += ` AND c.department_id = $${params.length}`;
    }

    if (search) {
      params.push(`%${String(search).toLowerCase()}%`);
      sql += ` AND (LOWER(c.title) LIKE $${params.length} OR LOWER(c.problem_description) LIKE $${params.length})`;
    }

    if (technology) {
      params.push(`%${String(technology).toLowerCase()}%`);
      sql += ` AND EXISTS (
        SELECT 1 FROM unnest(c.required_technologies) tech
        WHERE LOWER(tech) LIKE $${params.length}
      )`;
    }

    sql += ' ORDER BY c.created_at DESC LIMIT $' + (params.length + 1);
    params.push(Number(limit));

    const result = await query(sql, params);
    return res.json(result.rows);
  } catch (err) {
    console.error('Error fetching challenges:', err);
    return res.status(500).json({ error: 'Failed to fetch challenges' });
  }
});

// 2. Get Single Challenge with Department, AI Analysis, and Matching Startups
router.get('/:id', async (req, res: Response) => {
  try {
    const { id } = req.params;

    const challengeRes = await query(
      `SELECT c.*, d.name as department_name, d.code as department_code,
              u.name as creator_name
       FROM challenges c
       LEFT JOIN departments d ON c.department_id = d.id
       LEFT JOIN users u ON c.created_by = u.id
       WHERE c.id = $1`,
      [id]
    );

    if (challengeRes.rowCount === 0) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    const challenge = challengeRes.rows[0];

    // Increment views
    await query('UPDATE challenges SET views_count = views_count + 1 WHERE id = $1', [id]);

    // Fetch AI Analysis if exists
    const analysisRes = await query('SELECT * FROM ai_requirement_analyses WHERE challenge_id = $1', [id]);
    const aiAnalysis = analysisRes.rowCount > 0 ? analysisRes.rows[0] : null;

    // Fetch Matches if exists
    const matchesRes = await query(
      `SELECT sm.*, s.company_name, s.logo_url, s.industry, s.technologies, s.city, s.is_dpiit_recognized
       FROM startup_matches sm
       JOIN startups s ON sm.startup_id = s.id
       WHERE sm.challenge_id = $1
       ORDER BY sm.match_score DESC`,
      [id]
    );

    return res.json({
      ...challenge,
      aiAnalysis,
      matches: matchesRes.rows,
    });
  } catch (err) {
    console.error('Error fetching challenge:', err);
    return res.status(500).json({ error: 'Failed to fetch challenge details' });
  }
});

// 3. Create Challenge (Government Officer)
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      problem_description,
      required_technologies,
      budget_inr,
      expected_duration,
      location,
      eligibility_criteria,
      required_deliverables,
      deadline,
      status = 'DRAFT',
    } = req.body;

    if (!title || !problem_description || !budget_inr) {
      return res.status(400).json({ error: 'Title, problem description, and budget are required' });
    }

    const deptId = req.user!.department_id || 1;
    const techArray = Array.isArray(required_technologies)
      ? required_technologies
      : (required_technologies ? [required_technologies] : ['AI', 'IoT']);

    const insertRes = await query(
      `INSERT INTO challenges (
        department_id, created_by, title, problem_description, required_technologies,
        budget_inr, expected_duration, location, eligibility_criteria, required_deliverables,
        deadline, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        deptId,
        req.user!.id,
        title,
        problem_description,
        techArray,
        Number(budget_inr),
        expected_duration || '3 Months',
        location || 'Maharashtra',
        eligibility_criteria || 'DPIIT recognized startup',
        required_deliverables || 'Working prototype and pilot report',
        deadline || '2026-12-31',
        status,
      ]
    );

    const newChallenge = insertRes.rows[0];

    await createAuditLog(
      req.user!.id,
      'CHALLENGE_CREATED',
      'CHALLENGE',
      newChallenge.id,
      `Created challenge: ${title} (Status: ${status})`
    );

    return res.status(201).json(newChallenge);
  } catch (err: any) {
    console.error('Error creating challenge:', err);
    return res.status(500).json({ error: 'Failed to create challenge' });
  }
});

// 4. Update Status (e.g. Publish Challenge)
router.patch('/:id/status', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['DRAFT', 'UNDER_ANALYSIS', 'READY_FOR_REVIEW', 'PUBLISHED', 'CLOSED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateRes = await query(
      `UPDATE challenges SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (updateRes.rowCount === 0) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    const updated = updateRes.rows[0];

    await createAuditLog(
      req.user!.id,
      'CHALLENGE_STATUS_UPDATED',
      'CHALLENGE',
      id,
      `Updated challenge status to ${status}`
    );

    // If published, notify all verified startups
    if (status === 'PUBLISHED') {
      const startups = await query('SELECT user_id FROM startups WHERE verification_status = $1', ['VERIFIED']);
      for (const st of startups.rows) {
        await createNotification(
          st.user_id,
          'New Challenge Published',
          `New challenge published: "${updated.title}". Check your eligibility and apply!`,
          'CHALLENGE',
          `/marketplace`
        );
      }
    }

    return res.json(updated);
  } catch (err) {
    console.error('Error updating status:', err);
    return res.status(500).json({ error: 'Failed to update challenge status' });
  }
});

// 5. Run AI Requirement Analysis on a Challenge
router.post('/:id/analyze', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const challengeRes = await query('SELECT * FROM challenges WHERE id = $1', [id]);

    if (challengeRes.rowCount === 0) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    const ch = challengeRes.rows[0];
    const analysis = await AIService.analyzeRequirement(ch.title, ch.problem_description);

    // Upsert into ai_requirement_analyses
    const existing = await query('SELECT id FROM ai_requirement_analyses WHERE challenge_id = $1', [id]);

    let savedAnalysis;
    if (existing.rowCount > 0) {
      const updateRes = await query(
        `UPDATE ai_requirement_analyses SET
          domain = $1, technologies = $2, functional_requirements = $3, non_functional_requirements = $4,
          key_requirements = $5, expected_solution = $6, potential_impact = $7, suggested_kpis = $8,
          potential_risks = $9, suggested_eligibility = $10, suggested_deliverables = $11
         WHERE challenge_id = $12 RETURNING *`,
        [
          analysis.domain,
          analysis.technologies,
          analysis.functionalRequirements,
          analysis.nonFunctionalRequirements,
          analysis.keyRequirements,
          analysis.expectedSolution,
          analysis.potentialImpact,
          JSON.stringify(analysis.suggestedKpis),
          analysis.potentialRisks,
          analysis.suggestedEligibility,
          analysis.suggestedDeliverables,
          id,
        ]
      );
      savedAnalysis = updateRes.rows[0];
    } else {
      const insertRes = await query(
        `INSERT INTO ai_requirement_analyses (
          challenge_id, domain, technologies, functional_requirements, non_functional_requirements,
          key_requirements, expected_solution, potential_impact, suggested_kpis,
          potential_risks, suggested_eligibility, suggested_deliverables
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [
          id,
          analysis.domain,
          analysis.technologies,
          analysis.functionalRequirements,
          analysis.nonFunctionalRequirements,
          analysis.keyRequirements,
          analysis.expectedSolution,
          analysis.potentialImpact,
          JSON.stringify(analysis.suggestedKpis),
          analysis.potentialRisks,
          analysis.suggestedEligibility,
          analysis.suggestedDeliverables,
        ]
      );
      savedAnalysis = insertRes.rows[0];
    }

    // Auto calculate matches for all startups
    const allStartups = await query('SELECT * FROM startups');
    for (const startup of allStartups.rows) {
      const match = AIService.calculateMatchScore(ch, startup);
      await query(
        `INSERT INTO startup_matches (challenge_id, startup_id, match_score, breakdown_json, match_reasons)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (challenge_id, startup_id)
         DO UPDATE SET match_score = $3, breakdown_json = $4, match_reasons = $5`,
        [id, startup.id, match.matchScore, JSON.stringify(match.breakdown), match.matchReasons]
      );
    }

    await createAuditLog(
      req.user!.id,
      'AI_REQUIREMENT_ANALYSIS',
      'CHALLENGE',
      id,
      `Ran AI requirement analysis for challenge ${id}`
    );

    return res.json(savedAnalysis);
  } catch (err: any) {
    console.error('Error analyzing requirement:', err);
    return res.status(500).json({ error: 'AI Requirement Analysis failed' });
  }
});

// 6. Get AI Startup Matches for Challenge
router.get('/:id/matches', async (req, res: Response) => {
  try {
    const { id } = req.params;

    const matchesRes = await query(
      `SELECT sm.*, s.company_name, s.logo_url, s.industry, s.technologies,
              s.city, s.team_size, s.founded_year, s.is_dpiit_recognized, s.about, s.website
       FROM startup_matches sm
       JOIN startups s ON sm.startup_id = s.id
       WHERE sm.challenge_id = $1
       ORDER BY sm.match_score DESC`,
      [id]
    );

    return res.json(matchesRes.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch startup matches' });
  }
});

export default router;
