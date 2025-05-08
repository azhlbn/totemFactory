import { ethers } from 'ethers';

// Интерфейс для метаданных тотема
export interface TotemMetadata {
  name: string;
  description: string;
  image: string;
  social_links: {
    twitter?: string;
    discord?: string;
    website?: string;
  };
  categories: string[];
}

// Интерфейс для данных тотема из смарт-контракта
export interface TotemContractData {
  totemAddress: string;
  tokenAddress: string;
  creator: string;
  cid: string;
  metadata: TotemMetadata;
}

// Интерфейс для пропсов компонентов, работающих с провайдером
export interface ProviderProps {
  provider: ethers.BrowserProvider | null;
}
