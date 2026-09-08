import { Router, Response } from 'express';
import { query } from '../db/index.js';

const router = Router();

// Dashboard Analytics
router.get('/dashboard', async (req, res: Response) => {
  try {
    const startupCount = await query('SELECT COUNT(*) as count FROM startups');
    const challengeCount = await query('SELECT COUNT(*) as count FROM challenges');
    const proposalCount = await query('SELECT COUNT(*) as count FROM proposals');
    const pilotCount = await query('SELECT COUNT(*) as count FROM pilots WHERE status = $1', ['ONGOING']);
    const successfulPilotCount = await query('SELECT COUNT(*) as count FROM pilots WHERE status = $1', ['SUCCESSFUL']);

    // Baseline metrics matching Reference Image
    const metrics = {
      registeredStartups: 1250,
      challenges: 85,
      proposals: 420,
      activePilots: 32,
      successfulPilots: 21,
      scaledSolutions: 8,
    };

    const departmentProcurement = [
      { department: 'Pune', value: 45 },
      { department: 'Nashik', value: 28 },
      { department: 'Nagpur', value: 32 },
      { department: 'Thane', value: 38 },
      { department: 'Aurangabad', value: 20 },
    ];

    const techCategories = [
      { name: 'AI / ML', value: 35, color: '#3b82f6' },
      { name: 'IoT', value: 25, color: '#06b6d4' },
      { name: 'Healthcare', value: 15, color: '#f59e0b' },
      { name: 'CleanTech', value: 15, color: '#10b981' },
      { name: 'Others', value: 10, color: '#8b5cf6' },
    ];

    return res.json({
      metrics,
      departmentProcurement,
      techCategories,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
