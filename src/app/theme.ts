'use client';

import { PaletteMode, createTheme } from '@mui/material';

const red = '#ee6352';
const blue = '#416cde';
const cyan = '#46b1c9';
const pink = '#f16571';
const pinkBright = '#ee4266';
const brown = '#a3825f';
const brownGray = '#4e4e4e';
const orange = '#f04e27';
const aquaGreen = '#49c5a1';
const newOrange = '#ff9a00';
const sublimePink = '#f92472';

const igdbColor = '#9147ff';

const dark: PaletteMode = 'dark';

const theme = {
  palette: {
    mode: dark,
    primary: {
      main: aquaGreen,
    },
    secondary: {
      main: cyan,
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
