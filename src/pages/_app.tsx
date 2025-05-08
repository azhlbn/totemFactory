// Удаляем импорт Tailwind CSS
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../utils/apollo';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../components/GlobalStyles';

// Определяем тему для styled-components
const theme = {
  colors: {
    background: '#0a0a14',
    foreground: '#f0f0f2',
    primary: '#ff3864',
    primaryDark: '#cc2e50',
    secondary: '#2de2e6',
    secondaryDark: '#1eafb2',
    accent: '#f9c80e',
    accentDark: '#d9ae0c',
    textPrimary: '#f0f0f2',
    textSecondary: '#b8b8c0',
    textMuted: '#666680',
    textAccent: '#ff3864',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #ff3864, #ff5e5e)',
    secondary: 'linear-gradient(135deg, #2de2e6, #4dffff)',
    accent: 'linear-gradient(135deg, #f9c80e, #ffd84d)',
  },
  shadows: {
    sm: '0 2px 10px rgba(0, 0, 0, 0.2)',
    md: '0 5px 20px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 30px rgba(0, 0, 0, 0.4)',
    primary: '0 5px 15px rgba(255, 56, 100, 0.3)',
    secondary: '0 5px 15px rgba(45, 226, 230, 0.3)',
  },
  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Totem Creator</title>
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}
