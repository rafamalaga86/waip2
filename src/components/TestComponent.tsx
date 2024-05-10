import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

export function TestComponent() {
  return (
    <div>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        <Paper>Item 1</Paper>
        <Paper>Item 2</Paper>
        <Paper>Item 3</Paper>
      </Stack>
    </div>
  );
}
