import { query } from '../db/index.js';

export async function createAuditLog(
  userId: number | null,
  action: string,
  entityType: string,
  entityId: string | number | null,
  details: string,
  ipAddress: string = '127.0.0.1'
) {
  try {
    await query(
      `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, action, entityType, entityId ? String(entityId) : null, details, ipAddress]
    );
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}

export async function createNotification(
  userId: number,
  title: string,
  message: string,
  type: string = 'INFO',
  linkUrl: string = ''
) {
  try {
    await query(
      `INSERT INTO notifications (user_id, title, message, type, link_url)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, title, message, type, linkUrl]
    );
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
}
