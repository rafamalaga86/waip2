import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import type { games } from '@prisma/client';
import { notFound } from 'next/navigation';
import { FaCalendarCheck } from 'react-icons/fa6';
import { getAuthUserVisible } from 'src/lib/auth';
import { GameModel } from 'src/models/GameModel';
import { PlayedModel } from 'src/models/PlayedModel';
import { UserModel } from 'src/models/UserModel';
import { gameService } from 'src/services/GameService';

export default async function allYearsGamePage() {
  const user = (await getAuthUserVisible()) || (await UserModel.getDemoUser());

  const allPlayeds = await PlayedModel.getAllPlayedsByYear(user.id, true);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.keys(allPlayeds).map(year => {
        return (
          <Card key={year} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous">
                  <FaCalendarCheck />
                </IconButton>
              </Box>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image="https://mui.com/static/images/cards/live-from-space.jpg"
              alt="Live from space album cover"
            />
          </Card>
        );
      })}
    </Box>
  );
}
