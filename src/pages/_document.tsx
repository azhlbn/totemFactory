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
        
        {/* Явно указываем предзагрузку стилей */}
        <link rel="preload" href="/_next/static/css/f110489cd6db7876.css" as="style" />
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
