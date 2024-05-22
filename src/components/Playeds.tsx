import { Avatar, Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import type { playeds } from '@prisma/client';
import { FaEdit } from 'react-icons/fa';
import { toLocale } from 'src/lib/helpers';
import { IGDBImage } from './IGDBImage';
import { BeatenIcon } from './icons/BeatenIcon';
import { TriedIcon } from './icons/TriedIcon';

export function Playeds({ playeds }: { playeds: playeds[] }) {
  return playeds.map(item => {
    return (
      <Card key={item.id} sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
          <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
            <Typography component="div" variant="h5">
              Beaten!
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <Box sx={{ ml: 0.6, mt: 0.2 }}>at {toLocale(item.stopped_playing_at!)}</Box>
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar>
              <BeatenIcon />
            </Avatar>
            {/* <IconButton aria-label="edit">
              <FaEdit />
            </IconButton>
            <IconButton aria-label="tried">
              <TriedIcon />
            </IconButton>
            <IconButton aria-label="beaten">
              <BeatenIcon />
            </IconButton> */}
          </Box>
        </Box>

        <Box
          sx={{
            width: 150,
            height: 150,
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
