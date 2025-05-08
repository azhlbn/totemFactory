import React, { useEffect } from 'react';

/**
 * Компонент для принудительной загрузки стилей
 * Решает проблему с отсутствием стилей на Vercel
 */
const StyleLoader: React.FC = () => {
  useEffect(() => {
    // Функция для принудительной загрузки стилей
    const loadStyles = async () => {
      try {
        // Получаем все ссылки на стили
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        
        // Если стилей нет, пытаемся найти их и добавить
        if (links.length === 0) {
          const res = await fetch('/_next/static/css');
          if (res.ok) {
            const html = await res.text();
            const regex = /href="(\/_next\/static\/css\/[^"]+\.css)"/g;
            let match;
            while ((match = regex.exec(html)) !== null) {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = match[1];
              document.head.appendChild(link);
            }
          }
        }
        
        // Применяем базовые стили напрямую
        const style = document.createElement('style');
        style.textContent = `
          body {
            background-color: #0a0a14;
            color: #f0f0f2;
            font-family: 'Space Grotesk', sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
          }
          
          .card {
            background-color: rgba(10, 10, 20, 0.8);
            border-radius: 0.5rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 1.75rem;
            margin-bottom: 2rem;
          }
          
          h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          
          h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: #2de2e6;
          }
          
          p {
            margin-bottom: 1rem;
            color: #b8b8c0;
          }
        `;
        document.head.appendChild(style);
      } catch (error) {
        console.error('Error loading styles:', error);
      }
    };

    loadStyles();
  }, []);

  return null; // Компонент не рендерит ничего видимого
};

export default StyleLoader;
