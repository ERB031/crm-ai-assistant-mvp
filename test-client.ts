import { PrismaClient } from "@prisma/client";

// Prefer a direct DB URL locally, fall back to pooled if missing
const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL_DIRECT ?? process.env.DATABASE_URL }
  }
});

async function main() {
  const client = await prisma.client.findFirst({
    include: {
      projects: { include: { tasks: true } },
      notes: true,
    },
  });

  if (!client) {
    console.log("No client found");
    return;
  }

  console.log("Client record:");
  console.log({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    address: (client as { address?: string | null }).address,
    birthday: (client as { birthday?: Date | string | null }).birthday,
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
