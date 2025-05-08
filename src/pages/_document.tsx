import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // Перехватываем рендеринг страницы и внедряем стили styled-components
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      // Получаем начальные пропсы документа
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          // Оригинальные стили
          initialProps.styles,
          // Стили styled-components
          sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
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
          
          {/* Критические стили для мгновенного отображения */}
          <style dangerouslySetInnerHTML={{ __html: `
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

            body {
              background-color: #0a0a14;
              color: #f0f0f2;
              font-family: 'Space Grotesk', sans-serif;
              margin: 0;
              padding: 0;
              min-height: 100vh;
              position: relative;
              line-height: 1.6;
              overflow-x: hidden;
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
          ` }} />
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
}
