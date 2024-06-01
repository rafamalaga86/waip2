'use client';
import {
  Box,
  Button,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { PlayedStatus } from 'src/enums/playedEnums';
import { ModalSkeleton } from './ModalSkeleton';
import { Context } from './contexts/Context';

export function EditPlayedModal({
  isOpened,
  playedId,
  closeModal,
  playedDate,
  setPlayedDate,
  setPlayedBeaten,
  playingState,
  setPlayingState,
  upsertPlayed,
  deletePlayed,
}: {
  isOpened: boolean;
  playedId: number | undefined;
  closeModal: Function;
  playedDate: string | null;
  setPlayedDate: Function;
  setPlayedBeaten: Function;
  playingState: string | null;
  setPlayingState: Function;
  upsertPlayed: Function;
  deletePlayed: Function;
}) {
  const { setOpenErrorToast, setMessageErrorToast } = useContext(Context);

  function handlePlayingState(event: React.MouseEvent<HTMLElement>, newPlayingState: PlayedStatus) {
    setPlayingState(newPlayingState);
    if (newPlayingState === PlayedStatus.beaten) {
      setPlayedBeaten(true);
    }
    if ([PlayedStatus.abandoned, PlayedStatus.playing].includes(newPlayingState)) {
      setPlayedBeaten(false);
    }
  }

  return (
    <>
      <ModalSkeleton open={isOpened} handleClose={closeModal}>
        <Box sx={{ px: 5, py: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            className="text-align-center title-font"
            color="primary"
          >
            Edit played
          </Typography>
          <ToggleButtonGroup
            sx={{ mt: 3 }}
            fullWidth
            value={playingState}
            exclusive
            onChange={handlePlayingState}
            aria-label="playingState"
          >
            <ToggleButton value={PlayedStatus.beaten} aria-label="game beaten">
              Beaten!
            </ToggleButton>
            <ToggleButton value={PlayedStatus.abandoned} aria-label="game abandoned">
              Abandoned
            </ToggleButton>
            <ToggleButton value={PlayedStatus.playing} aria-label="game playing now">
              Playing now
            </ToggleButton>
          </ToggleButtonGroup>
          <TextField
            sx={{ mt: 6 }}
            margin="normal"
            className="date-picker"
            required={playingState !== 'playing'}
            fullWidth
            name="date"
            label={playingState === 'playing' ? 'Disabled when playing now' : 'Date'}
            type="date"
            value={playedDate ?? ''}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={playingState === 'playing'}
            onChange={event => {
              setPlayedDate(event.target.value);
            }}
          />
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', px: 5, py: 4 }}>
          {playedId && (
            <Button
              variant="outlined"
              color="error"
              onClick={async _ => {
                const wasDeleted = await deletePlayed();
                if (!wasDeleted) {
                  setMessageErrorToast("There was some problem and the played couldn't be deleted");
                  setOpenErrorToast(true);
                }
              }}
            >
              Delete
            </Button>
          )}
          <Button
            sx={{ ml: 'auto' }}
            variant="contained"
            onClick={async _ => {
              const wasUpserted = await upsertPlayed();
              if (!wasUpserted) {
                setMessageErrorToast(
                  "There was some problem and the played couldn't be updated or created"
                );
                setOpenErrorToast(true);
              }
            }}
          >
            Save
          </Button>
        </Box>
      </ModalSkeleton>
    </>
  );
}
