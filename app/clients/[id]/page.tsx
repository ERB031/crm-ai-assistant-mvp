import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export default async function ClientPage({ params }: { params: { id: string } }) {
  const query = {
    where: { id: params.id },
    include: {
      projects: { include: { tasks: true } },
      notes: true,
    },
  } as const;

  const client = await prisma.client.findUnique(query);
  if (!client) return <p>Client not found.</p>;

  // client now has id, name, email, phone, address, birthday, projects, notes, etc.
  return (
    <div>
      <h1>{client.name}</h1>
      {client.email && <p>Email: {client.email}</p>}
      {client.phone && <p>Phone: {client.phone}</p>}
      {client.address && <p>Address: {client.address}</p>}
      {client.birthday && <p>Birthday: {new Date(client.birthday).toLocaleDateString()}</p>}
      {/* ... */}
    </div>
  );
}
