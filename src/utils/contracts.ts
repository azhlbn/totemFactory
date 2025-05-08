import { ethers } from 'ethers';
import { checkMinatoNetwork, MINATO_NETWORK_NAME } from './network';
import axios from 'axios';

// ABI для контракта TotemFactory
export const TOTEM_FACTORY_ABI = [
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "_dataHash",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "_tokenName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_tokenSymbol",
        "type": "string"
      },
      {
        "internalType": "address[]",
        "name": "_collaborators",
        "type": "address[]"
      }
    ],
    "name": "createTotem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "totemData",
    "outputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "totemTokenAddr",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "dataHash",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "totemDataByAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "totemTokenAddr",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "dataHash",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "totemAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "totemTokenAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totemId",
        "type": "uint256"
      }
    ],
    "name": "TotemCreated",
    "type": "event"
  }
];

// Адрес контракта TotemFactory в сети Minato
export const TOTEM_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_TOTEM_FACTORY_ADDRESS || "0xdEA87AA6Dc228865F6F8219c7fa739CE0587dcC5";

// Функция для создания Тотема
export async function createTotem(
  provider: ethers.BrowserProvider,
  dataHash: string,
  tokenName: string,
  tokenSymbol: string,
  collaborators: string[]
) {
  try {
    // Проверяем, что пользователь подключен к сети Minato
    const isMinatoNetwork = await checkMinatoNetwork(provider);
    if (!isMinatoNetwork) {
      throw new Error(`Пожалуйста, переключитесь на сеть ${MINATO_NETWORK_NAME} для создания Тотема`);
    }
    const signer = await provider.getSigner();
    const factory = new ethers.Contract(TOTEM_FACTORY_ADDRESS, TOTEM_FACTORY_ABI, signer);
    
    // Преобразуем dataHash в bytes
    const dataHashBytes = ethers.toUtf8Bytes(dataHash);
    
    // Вызываем функцию создания тотема
    const tx = await factory.createTotem(dataHashBytes, tokenName, tokenSymbol, collaborators);
    const receipt = await tx.wait();
    
    // Ищем событие TotemCreated в логах транзакции
    const totemCreatedEvent = receipt.logs
      .filter((log: any) => log.topics[0] === ethers.id("TotemCreated(address,address,uint256)"))
      .map((log: any) => {
        const parsedLog = factory.interface.parseLog(log);
        if (!parsedLog) {
          return null;
        }
        return {
          totemAddr: parsedLog.args.totemAddr,
          totemTokenAddr: parsedLog.args.totemTokenAddr,
          totemId: parsedLog.args.totemId,
        };
      })
      .filter((event: any): event is { totemAddr: string; totemTokenAddr: string; totemId: number } => event !== null)[0];
    
    return {
      success: true,
      totemData: totemCreatedEvent,
      txHash: receipt.hash,
    };
  } catch (error) {
    console.error("Error creating totem:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Function to get totem data by address
export async function getTotemData(provider: ethers.BrowserProvider, totemAddress: string) {
  try {
    // Check if connected to Minato network
    const isMinatoNetwork = await checkMinatoNetwork(provider);
    if (!isMinatoNetwork) {
      throw new Error(`Please switch to ${MINATO_NETWORK_NAME} network to view Totem data`);
    }

    // Validate address format
    if (!ethers.isAddress(totemAddress)) {
      throw new Error('Invalid Ethereum address format');
    }

    const factory = new ethers.Contract(TOTEM_FACTORY_ADDRESS, TOTEM_FACTORY_ABI, provider);
    
    // Get totem data from the contract
    const totemData = await factory.totemDataByAddress(totemAddress);
    
    if (!totemData || !totemData.dataHash) {
      throw new Error('Totem not found or has no data');
    }

    // Convert bytes to string (CID)
    const dataHashString = ethers.toUtf8String(totemData.dataHash);
    
    // Fetch metadata from IPFS
    const metadataResponse = await axios.get(`https://gateway.pinata.cloud/ipfs/${dataHashString}`);
    
    if (!metadataResponse.data) {
      throw new Error('Failed to fetch metadata from IPFS');
    }

    return {
      success: true,
      totemAddress,
      tokenAddress: totemData.totemTokenAddr,
      creator: totemData.creator,
      cid: dataHashString,
      metadata: metadataResponse.data,
    };
  } catch (error) {
    console.error("Error getting totem data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
