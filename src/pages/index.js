import React, { useState } from 'react';
import { ethers } from 'ethers';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import WalletConnect from '../components/WalletConnect';
import TotemForm from '../components/TotemForm';

// Динамический импорт компонентов для избежания проблем с SSR
const TotemViewer = dynamic(() => import('../components/TotemViewer').then(mod => mod), { ssr: false });
const TotemList = dynamic(() => import('../components/TotemList'), { ssr: false });
const TokenAddressList = dynamic(() => import('../components/TokenAddressList'), { ssr: false });

// Глобальное объявление типа window.ethereum для JavaScript
// В JavaScript не нужно явно объявлять типы, но оставим комментарий для документации
// window.ethereum - объект, предоставляемый MetaMask

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [activeView, setActiveView] = useState('none'); // 'none' | 'create' | 'view'

  const handleConnect = (newProvider) => {
    setProvider(newProvider);
  };

  return (
    <>
      <Head>
        <title>Totem Creator</title>
        <meta name="description" content="Create and manage your Totems" />
      </Head>
      <main className="min-h-screen p-5 flex flex-col items-center">
        {/* Неоновые линии в стиле mytho-io */}
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
            <h2 className="text-2xl font-bold mb-6 text-secondary">About the Project</h2>
            <div className="bg-black/30 p-6 rounded-lg border border-primary/20 mb-6">
              <p className="text-gray-300 mb-4">
                Totem Creator allows you to create unique tokens (Totems) with metadata stored on IPFS.
                Each Totem is a smart contract in the blockchain linked to your metadata.
              </p>
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-primary">How it works:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 p-4 rounded-lg border border-secondary/20">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 text-white font-bold">1</div>
                  <h4 className="text-lg font-semibold text-white">Upload</h4>
                </div>
                <p className="text-gray-300 pl-11">Upload an avatar and fill in information about your Totem</p>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg border border-secondary/20">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 text-white font-bold">2</div>
                  <h4 className="text-lg font-semibold text-white">Store on IPFS</h4>
                </div>
                <p className="text-gray-300 pl-11">Your data will be uploaded to IPFS via Pinata</p>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg border border-secondary/20">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 text-white font-bold">3</div>
                  <h4 className="text-lg font-semibold text-white">Create Contract</h4>
                </div>
                <p className="text-gray-300 pl-11">The smart contract will create a new Totem with a link to your metadata</p>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg border border-secondary/20">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 text-white font-bold">4</div>
                  <h4 className="text-lg font-semibold text-white">Manage Tokens</h4>
                </div>
                <p className="text-gray-300 pl-11">You will receive tokens of your Totem that you can manage</p>
              </div>
            </div>
          </div>
          
          <footer className="mt-12 text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-400">© {new Date().getFullYear()} Totem Creator. All rights reserved.</p>
              <p className="mt-2 text-primary">Built for the Minato Network (Chain ID: 1946)</p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
