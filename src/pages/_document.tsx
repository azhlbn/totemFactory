import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
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
        
        {/* Добавляем мета-тег для правильной загрузки стилей */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Добавляем базовые стили напрямую в документ */}
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            background-color: #0a0a14;
            color: #f0f0f2;
            font-family: 'Space Grotesk', sans-serif;
          }
        ` }} />
      </Head>
      <body className="bg-background text-foreground">
        {/* Неоновые линии в стиле mytho-io */}
        <div className="neon-line top"></div>
        <div className="neon-line bottom"></div>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
