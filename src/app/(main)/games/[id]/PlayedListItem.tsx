'use client';
import { Box, Card, IconButton, Typography } from '@mui/material';
import type { playeds } from '@prisma/client';
import { MdEdit } from 'react-icons/md';
import {
  PlayedChipAbandoned,
  PlayedChipBeaten,
  PlayedChipPlaying,
} from 'src/components/PlayedChip';
import { AbandonedIcon } from 'src/components/icons/AbandonedIcon';
import { BeatenIcon } from 'src/components/icons/BeatenIcon';
import { PlayingIcon } from 'src/components/icons/PlayingIcon';
import { PlayedStatus } from 'src/enums/business/playedEnums';
import { formatDate, toISO } from 'src/lib/helpers';

interface Props {
  played: playeds;
  has_auth: boolean;
  username: string;
  setPlayedDate: Function;
  setPlayedBeaten: Function;
  setPlayedId: Function;
  setPlayingState: Function;
  openModal: Function;
}

export function PlayedListItem({
  played,
  has_auth,
  username,
  setPlayedDate,
  setPlayedBeaten,
  setPlayedId,
  setPlayingState,
  openModal,
}: Props) {
  const beaten = played.beaten && played.stopped_playing_at;
  const abandoned = !played.beaten && played.stopped_playing_at;
  const playing = !played.stopped_playing_at;

  function getIcon() {
    if (beaten) return <BeatenIcon />;
    if (abandoned) return <AbandonedIcon />;
    if (playing) return <PlayingIcon />;
  }

  function getChip() {
    let chip;
    if (playing) {
      chip = <PlayedChipPlaying username={username} />;
    } else if (beaten) {
      chip = <PlayedChipBeaten username={username} />;
    } else if (abandoned) {
      chip = <PlayedChipAbandoned username={username} />;
    }
    return (
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', ml: 5 }}>{chip}</Box>
    );
  }

  return (
    <Card className="PlayedComponent" key={played.id}>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>{getIcon()}</Box>
      {(beaten || abandoned) && (
        <Box>
          <Typography component="div" variant="h5">
            {played.beaten ? 'Beaten!' : 'Abandoned'}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <Box className="font-size-15">on {formatDate(played.stopped_playing_at)}</Box>
          </Typography>
        </Box>
      )}
      {playing && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component="div" variant="h5">
            Playing it now!
          </Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
        {getChip()}
        {has_auth && (
          <Box sx={{ ml: 1 }}>
            <IconButton
              size="large"
              onClick={() => {
                // const isodate = toISO(played.stopped_playing_at);
                setPlayedDate(toISO(played.stopped_playing_at));
                setPlayedBeaten(played.beaten);
                setPlayedId(played.id);
                setPlayingState(
                  !played.stopped_playing_at
                    ? PlayedStatus.playing
                    : played.beaten
                    ? PlayedStatus.beaten
                    : PlayedStatus.abandoned
                );
                openModal();
              }}
            >
              <MdEdit size={25} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Card>
  );
}
