import type { HealthResponse } from '@popink/contracts';

async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${process.env.API_URL}/health`, {
    cache: 'no-store',
  });
  return response.json() as Promise<HealthResponse>;
}

export default async function HomePage() {
  const health = await getHealth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">PopInk</h1>
      <p>Statut API : {health.status}</p>
    </main>
  );
}
