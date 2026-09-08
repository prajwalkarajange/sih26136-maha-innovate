import { PGlite } from '@electric-sql/pglite';
import pg from 'pg';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

let pgliteInstance: PGlite | null = null;
let pgPoolInstance: pg.Pool | null = null;

const dbDataDir = path.resolve(process.cwd(), process.env.DATABASE_PATH || './data/mahinnovate_pg');

if (!fs.existsSync(dbDataDir)) {
  fs.mkdirSync(dbDataDir, { recursive: true });
}

export async function getDb() {
  if (process.env.DATABASE_URL) {
    if (!pgPoolInstance) {
      pgPoolInstance = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
      });
      console.log('Connected to PostgreSQL via DATABASE_URL');
    }
    return {
      type: 'pg' as const,
      pool: pgPoolInstance,
    };
  }

  if (!pgliteInstance) {
    pgliteInstance = new PGlite(dbDataDir);
    await pgliteInstance.waitReady;
    console.log(`Connected to Embedded PostgreSQL (PGlite) at: ${dbDataDir}`);
  }

  return {
    type: 'pglite' as const,
    db: pgliteInstance,
  };
}

export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<{ rows: T[]; rowCount: number }> {
  const dbContext = await getDb();

  if (dbContext.type === 'pg') {
    const result = await dbContext.pool.query(sql, params);
    return {
      rows: result.rows as T[],
      rowCount: result.rowCount || 0,
    };
  } else {
    // PGlite handles parameterized queries standardly
    const result = await dbContext.db.query<T>(sql, params);
    return {
      rows: result.rows,
      rowCount: result.rows.length,
    };
  }
}

export async function execSql(sql: string): Promise<void> {
  const dbContext = await getDb();
  if (dbContext.type === 'pg') {
    await dbContext.pool.query(sql);
  } else {
    await dbContext.db.exec(sql);
  }
}
