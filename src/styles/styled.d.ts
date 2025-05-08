import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      foreground: string;
      primary: string;
      primaryDark: string;
      secondary: string;
      secondaryDark: string;
      accent: string;
      accentDark: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      textAccent: string;
    };
    gradients: {
      primary: string;
      secondary: string;
      accent: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      primary: string;
      secondary: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
  }
}
