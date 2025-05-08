import '../styles/globals.css'; // Возвращаемся к прямому импорту globals.css
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../utils/apollo';
import Head from 'next/head';
import StyleLoader from '../components/StyleLoader';

// Removed RainbowKit and WagmiConfig configuration to use only MetaMask

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Totem Creator</title>
      </Head>
      <StyleLoader /> {/* Добавляем компонент для принудительной загрузки стилей */}
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
