import { redirect } from 'next/navigation';
import { prisma } from '../../../lib/prisma';

export default function NewClientPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Add Client</h1>

      <form action={createClient} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" required className="border px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input name="email" type="email" className="border px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input name="phone" className="border px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input name="address" className="border px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Birthday</label>
          <input name="birthday" type="date" className="border px-3 py-2 w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Created At (optional)</label>
          <input name="createdAt" type="datetime-local" className="border px-3 py-2 w-full" />
        </div>

        <button className="bg-black text-white px-4 py-2 rounded">Save</button>
      </form>
    </main>
  );
}

async function createClient(formData: FormData) {
  'use server';

  const name = String(formData.get('name') || '');
  const email = formData.get('email') ? String(formData.get('email')) : null;
  const phone = formData.get('phone') ? String(formData.get('phone')) : null;
  const address = formData.get('address') ? String(formData.get('address')) : null;

  const birthdayRaw = formData.get('birthday');
  const birthday =
    birthdayRaw ? new Date(`${String(birthdayRaw)}T00:00:00.000Z`) : null;

  const createdAtRaw = formData.get('createdAt');
  const createdAt = createdAtRaw ? new Date(String(createdAtRaw)) : undefined;

  await prisma.client.create({
    data: {
      name,
      email,
      phone,
      address,
      birthday,
      ...(createdAt ? { createdAt } : {}),
      stage: 'LEAD',
    },
  });

  redirect('/clients');
}
