export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Clients</h1>
      <ul className="divide-y">
        {clients.map((c) => (
          <li key={c.id} className="py-3">
            <Link href={`/clients/${c.id}`} className="underline">
              {c.name}
            </Link>
            <div className="text-sm text-gray-500">
              {c.email ?? '—'} · {c.phone ?? '—'} · {c.stage}
            </div>
          </li>
        ))}
      </ul>
      <Link
        href="/clients/new"
        className="inline-block rounded px-3 py-2 border"
      >
        + Add client
      </Link>
    </main>
  );
}
