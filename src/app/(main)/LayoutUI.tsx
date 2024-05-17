'use client';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { SideNav } from '../../components/SideNav';

export function LayoutUI({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  function submitSearch(event: any) {
    event.preventDefault();
    router.push('/games/search?keyword=' + event.target.searchKeyword.value);
  }

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <SideNav />
      </Drawer>
      <AppBar>
        <Toolbar>
          <Container sx={{ display: 'flex' }} className="toolBar-container">
            <Button variant="contained" onClick={toggleDrawer(true)}>
              Menu
            </Button>
            <Link href="/" className="navbar-brand">
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <h1 className="brand">What Am I Playing</h1>
              </Box>
            </Link>

            <form style={{ marginLeft: 'auto' }} onSubmit={submitSearch}>
              <OutlinedInput
                sx={{ width: '300px' }}
                // onSubmit={() => router.push('/search/?s=')}
                onSubmit={submitSearch}
                placeholder="Search in the Database"
                id="searchKeyword"
                name="searchKeyword"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" edge="end">
                      <FaMagnifyingGlass />
                    </IconButton>
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </form>
          </Container>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 12 }}>
        <main>{children}</main>
      </Container>
    </>
  );
}
