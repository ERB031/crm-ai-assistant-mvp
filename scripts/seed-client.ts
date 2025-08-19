import 'dotenv/config';
import { Client } from 'pg';

async function main() {
  const db = new Client({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false }  // works with Supabase pooler
  });
  await db.connect();
  await db.query(
    `insert into "Client" ("name","email","phone","stage","createdAt","updatedAt")
     values ($1,$2,$3,$4, now(), now())`,
    ['Acme Co','acme@example.com','+14045551234','LEAD']
  );
  const r = await db.query('select id,name,stage from "Client" order by "createdAt" desc limit 5');
  console.log(r.rows);
  await db.end();
}
main().catch(e => { console.error(e); process.exit(1); });
