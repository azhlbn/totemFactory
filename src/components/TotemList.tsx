import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TOTEMS, formatIpfsUrl } from '../utils/graphql';
import axios from 'axios';
import { ethers } from 'ethers';
import { ProviderProps } from '../types/totem';
import { TotemData } from '../utils/graphql';

const TotemList: React.FC<ProviderProps> = ({ provider }) => {
  const [totems, setTotems] = useState<TotemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Запрос к The Graph для получения списка тотемов
  const { data, loading: graphLoading, error: graphError } = useQuery(GET_ALL_TOTEMS, {
    variables: { first: 10, skip: 0 },
    skip: !provider, // Пропускаем запрос, если провайдер не подключен
  });

  // Загружаем метаданные для каждого тотема
  useEffect(() => {
    const fetchMetadata = async () => {
      if (!data || !data.totemCreateds || graphLoading) return;

      setLoading(true);
      try {
        const totemsWithMetadata = await Promise.all(
          data.totemCreateds.map(async (totem: TotemData) => {
            try {
              // Получаем данные тотема из контракта
              if (!provider) throw new Error('Provider not connected');
              
              const factory = new ethers.Contract(
                '0xdEA87AA6Dc228865F6F8219c7fa739CE0587dcC5',
                [
                  'function totemDataByAddress(address) view returns (address creator, address totemTokenAddr, bytes dataHash)'
                ],
                provider
              );
              
              const totemData = await factory.totemDataByAddress(totem.totemAddr);
              
              // Преобразуем dataHash в строку (CID)
              const dataHashString = ethers.toUtf8String(totemData.dataHash);
              
              // Загружаем метаданные из IPFS
              const metadataResponse = await axios.get(`https://gateway.pinata.cloud/ipfs/${dataHashString}`);
              
              return {
                ...totem,
                metadata: metadataResponse.data
              };
            } catch (err) {
              console.error(`Error fetching metadata for totem ${totem.totemAddr}:`, err);
              return totem;
            }
          })
        );
        
        setTotems(totemsWithMetadata);
      } catch (err) {
        setError('Failed to load totem metadata');
        console.error('Error loading totem metadata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [data, graphLoading, provider]);

  if (!provider) {
    return (
      <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">Recent Totems</h2>
        <p className="text-gray-400">Connect your wallet to view recent totems</p>
      </div>
    );
  }

  if (graphLoading || loading) {
    return (
      <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">Recent Totems</h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (graphError || error) {
    return (
      <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">Recent Totems</h2>
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-100">
          {graphError ? `Error loading totems: ${graphError.message}` : error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl mb-8">
      <h2 className="text-2xl font-bold mb-6">Recent Totems</h2>
      
      {totems.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No totems found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {totems.map((totem) => (
            <div 
              key={totem.id} 
              className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-colors"
            >
              <div className="aspect-square w-full overflow-hidden bg-gray-700/30 flex items-center justify-center">
                {totem.metadata?.image ? (
                  <img 
                    src={formatIpfsUrl(totem.metadata.image)} 
                    alt={totem.metadata?.name || 'Totem'} 
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="text-gray-500 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>No Image</p>
                  </div>
                )}
              </div>
              
              <div className="p-3 flex flex-col justify-between h-[140px]">
                <div className="h-12 overflow-hidden">
                  <h3 className="text-base font-bold line-clamp-2">
                    {totem.metadata?.name || `Totem #${totem.totemId}`}
                  </h3>
                </div>
                
                <div className="h-12 overflow-hidden flex items-center">
                  {totem.metadata?.description ? (
                    <p className="text-gray-400 text-xs line-clamp-2">
                      {totem.metadata.description}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-xs italic">No description</p>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    ID: {totem.totemId}
                  </span>
                  <a 
                    href={`/totem/${totem.totemAddr}`} 
                    className="text-emerald-400 text-sm hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`/totem/${totem.totemAddr}`, '_blank');
                    }}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TotemList;
