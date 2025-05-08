import '../styles/globals.css';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../utils/apollo';

export default function App({ Component, pageProps }) {
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
