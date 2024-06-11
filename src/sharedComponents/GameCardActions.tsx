import { Box, Button, Divider, Link, Menu, MenuItem } from '@mui/material/';
import { games } from '@prisma/client';
import { useState } from 'react';
import { BsShareFill } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { abandonPlayed, beatPlayed } from 'src/lib/actions';
import { AbandonedIcon } from './icons/AbandonedIcon';
import { BeatenIcon } from './icons/BeatenIcon';

export function GameCardActions({ game, removeGame }: { game: games; removeGame: Function }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function beatPlayedServer(gameId: number) {
    return await beatPlayed(gameId);
  }

  async function abandonPlayedServer(gameId: number) {
    return await abandonPlayed(gameId);
  }

  return (
    <>
      <Button
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
        <MenuItem
          onClick={async _ => {
            const successful = await beatPlayedServer(game.id);
            if (successful) {
              removeGame(game.id);
            }
          }}
        >
          <Box sx={{ mr: 2 }} className="line-height-1">
            <BeatenIcon className="color-primary" />
          </Box>
          <Box className="color-primary">Beaten!</Box>
        </MenuItem>
        <MenuItem
          onClick={async _ => {
            const successful = await abandonPlayedServer(game.id);
            if (successful) {
              removeGame(game.id);
            }
          }}
        >
          <Box sx={{ mr: 2 }} className="line-height-1">
            <AbandonedIcon />
          </Box>
          Abandon
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple sx={{ p: 0 }}>
          <Link
            href=""
            className="line-height-1 h-w-100 d-flex"
            sx={{ p: 1 }}
            onClick={() => {
              // navigator.clipboard.writeText(`/games/${game.id}?idgbId=${game.igdb_id}`);
              navigator.clipboard.writeText(
                `${window.location.origin}/games/${game.id}?idgbId=${game.igdb_id}`
              );
            }}
          >
            <Box sx={{ mr: 2, ml: 1 }} className="d-flex">
              <BsShareFill />
            </Box>
            Copy Link To Share
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple sx={{ p: 0 }}>
          <Link
            href={`/games/${game.id}?idgbId=${game.igdb_id}`}
            sx={{ p: 1 }}
            className="line-height-1 h-w-100 d-flex"
          >
            <Box sx={{ mr: 2, ml: 1 }} className="d-flex">
              <TbListDetails />
            </Box>
            See Details
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
