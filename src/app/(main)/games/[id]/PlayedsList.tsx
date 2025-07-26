'use client';
import { Button, Collapse } from '@mui/material';
import type { playeds } from '@prisma/client';
import { useContext, useState } from 'react';
import { Context } from 'src/components/contexts/Context';
import { PlayedStatus } from 'src/enums/business/playedEnums';
import { useItems } from 'src/hooks/useItems';
import { useModal } from 'src/hooks/useModal';
import { deletePlayedRequest, upsertPlayedRequest } from 'src/lib/apiRequests';
import { EditPlayedModal } from './EditPlayedModal';
import { PlayedListItem } from './PlayedListItem';

interface Played extends playeds {
  collapsed: boolean;
}

export function PlayedsList({
  initialPlayeds,
  username,
  has_auth,
  gameId,
}: {
  initialPlayeds: playeds[];
  username: string;
  has_auth: boolean;
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
      updateOldPlayedItem(res.response.data);
      return true;
    }
    makeNewPlayedItem(res.response.data);
    return true;
  }

  function updateOldPlayedItem(newPlayedData: Played) {
    newPlayedData.stopped_playing_at = newPlayedData.stopped_playing_at
      ? new Date(newPlayedData.stopped_playing_at)
      : null;
    updatePlayedItem(newPlayedData, playedId);
    closeModal();
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
            <PlayedListItem
              has_auth={has_auth}
              played={played}
              username={username}
              setPlayedDate={setPlayedDate}
              setPlayedBeaten={setPlayedBeaten}
              setPlayedId={setPlayedId}
              setPlayingState={setPlayingState}
              openModal={openModal}
            />
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
