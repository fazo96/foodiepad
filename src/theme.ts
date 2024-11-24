'use client';

import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useThemePreference() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return prefersDarkMode ? 'dark' : 'light';
}

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
    },
    typography: {
      fontFamily: 'var(--font-roboto)',
    },
  });
}