import Link from "next/link";
import { prisma } from "../../../lib/prisma";

export default async function ClientDetail({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: {
      projects: { include: { tasks: true } },
      notes: true,
    },
  });

  if (!client) {
    return (
      <main>
        <p>Client not found.</p>
        <p><Link href="/clients">Back to Clients</Link></p>
      </main>
    );
  }

  return (
    <main>
      <p><Link href="/clients">← Back</Link></p>
      <h1>{client.name}</h1>
      <p><strong>Stage:</strong> {client.stage}</p>
      {client.email && <p><strong>Email:</strong> {client.email}</p>}
      {client.phone && <p><strong>Phone:</strong> {client.phone}</p>}

      <h2 style={{ marginTop: 24 }}>Projects</h2>
      {client.projects.length === 0 ? <p>No projects yet.</p> : (
        <ul>
          {client.projects.map(p => (
            <li key={p.id}>
              <strong>{p.name}</strong>
              {p.tasks.length > 0 && (
                <ul>
                  {p.tasks.map(t => (
                    <li key={t.id}>{t.title} {t.done ? "✓" : ""}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2 style={{ marginTop: 24 }}>Notes</h2>
      {client.notes.length === 0 ? <p>No notes yet.</p> : (
        <ul>
          {client.notes.map(n => (
            <li key={n.id}>{n.body}</li>
          ))}
        </ul>
      )}
    </main>
  );
  export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

}
