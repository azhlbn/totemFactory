import './globals.css';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../utils/apollo';

export const metadata = {
  title: 'Totem Creator',
  description: 'Create unique tokens (Totems) with metadata stored on IPFS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Неоновые линии в стиле mytho-io */}
        <div className="neon-line top"></div>
        <div className="neon-line bottom"></div>
        
        {children}
      </body>
    </html>
  );
}
