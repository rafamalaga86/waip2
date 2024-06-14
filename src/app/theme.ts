'use client';
import { PaletteMode, createTheme } from '@mui/material';

const red = '#ee6352';
const orange = '#f04e27';
const aquaGreen = '#49c5a1';

const igdbColor = '#9147ff';

const dark: PaletteMode = 'dark';

const theme = {
  palette: {
    mode: dark,
    primary: {
      main: aquaGreen,
    },
    secondary: {
      main: red,
    },
  },

  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'black',
          // color: 'red',
          // border: '1px solid #dadde9',
        },
      },
    },
  },
};

let darkTheme = createTheme(theme);

const lightTheme = createTheme({
  // ...darkTheme,
  palette: {
    ...theme.palette,
    mode: 'light',
  },
});

export { darkTheme, lightTheme };
