import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // Критические стили, которые будут добавлены непосредственно в HTML
  const criticalStyles = `
    :root {
      --background: #0a0a14;
      --foreground: #f0f0f2;
      --primary: #ff3864;
      --primary-dark: #cc2e50;
      --secondary: #2de2e6;
      --secondary-dark: #1eafb2;
      --accent: #f9c80e;
      --accent-dark: #d9ae0c;
      --text-primary: #f0f0f2;
      --text-secondary: #b8b8c0;
      --text-muted: #666680;
    }
    
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: linear-gradient(135deg, #0a0a14, #141428);
      color: #f0f0f2;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      position: relative;
      line-height: 1.6;
      overflow-x: hidden;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      position: relative;
      z-index: 2;
    }
    
    .card {
      background-color: rgba(10, 10, 20, 0.8);
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 1.75rem;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(12px);
      margin-bottom: 2.5rem;
      position: relative;
      overflow: hidden;
    }
    
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
  `;

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Create unique tokens (Totems) with metadata stored on IPFS" />
        <meta name="theme-color" content="#0a0a14" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Шрифты */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Встроенные критические стили */}
        <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
        
        {/* Явно указываем предзагрузку стилей */}
        <link rel="stylesheet" href="/_next/static/css/f110489cd6db7876.css" />
      </Head>
      <body>
        {/* Неоновые линии в стиле mytho-io */}
        <div className="neon-line top"></div>
        <div className="neon-line bottom"></div>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
