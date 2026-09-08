import fs from 'fs';
import path from 'path';
import { execSql, getDb } from './index.js';

export async function initDb() {
  console.log('Initializing PostgreSQL database schema...');
  await getDb();

  const possiblePaths = [
    path.resolve(process.cwd(), './src/db/schema.sql'),
    path.resolve(process.cwd(), './dist/db/schema.sql'),
    typeof __dirname !== 'undefined' ? path.resolve(__dirname, 'schema.sql') : '',
    typeof __dirname !== 'undefined' ? path.resolve(__dirname, '../../src/db/schema.sql') : '',
  ].filter(Boolean);

  let schemaSql = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      schemaSql = fs.readFileSync(p, 'utf8');
      break;
    }
  }

  if (!schemaSql) {
    throw new Error('schema.sql not found in search paths: ' + possiblePaths.join(', '));
  }

  await execSql(schemaSql);
  console.log('PostgreSQL database schema initialized successfully.');
}
