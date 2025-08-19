import Link from "next/link";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Clients</h1>

      <form action="/api/clients" method="post" style={{ margin: "16px 0", display: "grid", gap: 8, maxWidth: 480 }}>
        <input name="name" placeholder="Client name" required />
        <input type="email" name="email" placeholder="Email (optional)" />
        <input name="phone" placeholder="Phone (optional)" />
        <label>
          Stage:&nbsp;
          <select name="stage" defaultValue="LEAD">
            <option value="LEAD">LEAD</option>
            <option value="QUALIFIED">QUALIFIED</option>
            <option value="PROPOSAL">PROPOSAL</option>
            <option value="WON">WON</option>
            <option value="LOST">LOST</option>
          </select>
        </label>
        <button type="submit">Add Client</button>
      </form>

      {clients.length === 0 ? (
        <p>No clients yet.</p>
      ) : (
        <ul>
          {clients.map(c => (
            <li key={c.id}>
              <Link href={`/clients/${c.id}`}>{c.name}</Link> &mdash; <em>{c.stage}</em>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
  export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

}
