import styled from 'styled-components';

// Контейнеры
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  position: relative;
  z-index: 2;
`;

export const Flex = styled.div<{ direction?: string; align?: string; justify?: string; gap?: string }>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '0'};
`;

export const Grid = styled.div<{ columns?: string; gap?: string }>`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fill, minmax(300px, 1fr))'};
  gap: ${props => props.gap || '2rem'};
`;

// Карточки
export const Card = styled.div`
  background-color: ${props => props.theme.colors.background};
  background-color: rgba(20, 20, 40, 0.5);
  border-radius: ${props => props.theme.radii.md};
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.75rem;
  box-shadow: ${props => props.theme.shadows.md};
  backdrop-filter: blur(12px);
  margin-bottom: 2.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: rgba(255, 56, 100, 0.2);
    box-shadow: ${props => props.theme.shadows.primary};
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.textPrimary};
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

// Кнопки
export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'accent' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  border-radius: ${props => props.theme.radii.full};
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
  
  background: ${props => {
    switch(props.variant) {
      case 'secondary':
        return props.theme.gradients.secondary;
      case 'accent':
        return props.theme.gradients.accent;
      default:
        return props.theme.gradients.primary;
    }
  }};
  
  color: white;
  
  box-shadow: ${props => {
    switch(props.variant) {
      case 'secondary':
        return props.theme.shadows.secondary;
      default:
        return props.theme.shadows.primary;
    }
  }};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

// Типографика
export const Heading1 = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.textPrimary};
`;

export const Heading2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-top: 0;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textPrimary};
`;

export const Heading3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.textPrimary};
`;

export const Text = styled.p<{ color?: 'primary' | 'secondary' | 'muted' | 'accent' }>`
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 0;
  margin-bottom: 1rem;
  color: ${props => {
    switch(props.color) {
      case 'secondary':
        return props.theme.colors.textSecondary;
      case 'muted':
        return props.theme.colors.textMuted;
      case 'accent':
        return props.theme.colors.textAccent;
      default:
        return props.theme.colors.textPrimary;
    }
  }};
`;

export const Link = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: color 0.2s ease, text-shadow 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    text-shadow: 0 0 8px rgba(45, 226, 230, 0.5);
  }
`;

// Эффекты фона
export const BackgroundGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 15% 15%, rgba(255, 56, 100, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 85% 85%, rgba(45, 226, 230, 0.15) 0%, transparent 40%);
  z-index: -1;
  pointer-events: none;
`;

export const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: -1;
  pointer-events: none;
`;

// Неоновые линии
export const NeonLine = styled.div<{ position: 'top' | 'bottom' }>`
  position: absolute;
  height: 1px;
  width: 100%;
  background: ${props => props.theme.gradients.primary};
  opacity: 0.6;
  box-shadow: 0 0 10px rgba(255, 56, 100, 0.5), 0 0 20px rgba(255, 56, 100, 0.3);
  z-index: 1;
  ${props => props.position === 'top' ? 'top: 0;' : 'bottom: 0;'}
`;

// Страница
export const Page = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: linear-gradient(135deg, #0a0a14, #141428);
`;
