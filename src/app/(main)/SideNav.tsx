'use_client';
import { Box, Divider, Link, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa6';
import { IoGameController } from 'react-icons/io5';
import { TbLogin, TbLogout } from 'react-icons/tb';
import { AbandonedIcon } from '../../shared_components/icons/AbandonedIcon';
import { BeatenIcon } from '../../shared_components/icons/BeatenIcon';

export function SideNav({
  logOutServer,
  authUser,
}: {
  logOutServer: Function;
  authUser: UserVisible | null;
}) {
  async function logOut() {
    await logOutServer();
  }

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
        {/* Playing Now */}
        <Link className="color-white" href="/">
          <ListItem disablePadding className="side-menu">
            <ListItemButton sx={{ pt: 1.7, pb: 1.7 }}>
              <Box sx={{ mr: 1 }}>
                <IoGameController className="line-height-1" />
              </Box>
              <Box>Playing now</Box>
            </ListItemButton>
          </ListItem>
        </Link>
        {/* Finished Playing Now */}
        {/* Beaten Games */}
        <Link className="color-white" href="/beaten-at">
          <ListItem disablePadding className="side-menu">
            <ListItemButton sx={{ pt: 1.7, pb: 1.7 }}>
              <Box sx={{ mr: 1 }}>
                <BeatenIcon />
              </Box>
              <Box>Beaten Games</Box>
            </ListItemButton>
          </ListItem>
        </Link>
        {/* Finished Beaten Games */}
        {/* Abandoned Games */}
        <Link className="color-white" href="/abandoned-at">
          <ListItem disablePadding className="side-menu">
            <ListItemButton sx={{ pt: 1.7, pb: 1.7 }}>
              <Box sx={{ mr: 1 }}>
                <AbandonedIcon />
              </Box>
              <Box>Abandoned games</Box>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        {/* Finished Abandoned Games */}
        {/* Log Out */}
        {authUser && (
          <div className="color-white" onClick={logOut}>
            <ListItem disablePadding className="side-menu">
              <ListItemButton sx={{ pt: 1.7, pb: 1.7 }}>
                <Box sx={{ mr: 1 }}>
                  <TbLogout />
                </Box>
                <Box>Log out</Box>
              </ListItemButton>
            </ListItem>
          </div>
        )}
        {/* Finished Log Out */}
        {/* Finished Log In */}
        {!authUser && (
          <Link className="color-white" href="/log-in">
            <ListItem disablePadding className="side-menu">
              <ListItemButton sx={{ pt: 1.7, pb: 1.7 }}>
                <Box sx={{ mr: 1 }}>
                  <TbLogin />
                </Box>
                <Box>Log in</Box>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {/* Finished Log In */}
        {/* Register */}
        {!authUser && (
          <Link className="color-white" href="/register">
            <ListItem disablePadding className="side-menu">
              <ListItemButton sx={{ pt: 1.7, pb: 1.7 }}>
                <Box sx={{ mr: 1 }}>
                  <FaUserPlus />
                </Box>
                <Box>Register</Box>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {/* Finished Register */}
      </List>
      {/* <Divider /> */}
    </Box>
  );
}
