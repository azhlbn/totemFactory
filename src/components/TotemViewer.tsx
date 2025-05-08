import React, { useState, useEffect } from 'react';
import { getTotemData } from '../utils/contracts';
import { ProviderProps, TotemContractData } from '../types/totem';

const TotemViewer: React.FC<ProviderProps> = ({ provider }) => {
  const [totemAddress, setTotemAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totemData, setTotemData] = useState<TotemContractData | null>(null);
  const [fullMetadata, setFullMetadata] = useState<any>(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotemAddress(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTotemData(null);
    setFullMetadata(null);
    setShowDetails(false);

    try {
      if (!provider) {
        throw new Error('Wallet not connected');
      }
      const result = await getTotemData(provider, totemAddress);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setTotemData(result as TotemContractData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Format IPFS URL to be viewable
  const formatIpfsUrl = (ipfsUrl: string) => {
    if (ipfsUrl.startsWith('ipfs://')) {
      return `https://gateway.pinata.cloud/ipfs/${ipfsUrl.replace('ipfs://', '')}`;
    }
    return ipfsUrl;
  };
  
  // Function to fetch metadata from IPFS
  const fetchFullMetadata = async (cid: string) => {
    setIsLoadingMetadata(true);
    try {
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch metadata from IPFS');
      }
      const data = await response.json();
      setFullMetadata(data);
    } catch (err) {
      console.error('Error fetching full metadata:', err);
    } finally {
      setIsLoadingMetadata(false);
    }
  };
  
  // Function to toggle details display
  const toggleDetails = () => {
    if (fullMetadata) {
      setShowDetails(!showDetails);
    } else if (totemData && totemData.cid) {
      fetchFullMetadata(totemData.cid);
      setShowDetails(true);
    }
  };

  // Load metadata when totem data is received
  useEffect(() => {
    if (totemData && totemData.cid) {
      fetchFullMetadata(totemData.cid);
      // Don't show details automatically
      setShowDetails(false);
    }
  }, [totemData]);

  return (
    <div className="card bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-primary/30 rounded-xl shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary flex items-center gap-2">
        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
        View Totem Metadata
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-6 bg-black/20 p-5 rounded-xl border border-primary/10 shadow-inner">
        <div className="mb-4">
          <label className="block text-text-secondary mb-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Totem Address
          </label>
          <input
            type="text"
            value={totemAddress}
            onChange={handleAddressChange}
            className="w-full p-3 bg-black/30 border border-primary/20 rounded-lg text-text-primary focus:border-primary/50 focus:outline-none transition-colors focus:ring-2 focus:ring-primary/20 font-mono"
            placeholder="0x..."
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full group relative overflow-hidden transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                View Totem
              </>
            )}
          </span>
        </button>
      </form>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-200 mb-6 backdrop-blur-sm animate-pulse">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}
      
      {totemData && (
        <div className="space-y-6 animate-fadeIn transition-all duration-500 ease-in-out">
          <div className="bg-gradient-to-br from-black/30 to-black/50 rounded-lg p-6 border border-primary/20 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Totem Details</h3>
              </div>
              <button 
                onClick={toggleDetails} 
                className="flex items-center gap-2 px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105 border border-primary/20"
              >
                {isLoadingMetadata ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    Loading...
                  </>
                ) : showDetails ? (
                  <>
                    <div className="relative group">
                      Hide Details
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        Hide full metadata
                      </div>
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <div className="relative group">
                      View Details
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        Load metadata from IPFS
                      </div>
                    </div>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex flex-col">
                <span className="text-text-secondary text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Totem Address
                </span>
                <span className="text-text-primary bg-black/20 p-2 rounded-lg border border-secondary/10 font-mono text-sm break-all">
                  {totemData.totemAddress}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-secondary text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                  Token Address
                </span>
                <span className="text-text-primary bg-black/20 p-2 rounded-lg border border-secondary/10 font-mono text-sm break-all">
                  {totemData.tokenAddress}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-secondary text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  IPFS CID
                </span>
                <a 
                  href={`https://gateway.pinata.cloud/ipfs/${totemData.cid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark transition-all duration-300 bg-black/20 p-2 rounded-lg border border-secondary/10 font-mono text-sm break-all flex items-center hover:bg-black/40 hover:border-primary/30 group"
                >
                  {totemData.cid}
                  <svg className="w-4 h-4 ml-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <span className="text-text-secondary text-sm block mb-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              Basic Metadata
            </span>
            <div className="bg-black/20 p-3 rounded-lg border border-secondary/10 mb-4 hover:bg-black/30 transition-all duration-300">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-secondary text-xs block mb-1">Name</span>
                  <span className="text-text-primary">{totemData.metadata.name || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-secondary text-xs block mb-1">Symbol</span>
                  <span className="text-text-primary">{totemData.metadata.symbol || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <span className="text-text-primary text-sm bg-primary/10 px-3 py-1 rounded-full border border-primary/20 shadow-inner">
                Totem #{totemData.totemAddress.substring(0, 6)}...{totemData.totemAddress.substring(totemData.totemAddress.length - 4)}
              </span>
            </div>
            
            {totemData.metadata.image && (
              <div className="mb-6 flex justify-center bg-black/20 p-3 rounded-lg border border-secondary/10 shadow-inner hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                <div className="aspect-square w-48 h-48 relative">
                  <img 
                    src={formatIpfsUrl(totemData.metadata.image)} 
                    alt={totemData.metadata.name || 'Totem Image'} 
                    className="w-full h-full object-cover object-center rounded-lg shadow-md hover:scale-105 transition-all duration-300" 
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/200?text=Image+Not+Available';
                    }}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <h4 className="text-secondary text-sm font-medium mb-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Description
                </h4>
                <p className="text-text-primary bg-black/20 p-3 rounded-lg border border-secondary/10 hover:bg-black/30 transition-all duration-300">
                  {totemData.metadata.description || 'No description available'}
                </p>
              </div>
              
              {totemData.metadata.categories && totemData.metadata.categories.length > 0 && (
                <div>
                  <h4 className="text-secondary text-sm font-medium mb-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2 bg-black/20 p-3 rounded-lg border border-secondary/10 hover:bg-black/30 transition-all duration-300">
                    {totemData.metadata.categories.map((category: string, index: number) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg border border-primary/30 hover:bg-primary/20 hover:scale-105 transition-all duration-300 cursor-default"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {totemData.metadata.social_links && Object.keys(totemData.metadata.social_links).length > 0 && (
                <div>
                  <h4 className="text-secondary text-sm font-medium mb-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Social Links
                  </h4>
                  <div className="p-3 bg-black/20 rounded-lg border border-secondary/10 flex flex-wrap gap-3">
                    {totemData.metadata.social_links.twitter && (
                      <a 
                        href={totemData.metadata.social_links.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary hover:bg-primary/20 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        Twitter
                      </a>
                    )}
                    {totemData.metadata.social_links.discord && (
                      <a 
                        href={totemData.metadata.social_links.discord} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary hover:bg-primary/20 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                        </svg>
                        Discord
                      </a>
                    )}
                    {totemData.metadata.social_links.website && (
                      <a 
                        href={totemData.metadata.social_links.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary hover:bg-primary/20 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                        </svg>
                        Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Display metadata only when showDetails=true */}
          {fullMetadata && showDetails && (
            <div className="bg-gradient-to-br from-black/30 to-black/50 rounded-lg p-6 border border-primary/20 animate-fadeIn shadow-lg backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Full IPFS Metadata
              </h3>
              
              {/* Structured metadata display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(fullMetadata).map(([key, value]) => {
                  // Don't show complex objects in the grid
                  if (typeof value === 'object' && value !== null) return null;
                  
                  return (
                    <div key={key} className="bg-black/20 p-3 rounded-lg border border-secondary/10">
                      <h4 className="text-secondary text-sm font-medium mb-1 capitalize">{key.replace(/_/g, ' ')}</h4>
                      <p className="text-text-primary truncate">
                        {typeof value === 'string' && value.startsWith('ipfs://') 
                          ? (
                            <a 
                              href={formatIpfsUrl(value)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary-dark transition-colors flex items-center"
                            >
                              {value}
                              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                              </svg>
                            </a>
                          ) 
                          : String(value)
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
              
              {/* Objects and arrays displayed separately */}
              {Object.entries(fullMetadata).map(([key, value]) => {
                if (typeof value !== 'object' || value === null) return null;
                
                return (
                  <div key={key} className="mb-4">
                    <h4 className="text-secondary text-sm font-medium mb-2 capitalize flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      {key.replace(/_/g, ' ')}
                    </h4>
                    <div className="bg-black/20 p-4 rounded-lg border border-secondary/10 overflow-auto max-h-64">
                      <pre className="text-text-secondary text-sm whitespace-pre-wrap break-all">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    </div>
                  </div>
                );
              })}
              
              {/* Button to view on IPFS */}
              <div className="flex justify-center mt-4">
                <a 
                  href={`https://gateway.pinata.cloud/ipfs/${totemData.cid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-all duration-300 hover:shadow-md hover:scale-105"
                >
                  View Raw JSON on IPFS
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TotemViewer;
