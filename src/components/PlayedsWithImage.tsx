import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import type { playeds } from '@prisma/client';
import { IoGameController } from 'react-icons/io5';
import { toLocale } from 'src/lib/helpers';
import { BeatenIcon } from './icons/BeatenIcon';
import { TriedIcon } from './icons/TriedIcon';

export function Playeds({ playeds }: { playeds: playeds[] }) {
  return playeds.map(played => {
    return (
      <Card key={played.id} sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
          <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
            {played.stopped_playing_at && (
              <>
                <Typography component="div" variant="h5">
                  {played.beaten ? 'Beaten!' : 'Tried'}
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
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <Avatar>
              {played.beaten && played.stopped_playing_at && <BeatenIcon />}
              {!played.beaten && played.stopped_playing_at && <TriedIcon />}
              {!played.stopped_playing_at && <IoGameController />}
            </Avatar>
          </Box>
        </Box>

        <Box
          sx={{
            width: 170,
            height: 170,
            background:
              'url(https://images.igdb.com/igdb/image/upload/t_720p/co1v85.webp) no-repeat center center',
            backgroundSize: 'cover',
          }}
        ></Box>
        {/* <CardMedia
          component="img"
          
          image="//mui.com/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        /> */}
      </Card>
    );
  });
}
