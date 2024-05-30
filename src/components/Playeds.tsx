'use client';
import { Avatar, Box, Button, Card, IconButton, Typography } from '@mui/material';
import type { playeds } from '@prisma/client';
import { useState } from 'react';
import { IoGameController } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { EditPlayedModal } from 'src/components/EditPlayedModal';
import { useModal } from 'src/hooks/useModal';
import { toLocale } from 'src/lib/helpers';
import { AbandonedIcon } from './icons/AbandonedIcon';
import { BeatenIcon } from './icons/BeatenIcon';

export function Playeds({ playeds, username }: { playeds: playeds[]; username: string }) {
  const [isOpened, openModal, closeModal] = useModal(false);
  const [playedDate, setPlayedDate] = useState<Date | null>(null);
  const [playedBeaten, setPlayedBeaten] = useState(false);

  return (
    <>
      <EditPlayedModal
        isOpened={isOpened}
        closeModal={closeModal}
        playedDate={playedDate}
        playedBeaten={playedBeaten}
        setPlayedDate={setPlayedDate}
        setPlayedBeaten={setPlayedBeaten}
      />
      {playeds.map(played => {
        return (
          <div key={played.id}>
            <Card className="PlayedComponent" key={played.id}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar>
                  {played.beaten && played.stopped_playing_at && <BeatenIcon />}
                  {!played.beaten && played.stopped_playing_at && <AbandonedIcon />}
                  {!played.stopped_playing_at && <IoGameController />}
                </Avatar>
              </Box>
              <Box sx={{ ml: 3 }}>
                {played.stopped_playing_at && (
                  <>
                    <Typography component="div" variant="h5">
                      {played.beaten ? 'Beaten!' : 'Abandoned'}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      <Box className="font-size-15">at {toLocale(played.stopped_playing_at)}</Box>
                    </Typography>
                  </>
                )}
                {!played.stopped_playing_at && (
                  <>
                    <Typography component="div" variant="h5">
                      Playing it Now
                    </Typography>
                  </>
                )}
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', ml: 5 }}>
                {username} {played.beaten ? 'did beat' : 'abandoned'} this game already
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <IconButton
                  size="large"
                  onClick={() => {
                    setPlayedDate(played.stopped_playing_at);
                    setPlayedBeaten(played.beaten);
                    openModal();
                  }}
                >
                  <MdEdit size={25} />
                </IconButton>
              </Box>
            </Card>
          </div>
        );
      })}
    </>
  );
}
