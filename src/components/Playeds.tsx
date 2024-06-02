'use client';
import { Avatar, Box, Button, Card, Collapse, IconButton, Typography } from '@mui/material';
import type { playeds } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { IoGameController } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { EditPlayedModal } from 'src/components/EditPlayedModal';
import { PlayedStatus } from 'src/enums/playedEnums';
import { useItems } from 'src/hooks/useItems';
import { useModal } from 'src/hooks/useModal';
import { deletePlayedRequest, upsertPlayedRequest } from 'src/lib/apiRequests';
import { formatDate, toISO } from 'src/lib/helpers';
import { Context } from './contexts/Context';
import { AbandonedIcon } from './icons/AbandonedIcon';
import { BeatenIcon } from './icons/BeatenIcon';

export function Playeds({
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
  const [playeds, addPlayedItem, updatePlayedItem, removePlayedItem, setItems] =
    useItems(initialPlayeds);
  const [isOpened, openModal, closeModal] = useModal(false);
  const [playedDate, setPlayedDate] = useState<string | null>(null);
  const [playedBeaten, setPlayedBeaten] = useState(false);
  const [playingState, setPlayingState] = useState<PlayedStatus>(PlayedStatus.playing);
  const [playedId, setPlayedId] = useState<number | undefined>(undefined);

  async function uncollapseItem(id: number) {
    setItems(playeds =>
      playeds.map(item => (item.id === id ? { ...item, collapsed: false } : item))
    );
  }

  async function collapseItem(id: number) {
    playeds.forEach(item => {
      if (id === item.id) {
        item.collapsed = true;
      }
    });
  }

  async function deletePlayed() {
    if (!playedId) {
      return false;
    }
    const res = await deletePlayedRequest(playedId);
    if (res.statusCode === 204) {
      await collapseItem(playedId);
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

  async function upsertPlayed() {
    let date = null;
    if (playingState !== PlayedStatus.playing) {
      date = playedDate;
    }
    const res = await upsertPlayedRequest(
      { stopped_playing_at: date, beaten: playedBeaten, game_id: gameId },
      playedId
    );
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const newItem = res.response.data;
      newItem.stopped_playing_at = newItem.stopped_playing_at
        ? new Date(newItem.stopped_playing_at)
        : null;
      newItem.collapsed = true;
      addPlayedItem(newItem);
      setTimeout(() => {
        uncollapseItem(newItem.id);
      }, 500);
      closeModal();
    } else {
      setMessageErrorToast(res.response.message);
      setOpenErrorToast(true);
    }
    return true;
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
    upsertPlayed,
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
