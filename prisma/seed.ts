// prisma/seed.ts
import { PrismaClient, DealStage } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const acme = await prisma.client.upsert({
    where: { email: 'acme@example.com' },
    update: {},
    create: {
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
                { title: 'Draft proposal', done: false }
              ]
            }
          }
        ]
      },
      notes: { create: [{ body: 'First call scheduled' }] }
    }
  })
  console.log('Seeded client id:', acme.id)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
