import { createContext } from 'react';
import type { PaletteMode } from '@mui/material';

export type ThemeContextType = {
  mode: PaletteMode,
  toggleMode: () => void
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleMode: () => { }
});

// const ThemeContext = createContext<Partial<ThemeContextType>>({});
export default ThemeContext;


