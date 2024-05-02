'use client';
import { AppBar, Button, Container, Drawer, Toolbar } from '@mui/material';
import { ReactNode, useState } from 'react';
import { SideNav } from './SideNav';

export function LayoutUI({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <SideNav />
      </Drawer>
      <AppBar>
        <Toolbar>
          <Button variant='contained' onClick={toggleDrawer(true)}>
            Open drawer
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '70px' }}>
        <main>{children}</main>
      </Container>
    </>
  );
}
