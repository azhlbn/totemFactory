/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Включаем все файлы в src
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        'secondary-dark': 'var(--secondary-dark)',
        accent: 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      backgroundColor: {
        'card': 'rgba(10, 10, 20, 0.8)',
      },
      borderColor: {
        'card': 'rgba(255, 56, 100, 0.2)',
      },
    },
  },
  plugins: [],
  // Отключаем JIT режим для лучшей совместимости
  mode: 'jit',
  // Включаем все классы, используемые в проекте
  safelist: [
    // Базовые классы
    'container', 'card', 'btn', 'btn-primary', 'btn-secondary',
    'panel', 'neon-line', 'top', 'bottom',
    
    // Фоны и цвета
    'bg-primary', 'bg-secondary', 'bg-accent',
    'text-primary', 'text-secondary', 'text-accent',
    'border-primary', 'border-secondary', 'border-accent',
    
    // Hover состояния
    'hover:bg-primary', 'hover:bg-secondary',
    'hover:text-primary', 'hover:text-secondary',
    'hover:border-primary', 'hover:border-secondary',
    
    // Градиенты
    'bg-gradient-to-r', 'bg-gradient-to-br', 'from-primary', 'to-secondary', 'via-accent',
    
    // Анимации
    'animate-fadeIn', 'animate-pulse', 'animate-spin',
    
    // Утилиты
    'aspect-square', 'line-clamp-2', 'object-cover', 'object-center',
  ],
}