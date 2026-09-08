import { Router, Response } from 'express';
import { query } from '../db/index.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// List Scaling Recommendations
router.get('/', async (req, res: Response) => {
  try {
    const result = await query('SELECT * FROM scaling_recommendations ORDER BY id ASC');
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch scaling recommendations' });
  }
});

// Update Scaling Project Status
router.patch('/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateRes = await query(
      'UPDATE scaling_recommendations SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    return res.json(updateRes.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update scaling project' });
  }
});

export default router;
