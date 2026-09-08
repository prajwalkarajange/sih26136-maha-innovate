import { Router, Response } from 'express';
import { query } from '../db/index.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { createAuditLog, createNotification } from '../middleware/audit.js';

const router = Router();

// List Procurements
router.get('/', async (req, res: Response) => {
  try {
    const result = await query(`
      SELECT pr.*, s.company_name, s.logo_url, c.title as challenge_title
      FROM procurements pr
      JOIN startups s ON pr.startup_id = s.id
      JOIN challenges c ON pr.challenge_id = c.id
      ORDER BY pr.created_at DESC
    `);
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch procurements' });
  }
});

// Single Procurement with PO, Contract, and Payments
router.get('/:id', async (req, res: Response) => {
  try {
    const { id } = req.params;

    const procRes = await query(
      `SELECT pr.*, s.company_name, s.logo_url, s.website, s.dpiit_number,
              po.po_number, po.issue_date as po_date, po.total_amount_inr as po_amount,
              ct.contract_number, ct.signed_date as contract_date
       FROM procurements pr
       JOIN startups s ON pr.startup_id = s.id
       LEFT JOIN purchase_orders po ON pr.id = po.procurement_id
       LEFT JOIN contracts ct ON pr.id = ct.procurement_id
       WHERE pr.id = $1`,
      [id]
    );

    if (procRes.rowCount === 0) {
      return res.status(404).json({ error: 'Procurement not found' });
    }

    const paymentsRes = await query(
      'SELECT * FROM payments WHERE procurement_id = $1 ORDER BY id ASC',
      [id]
    );

    return res.json({
      ...procRes.rows[0],
      payments: paymentsRes.rows,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch procurement details' });
  }
});

// Approve Procurement from Pilot
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      pilot_id = 1,
      challenge_id = 1,
      startup_id = 1,
      solution_name = 'Smart Waste Management',
      pilot_score = 90.1,
      approved_budget_inr = 2500000,
      procurement_type = 'Direct / Approved Mechanism',
      contract_duration = '2 Years',
    } = req.body;

    const procRes = await query(
      `INSERT INTO procurements (
        pilot_id, challenge_id, startup_id, solution_name, pilot_score, approved_budget_inr,
        procurement_type, contract_duration, status, approved_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'APPROVED', $9) RETURNING *`,
      [
        pilot_id,
        challenge_id,
        startup_id,
        solution_name,
        pilot_score,
        approved_budget_inr,
        procurement_type,
        contract_duration,
        req.user!.id,
      ]
    );

    const proc = procRes.rows[0];

    // Generate PO
    await query(
      `INSERT INTO purchase_orders (procurement_id, po_number, issue_date, total_amount_inr, status, file_url)
       VALUES ($1, 'PO-MAHA-2026-0042', '2026-10-15', $2, 'GENERATED', '/uploads/Purchase_Order_PO-MAHA-2026-0042.pdf')`,
      [proc.id, approved_budget_inr]
    );

    // Generate Contract
    await query(
      `INSERT INTO contracts (procurement_id, contract_number, signed_date, status, file_url)
       VALUES ($1, 'CT-UDD-2026-889', '2026-10-19', 'SIGNED', '/uploads/Contract_CT-UDD-2026-889.pdf')`,
      [proc.id]
    );

    // Generate 4 milestone payment schedules
    const payments = [
      { name: 'Milestone 1 - Initial Hardware Setup', amount: 100000, status: 'PAID' },
      { name: 'Milestone 2 - Citywide Ward Integration', amount: 150000, status: 'PAID' },
      { name: 'Milestone 3 - Live Telemetry & Municipal Portal', amount: 150000, status: 'APPROVED' },
      { name: 'Milestone 4 - Annual Maintenance & Scalability Audit', amount: 100000, status: 'UNDER_REVIEW' },
    ];
    for (const p of payments) {
      await query(
        `INSERT INTO payments (procurement_id, milestone_name, amount_inr, status)
         VALUES ($1, $2, $3, $4)`,
        [proc.id, p.name, p.amount, p.status]
      );
    }

    await createAuditLog(
      req.user!.id,
      'PROCUREMENT_APPROVED',
      'PROCUREMENT',
      proc.id,
      `Approved direct public procurement contract for ${solution_name}`
    );

    return res.status(201).json(proc);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to approve procurement' });
  }
});

// Update Milestone Payment Status
router.patch('/payments/:paymentId', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    const updateRes = await query(
      `UPDATE payments SET
        status = $1,
        paid_at = CASE WHEN $1 = 'PAID' THEN NOW() ELSE paid_at END
       WHERE id = $2 RETURNING *`,
      [status, paymentId]
    );

    return res.json(updateRes.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update payment status' });
  }
});

export default router;
