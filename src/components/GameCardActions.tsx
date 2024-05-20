import { Box, Button, Divider, Menu, MenuItem } from '@mui/material/';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { BiSolidArchive } from 'react-icons/bi';
import { BsShareFill } from 'react-icons/bs';
import { FaEdit, FaFlagCheckered } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { darkTheme } from 'src/app/theme';

export function GameCardActions() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const primaryColor = darkTheme.palette.primary;

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<MdKeyboardArrowDown />}
      >
        Actions
      </Button>
      <Menu
        id="card-actions"
        MenuListProps={{
          'aria-labelledby': 'card-buttons-interactions',
        }}
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <Box sx={{ mr: 2 }} className="line-height-1">
            <FaFlagCheckered style={{ color: primaryColor }} />
          </Box>
          Beaten!
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <Box sx={{ mr: 2 }} className="line-height-1">
            <BiSolidArchive />
          </Box>
          Archive (not beaten)
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <Box sx={{ mr: 2 }} className="line-height-1">
            <BsShareFill />
          </Box>
          Copy Link To Share
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <Box sx={{ mr: 2 }} className="line-height-1">
            <FaEdit />
          </Box>
          Edit
        </MenuItem>
      </Menu>
    </>
  );
}
