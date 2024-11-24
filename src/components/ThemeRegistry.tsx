'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import { useThemePreference, createAppTheme } from "@/theme";
import { CssBaseline } from "@mui/material";

export default function ThemeRegistry({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const preferredMode = useThemePreference();
  const theme = createAppTheme(preferredMode);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
} 