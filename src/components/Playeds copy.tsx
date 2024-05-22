import { Box, Card } from '@mui/material';
import type { playeds } from '@prisma/client';
import { FaEdit } from 'react-icons/fa';
import { toLocale } from 'src/lib/helpers';
import { BeatenIcon } from './icons/BeatenIcon';
import { TriedIcon } from './icons/TriedIcon';

export function Playeds({ playeds }: { playeds: playeds[] }) {
  function formatTriedOrBeaten(item: playeds) {
    return (
      <>
        <Box>
          {item.beaten ? (
            <>
              <BeatenIcon /> Beaten
            </>
          ) : (
            <>
              <TriedIcon /> Tried
            </>
          )}
        </Box>
        <Box sx={{ ml: 0.6, mt: 0.2 }}>
          at <span className="color-primary">{toLocale(item.stopped_playing_at!)}</span>
        </Box>
      </>
    );
  }

  return playeds.map(item => {
    return (
      <Card key={item.id} sx={{ p: 2 }} className="PlayedCard d-flex flex-direction-row">
        <Box className="d-flex flex-direction-row">
          {item.stopped_playing_at && formatTriedOrBeaten(item)}
          {!item.stopped_playing_at && <Box>Playing now!</Box>}
        </Box>
        <FaEdit />
      </Card>
    );
  });
}
