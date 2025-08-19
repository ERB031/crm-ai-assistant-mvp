import { PrismaClient, DealStage } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const existing = await prisma.client.findFirst({
    where: { email: 'acme@example.com' },
  })
  if (existing) {
    console.log('Seed: client already exists', existing.id)
    return
  }

  const acme = await prisma.client.create({
    data: {
      name: 'Acme Co',
      email: 'acme@example.com',
      phone: '+14045551234',
      stage: DealStage.QUALIFIED,
      projects: {
        create: [
          {
            name: 'Brand Refresh',
            tasks: {
              create: [
                { title: 'Kickoff call', done: false },
                { title: 'Draft proposal', done: false },
              ],
            },
          },
        ],
      },
      notes: { create: [{ body: 'First call scheduled' }] },
    },
  })
  console.log('Seeded client id:', acme.id)
}

main().catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
