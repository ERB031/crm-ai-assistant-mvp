import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>CRM MVP</h1>
      <p><Link href="/clients">Go to Clients</Link></p>
    </main>
  );
}
