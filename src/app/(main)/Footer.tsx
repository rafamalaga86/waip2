import { Box, Container, Link, Typography } from '@mui/material';
import { FaArrowAltCircleUp, FaHeart } from 'react-icons/fa';

export function Footer() {
  return (
    <Box component="footer">
      <Container
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '64px', mt: 5 }}
      >
        <Typography>
          Made with <FaHeart /> by{' '}
          <Link href="//rafaelgarciadoblas.com">
            <strong>Rafael García Doblas</strong>
          </Link>
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Link href="#very-top">
            <FaArrowAltCircleUp size={30} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
