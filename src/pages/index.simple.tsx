import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Totem Creator</title>
        <meta name="description" content="Create and manage your Totems on the Minato Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen p-5 flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary opacity-80"></div>
        
        <div className="container">
          <h1 className="text-6xl font-bold text-center my-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Totem Creator</span>
          </h1>
          
          <div className="card bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-primary/30 rounded-xl shadow-xl overflow-hidden p-6">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Тестовая страница</h2>
            <p className="text-gray-300 mb-4">
              Это упрощенная версия страницы для проверки деплоя на Vercel.
            </p>
            <div className="bg-black/30 p-4 rounded-lg border border-secondary/20 mt-6">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 text-white font-bold">1</div>
                <h4 className="text-lg font-semibold text-white">Тестовый деплой</h4>
              </div>
              <p className="text-gray-300 pl-11">Если вы видите эту страницу, значит базовый деплой работает корректно.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
