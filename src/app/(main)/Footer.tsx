import { Container, Grid, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" gutterBottom>
            Made with love by Rafael García Doblas
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
