export const metadata = { title: 'CRM MVP' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 16, maxWidth: 900 }}>
        <nav style={{ marginBottom: 12 }}>
          <a href="/" style={{ marginRight: 12 }}>Home</a>
          <a href="/clients">Clients</a>
        </nav>
        <hr />
        {children}
      </body>
    </html>
  );
}
