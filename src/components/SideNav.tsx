'use_client';
import { Box, Divider, Link, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FaUserPlus } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { TbLogin, TbLogout } from 'react-icons/tb';
import { useAuth } from 'src/hooks/useAuth';
import { BeatenIcon } from './icons/BeatenIcon';
import { TriedIcon } from './icons/TriedIcon';

export function SideNav({ logOutServer }: { logOutServer: Function }) {
  const { unsetAuthUser } = useAuth();
  async function logOut() {
    const wasLoggedOut = await logOutServer();
    console.log('Escupe: ', wasLoggedOut);
    if (wasLoggedOut) {
      await unsetAuthUser();
    }
  }

  const menuItems = [
    { id: 1, icon: <IoGameController className="line-height-1" />, name: 'Playing now', href: '/' },
    { id: 2, icon: <BeatenIcon />, name: 'Beaten at year...', href: '/beaten-at' },
    { id: 3, icon: <TriedIcon />, name: 'Tried at year...', href: '/tried-at', divider: true },
    { id: 4, icon: <TbLogout />, name: 'Log out', onClick: logOut },
    { id: 6, icon: <TbLogin />, name: 'Log in', href: '/log-in' },
    { id: 5, icon: <FaUserPlus />, name: 'register', href: '/register' },
  ];

  return (
    <Box sx={{ width: 250 }} role="presentation">
      {/* <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}> */}
      <Link href="/" className="navbar-brand">
        <Typography sx={{ my: 3 }} component="h2" className="brand color-white" color="primary">
          What Am I Playing
        </Typography>
      </Link>
      <Divider />
      <List sx={{ p: 0 }}>
        {menuItems.map(item => (
          <div key={item.id}>
            <Link className="color-white" href={item.href ?? '#'} onClick={item.onClick ?? null}>
              <ListItem disablePadding className="side-menu">
                <ListItemButton sx={{ pt: 1.7, pb: 1.7 }}>
                  <Box sx={{ mr: 1 }}>{item.icon}</Box>
                  <Box>{item.name}</Box>
                </ListItemButton>
              </ListItem>
            </Link>
            {item.divider ? <Divider /> : ''}
          </div>
        ))}
      </List>
      {/* <Divider /> */}
    </Box>
  );
}
