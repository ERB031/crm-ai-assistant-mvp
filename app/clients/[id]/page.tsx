import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';

type Params = { params: { id: string } };

export default async function ClientDetail({ params: { id } }: Params) {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      projects: { include: { tasks: true } },
      notes: true,
    },
  });

  if (!client) return notFound();

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{client.name}</h1>
        <Link href="/clients" className="text-sm underline">
          Back to clients
        </Link>
      </div>

      <section className="space-y-1">
        {client.email && <p>Email: {client.email}</p>}
        {client.phone && <p>Phone: {client.phone}</p>}
        {client.address && <p>Address: {client.address}</p>}
        {client.birthday && (
          <p>Birthday: {new Date(client.birthday).toLocaleDateString()}</p>
        )}
        <p>
          Created: {new Date(client.createdAt).toLocaleString()}
          {client.updatedAt && (
            <> · Updated: {new Date(client.updatedAt).toLocaleString()}</>
          )}
        </p>
        <p>Stage: {client.stage}</p>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Projects</h2>
        <ul className="list-disc ml-6">
          {client.projects.map((p) => (
            <li key={p.id}>
              {p.name} — {p.tasks.filter((t) => !t.done).length} open tasks
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Notes</h2>
        <ul className="list-disc ml-6">
          {client.notes.map((n) => (
            <li key={n.id}>{n.body}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
