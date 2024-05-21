import { Box, Divider, Link, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { FaFlagCheckered } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { TbLogin, TbLogout } from 'react-icons/tb';

const menuItems = [
  { id: 1, icon: <IoGameController className="line-height-1" />, name: 'Playing now', href: '/' },
  { id: 2, icon: <FaFlagCheckered />, name: 'Beaten at year...', href: '/beaten-at' },
  { id: 3, icon: <IoGameController />, name: 'Tried at year...', href: '/tried-at', divider: true },
  { id: 4, icon: <TbLogout />, name: 'Log out', href: '/log_out' },
  { id: 5, icon: <FaUserPlus />, name: 'register', href: '/register' },
  { id: 6, icon: <TbLogin />, name: 'Log in', href: '/log_in' },
];

export function SideNav() {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      {/* <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}> */}
      <Link href="/" className="navbar-brand">
        <Typography sx={{ my: 3 }} component="h2" className="brand" color="primary">
          What Am I Playing
        </Typography>
      </Link>
      <Divider />
      <List sx={{ p: 0 }}>
        {menuItems.map((item, index) => (
          <>
            <ListItem key={item.id} disablePadding className="side-menu">
              <ListItemButton sx={{ pt: 1.7, pb: 1.7 }}>
                <Box sx={{ mr: 1 }}>{item.icon}</Box>
                <Box>{item.name}</Box>
              </ListItemButton>
            </ListItem>
            {item.divider ? <Divider /> : ''}
          </>
        ))}
      </List>
      {/* <Divider /> */}
    </Box>
  );
}
