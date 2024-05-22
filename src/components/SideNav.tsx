import { Box, Divider, Link, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { TbLogin, TbLogout } from 'react-icons/tb';
import { BeatenIcon } from './icons/BeatenIcon';
import { TriedIcon } from './icons/TriedIcon';

const menuItems = [
  { id: 1, icon: <IoGameController className="line-height-1" />, name: 'Playing now', href: '/' },
  { id: 2, icon: <BeatenIcon />, name: 'Beaten at year...', href: '/beaten-at' },
  { id: 3, icon: <TriedIcon />, name: 'Tried at year...', href: '/tried-at', divider: true },
  { id: 4, icon: <TbLogout />, name: 'Log out' },
  { id: 5, icon: <FaUserPlus />, name: 'register', href: '/register' },
  { id: 6, icon: <TbLogin />, name: 'Log in', href: '/log_in' },
];

export function SideNav() {
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
            <Link className="color-white" href={item.href ?? '#'}>
              <ListItem disablePadding className="side-menu" component="a">
                <ListItemButton sx={{ pt: 1.7, pb: 1.7 }} component="a" href={item.href}>
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
