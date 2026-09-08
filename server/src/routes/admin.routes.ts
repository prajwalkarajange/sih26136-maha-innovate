import { Router, Response } from 'express';
import { query } from '../db/index.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Admin Dashboard stats
router.get('/dashboard', async (req, res: Response) => {
  try {
    const stats = {
      totalUsers: 1250,
      startups: 650,
      departments: 85,
      challenges: 420,
    };
    return res.json(stats);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch admin dashboard' });
  }
});

// Admin Audit Logs
router.get('/audit-logs', async (req, res: Response) => {
  try {
    const result = await query(
      `SELECT al.*, u.email as user_email
       FROM audit_logs al
       LEFT JOIN users u ON al.user_id = u.id
       ORDER BY al.created_at DESC
       LIMIT 100`
    );
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

export default router;
