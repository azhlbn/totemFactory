# Totem Creator

Application for creating unique Totems using smart contracts and IPFS. This application allows users to create unique tokens (Totems) with metadata stored on IPFS via Pinata and linked to smart contracts on the Minato blockchain.

> **Important:** The application works exclusively with the **Minato** network (Chain ID: 1946). Smart contracts are deployed specifically in this network.

## Настройка

### Setting up Pinata API Keys

To work with IPFS through Pinata, you need to get API keys from the [Pinata](https://app.pinata.cloud/) website.

After obtaining the keys, create a `.env.local` file in the project root with the following content:

```
PINATA_API_KEY=your_api_key
PINATA_API_SECRET=your_api_secret
```

### Setting up Minato Network

In the `src/utils/network.ts` file, the Minato network parameters are configured. If necessary, modify them according to the current network parameters:

```typescript
// Minato Network Information
export const MINATO_CHAIN_ID = 1946; // Minato Chain ID
export const MINATO_NETWORK_NAME = 'Minato';
```

### Setting up Smart Contract

In the `src/utils/contracts.ts` file, the address of the TotemFactory contract in the Minato network is specified:

```typescript
// TotemFactory contract address in the Minato network
export const TOTEM_FACTORY_ADDRESS = "0xdEA87AA6Dc228865F6F8219c7fa739CE0587dcC5";
```

### Setting up The Graph for Event Indexing

The project uses The Graph to index TotemCreated events and display a list of all created totems on the main page. To set up your own subgraph:

1. Install The Graph CLI:
   ```
   npm install -g @graphprotocol/graph-cli
   ```

2. Create a new subgraph in The Graph Studio (https://thegraph.com/studio/):
   - Sign up and create a new subgraph for the Minato network
   - Follow the instructions to initialize your subgraph

3. Deploy the subgraph using the files provided in this repository:
   ```
   graph deploy --studio your-subgraph-name
   ```

4. Update the GraphQL API URL in `src/utils/apollo.ts` with your subgraph URL:
   ```typescript
   const GRAPH_API_URL = 'https://api.studio.thegraph.com/query/YOUR_ID/your-subgraph-name/version/latest';
   ```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Deployment on Vercel

The easiest way to deploy this application is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project into Vercel
3. Add the following environment variables in the Vercel project settings:
   - `PINATA_API_KEY` - Your Pinata API key
   - `PINATA_API_SECRET` - Your Pinata API secret

The other required environment variables are already configured in the `vercel.json` file:
- `NEXT_PUBLIC_MINATO_CHAIN_ID` - Chain ID for the Minato network (1946)
- `NEXT_PUBLIC_MINATO_NETWORK_NAME` - Network name (Minato)
- `NEXT_PUBLIC_TOTEM_FACTORY_ADDRESS` - Address of the TotemFactory contract
- `NEXT_PUBLIC_GRAPH_API_URL` - URL for The Graph API
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Project Structure

This project uses the Pages Router approach of Next.js for better compatibility with Vercel deployment:

```
src/
├── components/     # React components (TotemForm, TotemList, etc.)
├── pages/          # Next.js pages
│   ├── _app.tsx    # Main application wrapper
│   ├── _document.tsx # Custom document component
│   └── index.tsx   # Main page
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
    ├── apollo.ts   # Apollo Client configuration
    ├── contracts.ts # Smart contract interactions
    └── network.ts  # Minato network configuration
```

## Features

- Connect to Web3 wallets (MetaMask, etc.) via RainbowKit
- Create Totems with metadata stored on IPFS
- View existing Totems and their metadata
- Display list of all created Totems
- View token addresses for all Totems

## Deploy on Vercel

The project is optimized for deployment on Vercel. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project into Vercel
3. Add the following environment variables in the Vercel project settings:
   - `PINATA_API_KEY` - Your Pinata API key
   - `PINATA_API_SECRET` - Your Pinata API secret

The other required environment variables are already configured in the `vercel.json` file:
- `NEXT_PUBLIC_MINATO_CHAIN_ID` - Chain ID for the Minato network (1946)
- `NEXT_PUBLIC_MINATO_NETWORK_NAME` - Network name (Minato)
- `NEXT_PUBLIC_MINATO_RPC_URL` - RPC URL for the Minato network
- `NEXT_PUBLIC_MINATO_EXPLORER_URL` - Block explorer URL
- `NEXT_PUBLIC_TOTEM_FACTORY_ADDRESS` - Address of the TotemFactory contract
- `NEXT_PUBLIC_GRAPH_API_URL` - URL for The Graph API

The project includes optimized configuration files for Vercel deployment:
- `next.config.js` - Next.js configuration
- `vercel.json` - Vercel-specific settings
- `.eslintrc.json` - ESLint configuration
# totemFactory
# totemFactory
