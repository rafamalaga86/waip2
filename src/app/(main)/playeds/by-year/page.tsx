import { Box, Button, Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { FaCalendarCheck } from 'react-icons/fa6';
import { bestGameByYearType, bestGamesByYear } from 'src/bestGamesByYear';
import { PageTitle } from 'src/components/PageTitle';
import { getAuthUserVisible } from 'src/lib/auth';
import { ObjectOfYearsFinished } from 'src/models/PlayedModel';
import { PlayedModelCached } from 'src/models/cached/PlayedModelCached';
import { UserModelCached } from 'src/models/cached/UserModelCached';
import { BeatenChart } from './BeatenChart';

const defaultImage = '/images/waip.png';

export default async function allYearsGamePage() {
  const user = (await getAuthUserVisible()) || (await UserModelCached.getDemoUser());
  let allBeaten: ObjectOfYearsFinished, allAbandoned: ObjectOfYearsFinished;
  try {
    [allBeaten, allAbandoned] = await Promise.all([
      PlayedModelCached.getAllPlayedsByYear(user.id, true),
      PlayedModelCached.getAllPlayedsByYear(user.id, false),
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }

  return (
    <>
      <PageTitle alignCenter={true}>Your Games</PageTitle>
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'space-evenly',
          mt: 3.5,
        }}
      >
        {Object.keys(allBeaten)
          .reverse()
          .map((year: string) => {
            const yearNumber = parseInt(year);
            const imageUrls = (bestGamesByYear as bestGameByYearType)[yearNumber];
            const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
            const beatenLink = `/playeds?year=${yearNumber}&beaten=1`;
            const abandonedLink = `/playeds?year=${yearNumber}&abandoned=1`;
            return (
              <Card className="year-card" key={yearNumber} sx={{ display: 'flex', width: '350px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <FaCalendarCheck />
                      <Typography
                        sx={{ ml: 1 }}
                        component="div"
                        variant="h5"
                        className="title-font"
                        color="primary"
                      >
                        {year}
                      </Typography>
                    </Box>
                    <Link href={beatenLink}>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {allBeaten[yearNumber]} games beaten
                      </Typography>
                    </Link>
                    <Link href={abandonedLink}>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {yearNumber in allAbandoned &&
                          allAbandoned[yearNumber] + ' games abandoned'}
                      </Typography>
                    </Link>
                    <Link href={beatenLink} sx={{ mt: 'auto' }}>
                      <Button variant="outlined" component="button">
                        See Beaten
                      </Button>
                    </Link>
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151, marginLeft: 'auto' }}
                  image={imageUrl ?? defaultImage}
                  alt={'Cover of one of best games of year ' + year}
                />
              </Card>
            );
          })}
      </Box>
      <Box component="section">
        <BeatenChart beatenSet={allBeaten} />
      </Box>
    </>
  );
}
