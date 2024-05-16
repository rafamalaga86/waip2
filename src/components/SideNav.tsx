import { Box, Divider, List, ListItem, ListItemButton } from '@mui/material';

const menuItems = [
  { id: 1, name: 'Playing now', href: '/' },
  { id: 2, name: 'Beaten at year...', href: '/beaten-at-year' },
  { id: 3, name: 'Tried at year...', href: '/tried-at-year' },
  { id: 4, name: 'Log out', href: '/log_out' },
  { id: 5, name: 'register', href: '/register' },
  { id: 6, name: 'Log in', href: '/log_in' },
];

export function SideNav() {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      {/* <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}> */}
      <h1 className="brand">What Am I Playing</h1>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton>{item.name}</ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
    </Box>
  );
}
