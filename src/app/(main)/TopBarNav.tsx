'use client';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LuMenuSquare } from 'react-icons/lu';
import { SideNav } from '../../components/SideNav';
import { lightTheme } from '../theme';

export function TopBarNav({
  logOutServer,
  authUser,
}: {
  logOutServer: Function;
  authUser: UserVisible | null;
}) {
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
      <Drawer open={open} onClose={toggleDrawer(false)} disableScrollLock>
        <SideNav logOutServer={logOutServer} authUser={authUser} />
      </Drawer>
      <ThemeProvider theme={lightTheme}>
        <AppBar>
          <Toolbar className="no-padding">
            <Container sx={{ display: 'flex', alignItems: 'center' }} className="toolBar-container">
              {/* <Button variant="contained" onClick={toggleDrawer(true)}>
              </Button> */}

              <IconButton edge="end" className="menu-button" onClick={toggleDrawer(true)}>
                <LuMenuSquare size={40} className="cursor-pointer" />
              </IconButton>

              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                <Link href="/" className="navbar-brand">
                  {/* <h1 className="brand">What Am I Playing</h1> */}
                  <Typography component="h1" className="brand">
                    What Am I Playing
                  </Typography>
                </Link>
              </Box>

              <form style={{ marginLeft: 'auto' }} onSubmit={submitSearch}>
                <OutlinedInput
                  sx={{ width: '300px' }}
                  // onSubmit={() => router.push('/search/?s=')}
                  // onSubmit={submitSearch}
                  placeholder="Search in the Database"
                  id="searchKeyword"
                  name="searchKeyword"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end">
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
          {/* <GlobalLoading /> */}
        </AppBar>
      </ThemeProvider>
    </>
  );
}
