// prisma/seed.ts
import { PrismaClient, DealStage, TaskStatus, AiDraftKind, TargetType } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1) Tenant + Users
  const tenant = await prisma.tenant.create({
    data: { name: "Demo Workspace" }
  })
  const [owner, teammate] = await Promise.all([
    prisma.user.create({
      data: { tenantId: tenant.id, email: "owner@example.com", fullName: "Owner User", timezone: "America/New_York" }
    }),
    prisma.user.create({
      data: { tenantId: tenant.id, email: "dev@example.com", fullName: "Teammate Dev", timezone: "America/New_York" }
    })
  ])

  // 2) CRM: account + contact + deal
  const account = await prisma.account.create({
    data: { tenantId: tenant.id, name: "Acme Co.", ownerUserId: owner.id }
  })
  const contact = await prisma.contact.create({
    data: {
      tenantId: tenant.id, accountId: account.id, firstName: "Ada", lastName: "Lovelace",
      email: "ada@acme.dev", ownerUserId: owner.id, lifecycleStage: "prospect"
    }
  })
  const deal = await prisma.deal.create({
    data: {
      tenantId: tenant.id, contactId: contact.id, accountId: account.id,
      title: "Website redesign", stage: DealStage.proposal, amount: 25000.00
    }
  })

  // 3) PM: project from deal + tasks + comments
  const project = await prisma.project.create({
    data: { tenantId: tenant.id, name: "Acme – Website", dealId: deal.id, status: "active" }
  })
  const [task1, task2] = await prisma.$transaction([
    prisma.task.create({
      data: {
        tenantId: tenant.id, projectId: project.id, title: "Kickoff call",
        status: TaskStatus.todo, assigneeUserId: owner.id
      }
    }),
    prisma.task.create({
      data: {
        tenantId: tenant.id, projectId: project.id, title: "Sitemap draft",
        status: TaskStatus.in_progress, assigneeUserId: teammate.id
      }
    })
  ])
  await prisma.taskComment.create({
    data: { tenantId: tenant.id, taskId: task2.id, authorUserId: teammate.id, body: "Drafting initial IA now." }
  })

  // 4) AI assistant: draft + action
  const draft = await prisma.aiDraft.create({
    data: {
      tenantId: tenant.id,
      kind: AiDraftKind.email,
      targetType: TargetType.contact,
      targetId: contact.id,
      inputContext: { prompt: "Draft warm proposal follow-up" },
      output: "Hi Ada — following up on the proposal. Happy to walk through details this week.",
      confidence: 0.86,
      userEditState: "accepted",
      createdBy: owner.id
    }
  })
  await prisma.aiAction.create({
    data: {
      tenantId: tenant.id, draftId: draft.id, action: "created_task",
      result: { taskId: task1.id, note: "Follow-up email drafted and queued" }
    }
  })

  // 5) Wellness + Daily tracker
  await prisma.workSession.create({
    data: {
      tenantId: tenant.id, userId: owner.id,
      startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      endedAt: new Date(), intensityScore: 7, appFocusPct: 82
    }
  })
  const today = new Date(); today.setUTCHours(0,0,0,0)
  await prisma.dailyPriority.create({
    data: { tenantId: tenant.id, userId: owner.id, forDate: today, notes: "Focus: kickoff + sitemap review" }
  })
  await prisma.completionSignal.create({
    data: { tenantId: tenant.id, userId: owner.id, forDate: today, method: "button", thresholdSnapshot: { minTasks: 3 } }
  })

  // 6) Calendar & Document examples (no external API calls)
  await prisma.calendarEvent.create({
    data: {
      tenantId: tenant.id, userId: owner.id,
      startsAt: new Date(Date.now() + 24*60*60*1000),
      endsAt: new Date(Date.now() + 25*60*60*1000),
      summary: "Acme kickoff", linkedTaskId: task1.id
    }
  })
  await prisma.document.create({
    data: {
      tenantId: tenant.id, provider: "drive", fileId: "fake-file-id",
      url: "https://drive.google.com/file/d/FAKE", title: "Acme Proposal.pdf", mimeType: "application/pdf",
      linkedType: "deal", linkedId: deal.id
    }
  })

  console.log("✅ Seeded demo data.")
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
