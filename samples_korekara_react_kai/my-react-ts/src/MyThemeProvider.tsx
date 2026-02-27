import { type ReactNode, useState } from 'react';
import { CssBaseline, type PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, grey } from '@mui/material/colors';
import ThemeContext, { type ThemeContextType } from './ThemeContext';

type MyThemeProviderProps = {
  children: ReactNode
};

export default function MyThemeProvider({ children }: MyThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const themeConfig: ThemeContextType = {
    mode,
    toggleMode: () => {
      setMode(prev =>
        prev === 'light' ? 'dark' : 'light'
      )
    }
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          primary: amber,
        }
        : {
          primary: {
            main: grey[500],
            contrastText: '#fff'
          },
          background: {
            default: grey[900],
            paper: grey[900],
          },
        }),
    },

  });
  return (
    <ThemeContext value={themeConfig}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext>
  );
}