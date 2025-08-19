export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import Link from "next/link";
import { prisma } from "../../lib/prisma";
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <main>…</main>
  );
}
