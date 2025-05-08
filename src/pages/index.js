import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Totem Creator</title>
        <meta name="description" content="Create and manage your Totems" />
      </Head>
      <main className="min-h-screen p-5 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Totem Creator</h1>
        <p className="mt-4">Welcome to Totem Creator. This is a simplified page for debugging.</p>
      </main>
    </>
  );
}
