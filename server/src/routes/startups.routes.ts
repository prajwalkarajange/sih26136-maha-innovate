import { Router, Response } from 'express';
import { query } from '../db/index.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { createAuditLog } from '../middleware/audit.js';

const router = Router();

// List Startups
router.get('/', async (req, res: Response) => {
  try {
    const { search, industry, verified } = req.query;

    let sql = 'SELECT * FROM startups WHERE 1=1';
    const params: any[] = [];

    if (verified === 'true') {
      params.push('VERIFIED');
      sql += ` AND verification_status = $${params.length}`;
    }

    if (industry) {
      params.push(industry);
      sql += ` AND industry = $${params.length}`;
    }

    if (search) {
      params.push(`%${String(search).toLowerCase()}%`);
      sql += ` AND (LOWER(company_name) LIKE $${params.length} OR LOWER(about) LIKE $${params.length})`;
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch startups' });
  }
});

// Single Startup Profile
router.get('/:id', async (req, res: Response) => {
  try {
    const { id } = req.params;

    const startupRes = await query('SELECT * FROM startups WHERE id = $1', [id]);
    if (startupRes.rowCount === 0) {
      return res.status(404).json({ error: 'Startup not found' });
    }

    const startup = startupRes.rows[0];

    // Fetch documents
    const docsRes = await query('SELECT * FROM startup_documents WHERE startup_id = $1', [id]);

    // Fetch proposals/pilots
    const proposalsRes = await query(
      `SELECT p.*, c.title as challenge_title
       FROM proposals p
       JOIN challenges c ON p.challenge_id = c.id
       WHERE p.startup_id = $1`,
      [id]
    );

    const pilotsRes = await query('SELECT * FROM pilots WHERE startup_id = $1', [id]);

    return res.json({
      ...startup,
      documents: docsRes.rows,
      proposals: proposalsRes.rows,
      pilots: pilotsRes.rows,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch startup profile' });
  }
});

// Shortlist toggle
router.post('/:id/shortlist', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { challenge_id, shortlisted } = req.body;

    if (!challenge_id) {
      return res.status(400).json({ error: 'challenge_id required' });
    }

    const updateRes = await query(
      `UPDATE startup_matches
       SET is_shortlisted = $1
       WHERE challenge_id = $2 AND startup_id = $3
       RETURNING *`,
      [shortlisted, challenge_id, id]
    );

    await createAuditLog(
      req.user!.id,
      'STARTUP_SHORTLISTED',
      'STARTUP',
      id,
      `Startup ${id} ${shortlisted ? 'shortlisted' : 'removed from shortlist'} for challenge ${challenge_id}`
    );

    return res.json({ success: true, match: updateRes.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update shortlist status' });
  }
});

export default router;
