'use client';

import { createTheme } from '@mui/material';

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

const primaryColor = aquaGreen;
const secondaryColor = blue;

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
});
