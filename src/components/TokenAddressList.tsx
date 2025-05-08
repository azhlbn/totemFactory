'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TOTEMS, TotemData } from '../utils/graphql';
import { ProviderProps } from '../types/totem';

const TokenAddressList: React.FC<ProviderProps> = ({ provider }) => {
  // Запрос к The Graph для получения списка тотемов
  const { data, loading, error } = useQuery(GET_ALL_TOTEMS, {
    variables: { first: 50, skip: 0 },
    skip: !provider, // Пропускаем запрос, если провайдер не подключен
  });

  if (!provider) {
    return (
      <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">Totem Token Addresses</h2>
        <p className="text-gray-400">Connect your wallet to view token addresses</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">Totem Token Addresses</h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">Totem Token Addresses</h2>
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-100">
          Error loading token addresses: {error.message}
        </div>
      </div>
    );
  }

  const totems = data?.totemCreateds || [];

  return (
    <div className="bg-gray-800/95 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl mb-8">
      <h2 className="text-2xl font-bold mb-6">Totem Token Addresses</h2>
      
      {totems.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No token addresses found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Totem Address</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Token Address</th>
              </tr>
            </thead>
            <tbody>
              {totems.map((totem: TotemData) => (
                <tr key={totem.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-gray-300">{totem.totemId}</td>
                  <td className="py-3 px-4">
                    <a 
                      href={`https://soneium-minato.blockscout.com/address/${totem.totemAddr}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      <div className="w-[150px] md:w-[200px] lg:w-[250px] truncate">
                        {totem.totemAddr}
                      </div>
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <a 
                      href={`https://soneium-minato.blockscout.com/address/${totem.totemTokenAddr}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      <div className="w-[150px] md:w-[200px] lg:w-[250px] truncate">
                        {totem.totemTokenAddr}
                      </div>
                    </a>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TokenAddressList;
