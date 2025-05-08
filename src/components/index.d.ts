import { ethers } from 'ethers';

declare module '../components/TotemViewer' {
  import { ProviderProps } from '../types/totem';
  
  const TotemViewerComponent: React.FC<ProviderProps>;
  export default TotemViewerComponent;
}

declare module '../components/TotemList' {
  import { ProviderProps } from '../types/totem';
  
  const TotemList: React.FC<ProviderProps>;
  export default TotemList;
}

declare module '../components/TotemForm' {
  interface TotemFormProps {
    provider: ethers.BrowserProvider | null;
  }
  
  const TotemForm: React.FC<TotemFormProps>;
  export default TotemForm;
}
