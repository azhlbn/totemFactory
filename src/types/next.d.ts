import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { ReactNode } from 'react';

declare module 'next/app' {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, any>;
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & AppInitialProps['pageProps'];
  };
}

declare module 'next/dynamic' {
  interface DynamicOptions {
    ssr?: boolean;
    loading?: () => ReactNode;
  }
}
