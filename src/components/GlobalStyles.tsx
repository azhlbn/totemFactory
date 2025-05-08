import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Основные цвета в стиле MYTHO */
    --background: #0a0a14;
    --foreground: #f0f0f2;
    
    /* Основная цветовая палитра */
    --primary: #ff3864;
    --primary-dark: #cc2e50;
    --secondary: #2de2e6;
    --secondary-dark: #1eafb2;
    --accent: #f9c80e;
    --accent-dark: #d9ae0c;
    
    /* Текстовые цвета */
    --text-primary: #f0f0f2;
    --text-secondary: #b8b8c0;
    --text-muted: #666680;
    --text-accent: #ff3864;
    
    /* Градиенты */
    --gradient-start: #0a0a14;
    --gradient-end: #141428;
    
    /* Фоны и границы */
    --card-bg: rgba(20, 20, 40, 0.5);
    --card-border: rgba(255, 255, 255, 0.05);
    --card-hover-border: rgba(255, 56, 100, 0.2);
    --panel-bg: rgba(10, 10, 20, 0.6);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #0a0a14;
    background: linear-gradient(135deg, #0a0a14, #141428);
    color: #f0f0f2;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    position: relative;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Свечение в стиле MYTHO */
  body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 15% 15%, rgba(255, 56, 100, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 85% 85%, rgba(45, 226, 230, 0.15) 0%, transparent 40%);
    z-index: -1;
    pointer-events: none;
  }

  /* Сетка фона */
  body::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    z-index: -1;
    pointer-events: none;
  }

  /* Неоновые линии */
  .neon-line {
    position: absolute;
    height: 1px;
    width: 100%;
    background: linear-gradient(135deg, #ff3864, #ff5e5e);
    opacity: 0.6;
    box-shadow: 0 0 10px rgba(255, 56, 100, 0.5), 0 0 20px rgba(255, 56, 100, 0.3);
    z-index: 1;
  }

  .neon-line.top {
    top: 0;
  }

  .neon-line.bottom {
    bottom: 0;
  }

  /* Стили для заголовков */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-top: 0;
    color: #f0f0f2;
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  /* Стили для ссылок */
  a {
    color: #ff3864;
    text-decoration: none;
    transition: color 0.2s ease, text-shadow 0.2s ease;
  }

  a:hover {
    color: #2de2e6;
    text-shadow: 0 0 8px rgba(45, 226, 230, 0.5);
  }

  /* Стили для карточек */
  .card {
    background-color: rgba(20, 20, 40, 0.5);
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 1.75rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(12px);
    margin-bottom: 2.5rem;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  /* Стили для кнопок */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.75rem;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: none;
    z-index: 1;
  }

  .btn-primary {
    background: linear-gradient(135deg, #ff3864, #ff5e5e);
    color: white;
    box-shadow: 0 5px 15px rgba(255, 56, 100, 0.3);
  }

  .btn-secondary {
    background: linear-gradient(135deg, #2de2e6, #4dffff);
    color: white;
    box-shadow: 0 5px 15px rgba(45, 226, 230, 0.3);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    position: relative;
    z-index: 2;
  }

  /* Стили для сетки */
  .grid {
    display: grid;
    gap: 2rem;
  }

  .grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
  .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

  @media (min-width: 640px) {
    .sm\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  }

  @media (min-width: 768px) {
    .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  }

  @media (min-width: 1024px) {
    .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  }

  /* Утилиты для отступов */
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-4 { margin-top: 1rem; }
  .mt-8 { margin-top: 2rem; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }

  .p-1 { padding: 0.25rem; }
  .p-2 { padding: 0.5rem; }
  .p-4 { padding: 1rem; }
  .p-8 { padding: 2rem; }

  /* Утилиты для текста */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .text-sm { font-size: 0.875rem; }
  .text-base { font-size: 1rem; }
  .text-lg { font-size: 1.125rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }

  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  .font-normal { font-weight: 400; }

  .text-primary { color: #ff3864; }
  .text-secondary { color: #2de2e6; }
  .text-accent { color: #f9c80e; }
  .text-muted { color: #666680; }
`;

export default GlobalStyles;
