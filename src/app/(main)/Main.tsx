import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

export function Main({ children }: { children: ReactNode }) {
  return (
    <Box component="main" id="very-top">
      <Box sx={{ pt: 12 }} className="container-wrapper">
        <Container>{children}</Container>
      </Box>
    </Box>
  );
}
