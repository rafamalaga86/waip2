'use client';
import { Avatar, Box, Button, Card, Collapse, IconButton, Typography } from '@mui/material';
import type { playeds } from '@prisma/client';
import { useContext, useState } from 'react';
import { IoGameController } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { Context } from 'src/components/contexts/Context';
import { AbandonedIcon } from 'src/components/icons/AbandonedIcon';
import { BeatenIcon } from 'src/components/icons/BeatenIcon';
import { PlayedStatus } from 'src/enums/business/playedEnums';
import { useItems } from 'src/hooks/useItems';
import { useModal } from 'src/hooks/useModal';
import { deletePlayedRequest, upsertPlayedRequest } from 'src/lib/apiRequests';
import { formatDate, toISO } from 'src/lib/helpers';
import { EditPlayedModal } from './EditPlayedModal';

interface Played extends playeds {
  collapsed: boolean;
}

export function PlayedsList({
  initialPlayeds,
  username,
  gameId,
}: {
  initialPlayeds: playeds[];
  username: string;
  gameId: number;
}) {
  initialPlayeds = initialPlayeds.map(item => {
    return { ...item, collapsed: false };
  });
  const { setOpenErrorToast, setMessageErrorToast } = useContext(Context);
  const [playeds, addPlayedItem, updatePlayedItem, removePlayedItem, collapseItem, uncollapseItem] =
    useItems(initialPlayeds);
  const [isOpened, openModal, closeModal] = useModal(false);
  const [playedDate, setPlayedDate] = useState<string | null>(null);
  const [playedBeaten, setPlayedBeaten] = useState(false);
  const [playingState, setPlayingState] = useState<PlayedStatus>(PlayedStatus.playing);
  const [playedId, setPlayedId] = useState<number | undefined>(undefined);

  async function deletePlayed() {
    if (!playedId) {
      return false;
    }
    const res = await deletePlayedRequest(playedId);
    if (res.statusCode === 204) {
      collapseItem(playedId);
      setTimeout(() => {
        removePlayedItem(playedId);
      }, 500);
    } else {
      setMessageErrorToast(res.response.message);
      setOpenErrorToast(true);
    }
    closeModal();
    return true;
  }

  async function insertPlayed() {
    let date = null;
    if (playingState !== PlayedStatus.playing) {
      date = playedDate;
    }
    const res = await upsertPlayedRequest(
      { stopped_playing_at: date, beaten: playedBeaten, game_id: gameId },
      playedId
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      // Error
      setMessageErrorToast(res.response.message);
      setOpenErrorToast(true);
      return false;
    }
    if (playedId) {
      console.log('Escupe: llega');
      updatePlayedItem(res.response.data);
      return true;
    }
    makeNewPlayedItem(res.response.data);
    return true;
  }

  function makeNewPlayedItem(newPlayedData: Played) {
    const newItem = newPlayedData;
    newItem.stopped_playing_at = newItem.stopped_playing_at
      ? new Date(newItem.stopped_playing_at)
      : null;
    newItem.collapsed = true;
    addPlayedItem(newItem);
    closeModal();
    setInterval(() => {
      uncollapseItem(newItem.id);
    }, 50);
  }

  const modalProps = {
    isOpened,
    playedId,
    playedDate,
    playedBeaten,
    closeModal,
    playingState,
    setPlayedDate,
    setPlayedBeaten,
    setPlayingState,
    insertPlayed,
    deletePlayed,
  };

  let playedsSorted = [...playeds];
  playedsSorted.sort((a, b) => (a.stopped_playing_at > b.stopped_playing_at ? -1 : 1));

  return (
    <>
      <EditPlayedModal {...modalProps} />
      {playedsSorted.map(played => {
        return (
          <Collapse key={played.id} in={!played.collapsed} timeout={500}>
            <Card className="PlayedComponent" key={played.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                <Avatar>
                  {played.beaten && played.stopped_playing_at && <BeatenIcon />}
                  {!played.beaten && played.stopped_playing_at && <AbandonedIcon />}
                  {!played.stopped_playing_at && <IoGameController />}
                </Avatar>
              </Box>
              {played.stopped_playing_at && (
                <Box>
                  <Typography component="div" variant="h5">
                    {played.beaten ? 'Beaten!' : 'Abandoned'}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    <Box className="font-size-15">at {formatDate(played.stopped_playing_at)}</Box>
                  </Typography>
                </Box>
              )}
              {!played.stopped_playing_at && (
                <Box className="d-flex">
                  <Typography component="div" variant="h5">
                    Playing it Now
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', ml: 5 }}>
                {played.stopped_playing_at && (
                  <>
                    {username} {played.beaten ? 'did beat' : 'abandoned'} this game already
                  </>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <IconButton
                  size="large"
                  onClick={() => {
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
            </Card>
          </Collapse>
        );
      })}
      <Button
        variant="contained"
        onClick={() => {
          setPlayedDate(null);
          setPlayedBeaten(false);
          setPlayingState(PlayedStatus.playing);
          setPlayedId(undefined);
          openModal();
        }}
      >
        Add Played
      </Button>
    </>
  );
}
