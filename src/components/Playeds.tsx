'use client';
import { Avatar, Box, Card, IconButton, Typography } from '@mui/material';
import type { playeds } from '@prisma/client';
import { IoGameController } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { toLocale } from 'src/lib/helpers';
import { BeatenIcon } from './icons/BeatenIcon';
import { TriedIcon } from './icons/TriedIcon';

export function Playeds({ playeds, username }: { playeds: playeds[]; username: string }) {
  return playeds.map(played => {
    return (
      <Card className="PlayedComponent" key={played.id}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar>
            {played.beaten && played.stopped_playing_at && <BeatenIcon />}
            {!played.beaten && played.stopped_playing_at && <TriedIcon />}
            {!played.stopped_playing_at && <IoGameController />}
          </Avatar>
        </Box>
        <Box sx={{ ml: 3 }}>
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
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', ml: 5 }}>
          {username} did beat this game already.
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <IconButton size="large">
            <MdEdit size={25} />
          </IconButton>
        </Box>

        {/* <Box
          sx={{
            width: 170,
            height: 170,
            background:
              'url(https://images.igdb.com/igdb/image/upload/t_720p/co1v85.webp) no-repeat center center',
            backgroundSize: 'cover',
          }}
        ></Box> */}
        {/* <CardMedia
          component="img"
          
          image="//mui.com/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        /> */}
      </Card>
    );
  });
}
