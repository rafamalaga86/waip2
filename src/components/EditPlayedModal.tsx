'use client';
import { TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalSkeleton } from './ModalSkeleton';

export function EditPlayedModal({
  isOpened,
  closeModal,
  playedDate,
  playedBeaten,
  setPlayedDate,
  setPlayedBeaten,
}: {
  isOpened: boolean;
  closeModal: Function;
  playedDate: Date | null;
  playedBeaten: boolean | null;
  setPlayedDate: Function;
  setPlayedBeaten: Function;
}) {
  const [playingState, setPlayingState] = useState<string | null>(null);

  useEffect(() => {
    function getInitialPlayingState() {
      const result = !playedDate ? 'playing' : playedBeaten ? 'beaten' : 'abandoned';
      return result;
    }
    const state = getInitialPlayingState();
    setPlayingState(state);
  }, [playedBeaten, playedDate]);

  function handlePlayingState(event: React.MouseEvent<HTMLElement>, newPlayingState: string) {
    setPlayingState(newPlayingState);
    if (newPlayingState === 'beaten') {
      setPlayedBeaten(true);
    }
    if (['abandoned', 'playing'].includes(newPlayingState)) {
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
          <ToggleButton value="beaten" aria-label="game beaten">
            Beaten!
          </ToggleButton>
          <ToggleButton value="abandoned" aria-label="game abandoned">
            Abandoned
          </ToggleButton>
          <ToggleButton value="playing" aria-label="game playing now">
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
          value={playedDate?.toISOString().substring(0, 10)}
          disabled={playingState === 'playing'}
          onChange={event => {
            setPlayedDate(event.target.value);
          }}
        />
      </ModalSkeleton>
    </>
  );
}
