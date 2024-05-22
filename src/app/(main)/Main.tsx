import { Box, Container, Link } from '@mui/material';
import { ReactNode } from 'react';

export function Main({ children }: { children: ReactNode }) {
  return (
    <Box component="main">
      <Box className="container-wrapper">
        <Container sx={{ mt: 12 }}>{children}</Container>
      </Box>
    </Box>
  );
}
