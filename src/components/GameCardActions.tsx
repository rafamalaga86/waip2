import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Link,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material/';
import { games } from '@prisma/client';
import { useState } from 'react';
import { BsShareFill } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { abandonPlayed, beatPlayed } from 'src/lib/actions';
import { AbandonedIcon } from './icons/AbandonedIcon';
import { BeatenIcon } from './icons/BeatenIcon';

export function GameCardActions({
  game,
  removeGame,
  authUser,
  showCelebration,
}: {
  game: games;
  removeGame: Function;
  authUser: UserVisible | null;
  showCelebration: Function;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const detailsLink = `/games/${game.id}?igdbId=${game.igdb_id}`;
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
      <ButtonGroup variant="contained" aria-label="card actions">
        <LoadingButton
          className="details-loading-button"
          loading={loading}
          loadingPosition="center"
          onClick={() => setLoading(true)}
          component={Link}
          href={detailsLink}
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          sx={{
            // Mantén los colores aunque MUI lo marque como disabled
            '&.Mui-disabled': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              opacity: 1, // evita que se vea apagado
            },
          }}
        >
          <span className={loading ? 'color-transparent' : ''}>Details</span>
        </LoadingButton>
        {authUser && (
          <Button
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            sx={{ px: 1 }}
          >
            <MdKeyboardArrowDown style={{ fontSize: 25 }} />
          </Button>
        )}
      </ButtonGroup>
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
              showCelebration();
            }
          }}
        >
          <Box sx={{ mr: 2 }} className="line-height-1">
            <BeatenIcon className="color-primary" />
          </Box>
          <Box className="color-primary mr-2">Beaten!</Box>
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
            href="#"
            className="line-height-1 h-w-100 d-flex"
            sx={{ p: 1 }}
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/games/${game.id}?igdbId=${game.igdb_id}`
              );
            }}
          >
            <Box sx={{ mr: 2, ml: 1 }} className="d-flex">
              <BsShareFill />
            </Box>
            Copy Link
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
