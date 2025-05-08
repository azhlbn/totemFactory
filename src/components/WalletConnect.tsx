import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { checkMinatoNetwork, switchToMinatoNetwork, MINATO_NETWORK_NAME } from '../utils/network';

interface WalletConnectProps {
  onConnect: (provider: ethers.BrowserProvider) => void;
}

type NetworkStatus = 'disconnected' | 'wrong_network' | 'connected';

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('disconnected');
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Проверяем подключение к кошельку и к сети Minato
  const checkWalletAndNetwork = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
          
          // Проверяем, подключен ли пользователь к сети Minato
          const isMinatoNetwork = await checkMinatoNetwork(provider);
          
          if (isMinatoNetwork) {
            setNetworkStatus('connected');
            onConnect(provider);
          } else {
            setNetworkStatus('wrong_network');
          }
        } else {
          setNetworkStatus('disconnected');
        }
      } else {
        setError('Пожалуйста, установите MetaMask!');
      }
    } catch (error) {
      console.error(error);
      setError('Ошибка при подключении к кошельку');
    }
  };

  // Подключаем кошелек
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await provider.listAccounts();
        
        setAccount(accounts[0].address);
        
        // Проверяем, подключен ли пользователь к сети Minato
        const isMinatoNetwork = await checkMinatoNetwork(provider);
        
        if (isMinatoNetwork) {
          setNetworkStatus('connected');
          onConnect(provider);
        } else {
          setNetworkStatus('wrong_network');
        }
      } else {
        setError('Пожалуйста, установите MetaMask!');
      }
    } catch (error) {
      console.error(error);
      setError('Ошибка при подключении к кошельку');
    }
  };
  
  // Переключаемся на сеть Minato
  const handleSwitchNetwork = async () => {
    try {
      const success = await switchToMinatoNetwork();
      
      if (success) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setNetworkStatus('connected');
        onConnect(provider);
      }
    } catch (error) {
      console.error(error);
      setError(`Error switching to ${MINATO_NETWORK_NAME} network`);
    }
  };

  // Проверяем подключение при загрузке компонента
  useEffect(() => {
    checkWalletAndNetwork();
    
    // Слушаем изменения аккаунта
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          checkWalletAndNetwork();
        } else {
          setAccount(null);
          setNetworkStatus('disconnected');
        }
      });
      
      // Слушаем изменения сети
      window.ethereum.on('chainChanged', () => {
        checkWalletAndNetwork();
      });
    }
  }, []);

  return (
    <div className="mb-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-100 mb-4">
          {error}
        </div>
      )}
      
      {networkStatus === 'connected' ? (
        <div className="flex items-center justify-between bg-emerald-500/20 border border-emerald-500 rounded-lg p-4">
          <span className="text-emerald-100">
            Connected to {MINATO_NETWORK_NAME}: {account?.slice(0, 6)}...{account?.slice(-4)}
          </span>
          <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
        </div>
      ) : networkStatus === 'wrong_network' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-yellow-500/20 border border-yellow-500 rounded-lg p-4">
            <span className="text-yellow-100">
              Wallet connected, but not to the {MINATO_NETWORK_NAME} network
            </span>
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          </div>
          <button
            onClick={handleSwitchNetwork}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
          >
            Switch to {MINATO_NETWORK_NAME}
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
