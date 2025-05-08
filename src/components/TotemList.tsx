import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TOTEMS, formatIpfsUrl } from '../utils/graphql';
import axios from 'axios';
import { ethers } from 'ethers';
import { ProviderProps } from '../types/totem';
import { TotemData } from '../utils/graphql';
import styled from 'styled-components';
import { Card, CardTitle, CardDescription, Button, Grid, Flex, Text } from '../styles/StyledComponents';

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
      <TotemContainer>
        <SectionTitle>Recent Totems</SectionTitle>
        <Text color="secondary">Connect your wallet to view recent totems</Text>
      </TotemContainer>
    );
  }

  if (graphLoading || loading) {
    return (
      <TotemContainer>
        <SectionTitle>Recent Totems</SectionTitle>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </TotemContainer>
    );
  }

  if (graphError || error) {
    return (
      <TotemContainer>
        <SectionTitle>Recent Totems</SectionTitle>
        <ErrorMessage>
          {graphError ? `Error loading totems: ${graphError.message}` : error}
        </ErrorMessage>
      </TotemContainer>
    );
  }

  return (
    <TotemContainer>
      <SectionTitle>Recent Totems</SectionTitle>
      
      {totems.length === 0 ? (
        <EmptyMessage>No totems found</EmptyMessage>
      ) : (
        <TotemGrid>
          {totems.map((totem) => (
            <TotemCard key={totem.id}>
              <ImageContainer>
                {totem.metadata?.image ? (
                  <TotemImage 
                    src={formatIpfsUrl(totem.metadata.image)} 
                    alt={totem.metadata?.name || 'Totem'} 
                  />
                ) : (
                  <NoImageContainer>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <NoImageText>No Image</NoImageText>
                  </NoImageContainer>
                )}
              </ImageContainer>
              
              <TotemContent>
                <TotemTitleContainer>
                  <TotemTitle>
                    {totem.metadata?.name || `Totem #${totem.totemId}`}
                  </TotemTitle>
                </TotemTitleContainer>
                
                <TotemDescriptionContainer>
                  {totem.metadata?.description ? (
                    <TotemDescription>
                      {totem.metadata.description}
                    </TotemDescription>
                  ) : (
                    <TotemNoDescription>No description</TotemNoDescription>
                  )}
                </TotemDescriptionContainer>
                
                <TotemFooter>
                  <TotemId>
                    ID: {totem.totemId}
                  </TotemId>
                  <ViewDetailsLink 
                    href={`/totem/${totem.totemAddr}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`/totem/${totem.totemAddr}`, '_blank');
                    }}
                  >
                    View Details
                  </ViewDetailsLink>
                </TotemFooter>
              </TotemContent>
            </TotemCard>
          ))}
        </TotemGrid>
      )}
    </TotemContainer>
  );
};

// Styled Components
const TotemContainer = styled.div`
  background-color: rgba(31, 41, 55, 0.95);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.textPrimary};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const Spinner = styled.div`
  animation: spin 1s linear infinite;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  border-top: 2px solid ${props => props.theme.colors.secondary};
  border-bottom: 2px solid ${props => props.theme.colors.secondary};
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(239, 68, 68, 0.2);
  border: 1px solid rgb(239, 68, 68);
  border-radius: 0.5rem;
  padding: 1rem;
  color: rgb(254, 226, 226);
`;

const EmptyMessage = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  padding: 2rem 0;
`;

const TotemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const TotemCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: rgba(16, 185, 129, 0.5);
  }
`;

const ImageContainer = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  overflow: hidden;
  background-color: rgba(55, 65, 81, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TotemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const NoImageContainer = styled.div`
  color: rgb(107, 114, 128);
  text-align: center;
`;

const NoImageText = styled.p`
  margin-top: 0.5rem;
`;

const TotemContent = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 140px;
`;

const TotemTitleContainer = styled.div`
  height: 3rem;
  overflow: hidden;
`;

const TotemTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TotemDescriptionContainer = styled.div`
  height: 3rem;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const TotemDescription = styled.p`
  color: rgb(156, 163, 175);
  font-size: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TotemNoDescription = styled.p`
  color: rgb(107, 114, 128);
  font-size: 0.75rem;
  font-style: italic;
`;

const TotemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotemId = styled.span`
  font-size: 0.75rem;
  color: rgb(107, 114, 128);
`;

const ViewDetailsLink = styled.a`
  color: rgb(52, 211, 153);
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default TotemList;
