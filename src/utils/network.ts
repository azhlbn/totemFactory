import { ethers } from 'ethers';

// Информация о сети Minato
export const MINATO_CHAIN_ID = process.env.NEXT_PUBLIC_MINATO_CHAIN_ID ? parseInt(process.env.NEXT_PUBLIC_MINATO_CHAIN_ID) : 1946;
export const MINATO_NETWORK_NAME = process.env.NEXT_PUBLIC_MINATO_NETWORK_NAME || 'Minato';

// Экспортируем переменные для использования в wagmi и rainbow-kit
export const CHAIN_ID = MINATO_CHAIN_ID;
export const RPC_URL = process.env.NEXT_PUBLIC_MINATO_RPC_URL || 'https://rpc.minato.network';
export const BLOCK_EXPLORER_URL = process.env.NEXT_PUBLIC_MINATO_EXPLORER_URL || 'https://explorer.minato.network';

// Функция для проверки, подключен ли пользователь к сети Minato
export async function checkMinatoNetwork(provider: ethers.BrowserProvider): Promise<boolean> {
  try {
    const network = await provider.getNetwork();
    return network.chainId === BigInt(MINATO_CHAIN_ID);
  } catch (error) {
    console.error('Error checking network:', error);
    return false;
  }
}

// Функция для переключения на сеть Minato
export async function switchToMinatoNetwork(): Promise<boolean> {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      // Пытаемся переключиться на сеть Minato
      await (window.ethereum as any).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${MINATO_CHAIN_ID.toString(16)}` }],
      });
      return true;
    } catch (switchError: unknown) {
      // Если сеть не добавлена в MetaMask, добавляем её
      const error = switchError as { code: number };
      if (error.code === 4902) {
        try {
          await (window.ethereum as any).request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${MINATO_CHAIN_ID.toString(16)}`,
                chainName: MINATO_NETWORK_NAME,
                nativeCurrency: {
                  name: 'MINATO',
                  symbol: 'MINATO',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.minato.network'], // Замените на реальный RPC URL сети Minato
                blockExplorerUrls: ['https://explorer.minato.network'], // Замените на реальный URL эксплорера сети Minato
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error('Error adding Minato network:', addError);
          return false;
        }
      }
      console.error('Error switching to Minato network:', switchError);
      return false;
    }
  } catch (error) {
    console.error('Error switching network:', error);
    return false;
  }
}
