import 'dotenv/config';
import { Client } from 'pg';

async function main() {
  const db = new Client({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false },
  });
  await db.connect();
  await db.query(`
    alter table "public"."Note"
      add column if not exists "updatedAt" timestamp(3) not null default now();
    alter table "public"."Note"
      alter column "createdAt" set default now();
  `);
  console.log('✅ Note.updatedAt ensured');
  await db.end();
}
main().catch(e => { console.error('PATCH ERROR:', e); process.exit(1); });
