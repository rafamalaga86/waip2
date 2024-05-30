'use client';
import { TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { PlayedStatus } from 'src/enums/playedEnums';
import { ModalSkeleton } from './ModalSkeleton';

export function EditPlayedModal({
  isOpened,
  closeModal,
  playedDate,
  setPlayedDate,
  setPlayedBeaten,
  playingState,
  setPlayingState,
}: {
  isOpened: boolean;
  closeModal: Function;
  playedDate: string | null;
  setPlayedDate: Function;
  setPlayedBeaten: Function;
  playingState: string | null;
  setPlayingState: Function;
}) {
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
          value={playedDate}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={playingState === 'playing'}
          onChange={event => {
            setPlayedDate(event.target.value);
          }}
        />
      </ModalSkeleton>
    </>
  );
}
