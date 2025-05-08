import { useState } from 'react';
import { ethers } from 'ethers';
import dynamic from 'next/dynamic';
import WalletConnect from '../components/WalletConnect';
import TotemForm from '../components/TotemForm';

// Dynamic imports to avoid SSR issues
const TotemViewer = dynamic(() => import('../components/TotemViewer').then(mod => mod), { ssr: false });
const TotemList = dynamic(() => import('../components/TotemList'), { ssr: false });
const TokenAddressList = dynamic(() => import('../components/TokenAddressList'), { ssr: false });

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [activeView, setActiveView] = useState('none');

  const handleConnect = (newProvider) => {
    setProvider(newProvider);
  };

  return (
    <main className="min-h-screen p-5 flex flex-col items-center">
      {/* Neon lines in mytho-io style */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary opacity-80"></div>
      
      <div className="container">
        <h1 className="text-6xl font-bold text-center my-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Totem Creator</span>
        </h1>
        
        <div className="card animate-fadeIn">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8 md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 text-secondary">Connect Your Wallet</h2>
              <p className="text-gray-300 mb-4">
                To create or view Totems, you need to connect your wallet. We support MetaMask.
              </p>
            </div>
            <div className="md:w-1/3">
              <WalletConnect onConnect={handleConnect} />
            </div>
          </div>
        </div>
        
        {provider && (
          <div className="card animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-secondary">What would you like to do?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => setActiveView(activeView === 'create' ? 'none' : 'create')}
                className={`btn ${activeView === 'create' ? 'btn-secondary' : 'btn-primary'}`}
              >
                {activeView === 'create' ? 'Hide Create Form' : 'Create Totem'}
              </button>
              <button 
                onClick={() => setActiveView(activeView === 'view' ? 'none' : 'view')}
                className={`btn ${activeView === 'view' ? 'btn-secondary' : 'btn-primary'}`}
              >
                {activeView === 'view' ? 'Hide Viewer' : 'View Totem'}
              </button>
            </div>
          </div>
        )}
        
        {provider && activeView === 'create' && (
          <div className="card animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Create New Totem</h2>
            <TotemForm provider={provider} />
          </div>
        )}
        
        {provider && activeView === 'view' && (
          <div className="card animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-secondary">View Totem Details</h2>
            <TotemViewer provider={provider} />
          </div>
        )}
        
        {provider && (
          <div className="card animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Your Totems Gallery</h2>
            <TotemList provider={provider} />
          </div>
        )}
        
        {provider && (
          <div className="card animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Token Addresses</h2>
            <TokenAddressList provider={provider} />
          </div>
        )}
        
        <div className="card animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6 text-secondary">About Totem Creator</h2>
          <p className="text-gray-300">
            Totem Creator allows you to create unique tokens on the Minato blockchain. Each token has associated metadata stored on IPFS.
          </p>
        </div>
      </div>
    </main>
  );
}
