import { useState } from 'react';
import { ethers } from 'ethers';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import WalletConnect from '../components/WalletConnect';
import TotemForm from '../components/TotemForm';

// Динамический импорт компонентов для избежания проблем с SSR
const TotemViewer = dynamic(() => import('../components/TotemViewer').then(mod => mod), { ssr: false });
const TotemList = dynamic(() => import('../components/TotemList'), { ssr: false });
const TokenAddressList = dynamic(() => import('../components/TokenAddressList'), { ssr: false });

declare global {
  interface Window {
    ethereum?: any;
  }
}

type ActiveView = 'none' | 'create' | 'view';

// Styled Components
const MainContainer = styled.main`
  min-height: 100vh;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #0a0a14, #141428);
  color: #f0f0f2;
  position: relative;
`;

const NeonLineTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #ff3864, #2de2e6);
  opacity: 0.8;
  box-shadow: 0 0 10px rgba(255, 56, 100, 0.5), 0 0 20px rgba(255, 56, 100, 0.3);
`;

const NeonLineBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #2de2e6, #ff3864);
  opacity: 0.8;
  box-shadow: 0 0 10px rgba(45, 226, 230, 0.5), 0 0 20px rgba(45, 226, 230, 0.3);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const MainTitle = styled.h1`
  font-size: 3.75rem;
  font-weight: 700;
  text-align: center;
  margin: 3rem 0;
`;

const GradientText = styled.span`
  background: linear-gradient(to right, #ff3864, #f9c80e, #2de2e6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Card = styled.div`
  background-color: rgba(20, 20, 40, 0.5);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.75rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
  margin-bottom: 2.5rem;
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 2rem;
    width: 66.666667%;
  }
`;

const WalletSection = styled.div`
  @media (min-width: 768px) {
    width: 33.333333%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2de2e6;
`;

const SectionText = styled.p`
  color: #b8b8c0;
  margin-bottom: 1rem;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ActionButton = styled.button<{ active?: boolean; primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: none;
  z-index: 1;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #2de2e6, #4dffff)' 
    : 'linear-gradient(135deg, #ff3864, #ff5e5e)'};
  color: white;
  box-shadow: ${props => props.active 
    ? '0 5px 15px rgba(45, 226, 230, 0.3)' 
    : '0 5px 15px rgba(255, 56, 100, 0.3)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const InfoBox = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 56, 100, 0.2);
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  color: #b8b8c0;
  margin-bottom: 1rem;
`;

const SubTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ff3864;
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StepBox = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(45, 226, 230, 0.2);
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: #ff3864;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  color: white;
  font-weight: 700;
`;

const StepTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
`;

const StepDescription = styled.p`
  color: #b8b8c0;
  padding-left: 2.75rem;
`;

const Footer = styled.footer`
  margin-top: 3rem;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SocialLink = styled.a`
  color: #666680;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ff3864;
  }
`;

const FooterDivider = styled.div`
  border-top: 1px solid #1f2937;
  padding-top: 1.5rem;
`;

const Copyright = styled.p`
  color: #666680;
`;

const FooterTagline = styled.p`
  margin-top: 0.5rem;
  color: #ff3864;
`;

export default function Home() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('none');

  const handleConnect = (newProvider: ethers.BrowserProvider) => {
    setProvider(newProvider);
  };

  return (
    <MainContainer>
      {/* Неоновые линии в стиле mytho-io */}
      <NeonLineTop />
      <NeonLineBottom />
      
      <Container>
        <MainTitle>
          <GradientText>Totem Creator</GradientText>
        </MainTitle>
        
        <Card>
          <FlexContainer>
            <ContentSection>
              <SectionTitle>Connect Your Wallet</SectionTitle>
              <SectionText>
                To create or view Totems, you need to connect your wallet. We support MetaMask and other Web3 wallets.
              </SectionText>
            </ContentSection>
            <WalletSection>
              <WalletConnect onConnect={handleConnect} />
            </WalletSection>
          </FlexContainer>
        </Card>
        
        {provider && (
          <Card>
            <SectionTitle>What would you like to do?</SectionTitle>
            <ButtonGrid>
              <ActionButton 
                onClick={() => setActiveView(activeView === 'create' ? 'none' : 'create')}
                active={activeView === 'create'}
                primary={activeView !== 'create'}
              >
                {activeView === 'create' ? 'Hide Create Form' : 'Create Totem'}
              </ActionButton>
              <ActionButton 
                onClick={() => setActiveView(activeView === 'view' ? 'none' : 'view')}
                active={activeView === 'view'}
                primary={activeView !== 'view'}
              >
                {activeView === 'view' ? 'Hide Viewer' : 'View Totem'}
              </ActionButton>
            </ButtonGrid>
          </Card>
        )}
        
        {provider && activeView === 'create' && (
          <Card>
            <SectionTitle>Create New Totem</SectionTitle>
            <TotemForm provider={provider} />
          </Card>
        )}
        
        {provider && activeView === 'view' && (
          <Card>
            <SectionTitle>View Totem Details</SectionTitle>
            <TotemViewer provider={provider} />
          </Card>
        )}
        
        {provider && (
          <Card>
            <SectionTitle>Totems Gallery</SectionTitle>
            <TotemList provider={provider} />
          </Card>
        )}
        
        {provider && (
          <Card>
            <SectionTitle>Token Addresses</SectionTitle>
            <TokenAddressList provider={provider} />
          </Card>
        )}
        
        <Card>
          <SectionTitle>About the Project</SectionTitle>
          <InfoBox>
            <InfoText>
              Totem Creator allows you to create unique tokens (Totems) with metadata stored on IPFS.
              Each Totem is a smart contract in the blockchain linked to your metadata.
            </InfoText>
          </InfoBox>
          
          <SubTitle>How it works:</SubTitle>
          <StepGrid>
            <StepBox>
              <StepHeader>
                <StepNumber>1</StepNumber>
                <StepTitle>Upload</StepTitle>
              </StepHeader>
              <StepDescription>Upload an avatar and fill in information about your Totem</StepDescription>
            </StepBox>
            
            <StepBox>
              <StepHeader>
                <StepNumber>2</StepNumber>
                <StepTitle>Store on IPFS</StepTitle>
              </StepHeader>
              <StepDescription>Your data will be uploaded to IPFS via Pinata</StepDescription>
            </StepBox>
            
            <StepBox>
              <StepHeader>
                <StepNumber>3</StepNumber>
                <StepTitle>Create Contract</StepTitle>
              </StepHeader>
              <StepDescription>The smart contract will create a new Totem with a link to your metadata</StepDescription>
            </StepBox>
            
            <StepBox>
              <StepHeader>
                <StepNumber>4</StepNumber>
                <StepTitle>Manage Tokens</StepTitle>
              </StepHeader>
              <StepDescription>You will receive tokens of your Totem that you can manage</StepDescription>
            </StepBox>
          </StepGrid>
        </Card>
        
        <Footer>
          <SocialLinks>
            <SocialLink href="#">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </SocialLink>
            <SocialLink href="#">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </SocialLink>
          </SocialLinks>
          <FooterDivider />
          <Copyright>© {new Date().getFullYear()} Totem Creator. All rights reserved.</Copyright>
          <FooterTagline>Built for the Minato Network (Chain ID: 1946)</FooterTagline>
        </Footer>
      </Container>
    </MainContainer>
  );
}
