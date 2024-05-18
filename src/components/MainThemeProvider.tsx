'use client';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ee6352',
    },
    secondary: {
      main: green[500],
    },
  },
});

export function MainThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
