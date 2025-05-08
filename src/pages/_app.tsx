import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../utils/apollo';
import Head from 'next/head';

// Removed RainbowKit and WagmiConfig configuration to use only MetaMask

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Totem Creator</title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
