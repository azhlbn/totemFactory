import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Логирование для отладки
  console.log('Middleware executed for path:', request.nextUrl.pathname);
  
  // Просто пропускаем все запросы без изменений
  return NextResponse.next();
}

// Указываем, для каких путей должен срабатывать middleware
export const config = {
  matcher: [
    // Применяем ко всем путям
    '/(.*)',
  ],
};
