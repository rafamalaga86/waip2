import { Card } from '@mui/material';
import type { playeds } from '@prisma/client';
import { toLocale } from 'src/lib/helpers';

export function Playeds({ playeds }: { playeds: playeds[] }) {
  return playeds.map(item => {
    return (
      <Card key={item.id}>
        {item.stopped_playing_at && <div>{toLocale(item.stopped_playing_at)}</div>}
        <div>{item.beaten ? 'Beaten' : 'Tried'}</div>
      </Card>
    );
  });
}
