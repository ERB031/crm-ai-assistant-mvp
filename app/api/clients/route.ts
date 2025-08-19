import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name  = String(form.get("name")  ?? "").trim();
    const email = String(form.get("email") ?? "").trim() || null;
    const phone = String(form.get("phone") ?? "").trim() || null;
    const stage = String(form.get("stage") ?? "LEAD").toUpperCase();

    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const created = await prisma.client.create({
      data: { name, email, phone, stage: stage as any },
      select: { id: true },
    });

    return NextResponse.redirect(new URL(`/clients/${created.id}`, req.url), { status: 303 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
