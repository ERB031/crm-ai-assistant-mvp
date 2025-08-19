export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function ClientDetail({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: {
      projects: { include: { tasks: true } },
      notes: true,
    },
  });

  if (!client) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{client.name}</h1>
        <Link href="/clients" className="underline">← Back</Link>
      </div>

      <section className="space-y-1">
        <div><strong>Stage:</strong> {client.stage}</div>
        <div><strong>Email:</strong> {client.email ?? '—'}</div>
        <div><strong>Phone:</strong> {client.phone ?? '—'}</div>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-medium">Projects</h2>
        {client.projects.length === 0 ? (
          <p className="text-gray-500">No projects yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {client.projects.map(p => (
              <li key={p.id}>
                {p.name} · {p.tasks.filter(t => !t.done).length} open / {p.tasks.length} total tasks
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-medium">Notes</h2>
        {client.notes.length === 0 ? (
          <p className="text-gray-500">No notes yet.</p>
        ) : (
          <ul className="space-y-2">
            {client.notes.map(n => (
              <li key={n.id} className="rounded border p-3 whitespace-pre-wrap">
                {n.body}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
  model Client {
  id        String   @id @default(uuid())
  name      String
  email     String?
  phone     String?
  stage     DealStage

  // NEW
  address   String?
  birthday  DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  projects  Project[]
  notes     Note[]
}

}
