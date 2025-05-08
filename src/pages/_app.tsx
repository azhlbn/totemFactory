import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../utils/apollo';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

// Импортируем конфигурацию сети Minato
import { CHAIN_ID, RPC_URL, BLOCK_EXPLORER_URL } from '../utils/network';

// Создаем конфигурацию для Minato chain
const minatoChain = {
  id: CHAIN_ID,
  name: 'Minato',
  network: 'minato',
  iconUrl: 'https://example.com/icon.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Minato',
    symbol: 'MNTO',
  },
  rpcUrls: {
    public: { http: [RPC_URL] },
    default: { http: [RPC_URL] },
  },
  blockExplorers: {
    default: { name: 'BlockScout', url: BLOCK_EXPLORER_URL },
  },
  testnet: true,
};

// Создаем конфигурацию для RainbowKit и Wagmi
const config = getDefaultConfig({
  appName: 'Totem Creator',
  // Используем временный projectId для разработки
  // В продакшене нужно получить реальный projectId с https://cloud.walletconnect.com
  projectId: 'YOUR_PROJECT_ID',
  chains: [minatoChain],
  transports: {
    [CHAIN_ID]: http(RPC_URL),
  },
});

// Создаем экземпляр QueryClient
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <ApolloProvider client={apolloClient}>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Totem Creator</title>
            </Head>
            <Component {...pageProps} />
          </ApolloProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
