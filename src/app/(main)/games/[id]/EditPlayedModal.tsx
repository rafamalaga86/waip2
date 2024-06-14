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
import { useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { ModalSkeleton } from 'src/components/ModalSkeleton';
import { Context } from 'src/components/contexts/Context';
import { PlayedStatus } from 'src/enums/business/playedEnums';
import PlayedStatusButtonGroup from './PlayedStatusButtonGroup';

export function EditPlayedModal({
  isOpened,
  playedId,
  closeModal,
  playedDate,
  setPlayedDate,
  setPlayedBeaten,
  playingState,
  setPlayingState,
  insertPlayed,
  deletePlayed,
}: {
  isOpened: boolean;
  playedId: number | undefined;
  closeModal: Function;
  playedDate: string | null;
  setPlayedDate: Function;
  setPlayedBeaten: Function;
  playingState: PlayedStatus;
  setPlayingState: Function;
  insertPlayed: Function;
  deletePlayed: Function;
}) {
  const { setOpenErrorToast, setMessageErrorToast } = useContext(Context);
  const [dateError, setDateError] = useState<null | string>(null);
  const [statusError, setStatusError] = useState<null | string>(null);

  function handlePlayingState(
    _: React.MouseEvent<HTMLElement>,
    newPlayingState: PlayedStatus
  ): void {
    setStatusError(null);
    setPlayingState(newPlayingState);
    if (newPlayingState === PlayedStatus.beaten) {
      setPlayedBeaten(true);
    }
    if ([PlayedStatus.abandoned, PlayedStatus.playing].includes(newPlayingState)) {
      setPlayedBeaten(false);
    }
  }

  async function savePlayed() {
    console.log('Escupe: ', playingState);
    if (!playingState) {
      console.log('Escupe: ', 'entra');
      setStatusError('You have to choose one of three status');
      return;
    }
    if ([PlayedStatus.abandoned, PlayedStatus.beaten].includes(playingState)) {
      // Needs date
      if (!playedDate) {
        setDateError('Beaten or Abandoned requires a valid date');
        return;
      }
    }
    const wasUpserted = await insertPlayed();
    if (!wasUpserted) {
      setMessageErrorToast("There was some problem and the played couldn't be updated or created");
      setOpenErrorToast(true);
    } else {
    }
  }

  return (
    <ModalSkeleton open={isOpened} handleClose={closeModal}>
      <Box sx={{ px: 5, py: 4, position: 'relative' }}>
        <Box
          onClick={() => {
            closeModal();
          }}
          sx={{
            position: 'absolute',
            fontSize: '30px',
            cursor: 'pointer',
            right: '10px',
            top: '10px',
          }}
        >
          <IoClose />
        </Box>
        <Typography
          variant="h5"
          component="h2"
          className="text-align-center title-font"
          color="primary"
        >
          Edit played
        </Typography>
        <PlayedStatusButtonGroup
          statusError={statusError}
          handlePlayingState={handlePlayingState}
          playingState={playingState}
        />
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
            setDateError(null);
            setPlayedDate(event.target.value);
          }}
          error={!!dateError}
          helperText={dateError}
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
        <Button sx={{ ml: 'auto' }} variant="contained" onClick={savePlayed}>
          Save
        </Button>
      </Box>
    </ModalSkeleton>
  );
}
