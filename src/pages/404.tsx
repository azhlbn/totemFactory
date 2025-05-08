import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-br from-black/40 to-black/60">
      <div className="text-center max-w-xl p-8 bg-black/30 rounded-xl border border-primary/30 shadow-xl">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          404 - Страница не найдена
        </h1>
        <p className="text-gray-300 mb-6">
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link href="/" className="btn btn-primary inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
