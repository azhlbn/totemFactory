import { gql } from '@apollo/client';

// Запрос для получения списка всех тотемов
export const GET_ALL_TOTEMS = gql`
  query GetAllTotems($first: Int!, $skip: Int!) {
    totemCreateds(
      first: $first
      skip: $skip
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      totemAddr
      totemTokenAddr
      totemId
      blockTimestamp
    }
  }
`;

// Запрос для получения данных конкретного тотема
export const GET_TOTEM_BY_ID = gql`
  query GetTotemById($id: ID!) {
    totemCreated(id: $id) {
      id
      totemAddr
      totemTokenAddr
      totemId
      blockTimestamp
    }
  }
`;

// Интерфейс для данных тотема из The Graph
export interface TotemData {
  id: string;
  totemAddr: string;
  totemTokenAddr: string;
  totemId: string;
  blockTimestamp: string;
  metadata?: {
    name: string;
    description: string;
    image: string;
    social_links: {
      twitter?: string;
      discord?: string;
      website?: string;
    };
    categories: string[];
  };
}

// Функция для форматирования URL IPFS
export function formatIpfsUrl(ipfsUrl: string): string {
  if (!ipfsUrl) return '';
  
  if (ipfsUrl.startsWith('ipfs://')) {
    return `https://gateway.pinata.cloud/ipfs/${ipfsUrl.replace('ipfs://', '')}`;
  }
  return ipfsUrl;
}
