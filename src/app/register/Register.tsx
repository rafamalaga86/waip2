'use client';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoLogoGameControllerB } from 'react-icons/io';

interface ErrorMessageBag {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
}

export function Register({ handleSubmit }: { handleSubmit: Function }) {
  const [errorMessageBag, setErrorMessageBag]: [ErrorMessageBag, Function] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="rafaelgarciadoblas.com">
          Rafael García Doblas
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  function parseErrorMessage(errorMessage: string): Object {
    const resultObject: { [key: string]: any } = {};
    const arrayErrorMessage = JSON.parse(errorMessage);
    arrayErrorMessage.forEach((item: { path: string; message: string }) => {
      resultObject[item.path] = item.message;
    });
    return resultObject;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <IoLogoGameControllerB />
        </Avatar>

        <h1 className="brand">What Am I Playing</h1>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setLoading(true);
            const formData = new FormData(event.currentTarget);
            try {
              await handleSubmit(formData);
            } catch (error: any) {
              setErrorMessageBag(parseErrorMessage(error.message));
              setLoading(false);
              return;
            }
            router.push('/');
          }}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={'first_name' in errorMessageBag}
                helperText={errorMessageBag?.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                error={'last_name' in errorMessageBag}
                helperText={errorMessageBag?.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                error={'username' in errorMessageBag}
                helperText={errorMessageBag?.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={'email' in errorMessageBag}
                helperText={errorMessageBag?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={'password' in errorMessageBag}
                helperText={errorMessageBag?.password}
              />
            </Grid>
            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            sx={{ mt: 3, mb: 2, height: '40px' }}
          >
            {!loading && 'Register'}
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/log-in" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
