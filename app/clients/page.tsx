// top-level flags (only once)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// imports (only once)
import { prisma } from '@/lib/prisma';   // or ../../lib/prisma if you’re not using "@/"
import Link from 'next/link';

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Clients</h1>
      <ul className="space-y-2">
        {clients.map(c => (
          <li key={c.id} className="border rounded p-3">
            <Link className="underline" href={`/clients/${c.id}`}>{c.name}</Link>
            <div className="text-sm opacity-70">{c.email ?? '—'} · {c.phone ?? '—'} · {c.stage}</div>
          </li>
        ))}
      </ul>
      <Link className="inline-block px-3 py-2 rounded bg-black text-white" href="/clients/new">
        Add client
      </Link>
    </main>
  );
}
