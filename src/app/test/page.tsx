import { Card, CardContent, CardMedia, Stack } from '@mui/material';

export default function test() {
  const games = [
    {
      id: 264825,
      cover: { id: 328010, image_id: 'co713e' },
      name: 'Guilty Gear: Strive - Guilty Gear 25th Anniversary: Special Additional Color Pack',
    },
    {
      id: 133917,
      cover: { id: 172391, image_id: 'co3p0n' },
      name: 'Metal Gear',
    },
    {
      id: 254965,
      cover: { id: 311788, image_id: 'co6oks' },
      name: 'Guilty Gear: Strive + Season Pass 1',
    },
    {
      id: 187235,
      cover: { id: 203184, image_id: 'co4cs0' },
      name: 'Sound Voltex: Exceed Gear Konaste',
    },
    {
      id: 254684,
      cover: { id: 343688, image_id: 'co7d6w' },
      name: 'Metal Gear & Metal Gear 2: Solid Snake',
    },
    {
      id: 742,
      cover: { id: 161434, image_id: 'co3gka' },
      name: 'Heavy Gear II',
    },
    {
      id: 9142,
      cover: { id: 85702, image_id: 'co1u4m' },
      name: 'Guilty Gear X2',
    },
    {
      id: 3617,
      cover: { id: 196883, image_id: 'co47wz' },
      name: 'Top Gear Rally',
    },
    {
      id: 37445,
      cover: { id: 317949, image_id: 'co6tbx' },
      name: 'Gekitou! Crash Gear Turbo: Gear Champion League',
    },
    {
      id: 12211,
      cover: { id: 79914, image_id: 'co1pnu' },
      name: 'Metal Gear Acid',
    },
    {
      id: 204734,
      cover: { id: 227145, image_id: 'co4v9l' },
      name: 'Metal Gear 20th Anniversary: Metal Gear Solid Collection',
    },
    {
      id: 5600,
      cover: { id: 257526, image_id: 'co5ipi' },
      name: 'Metal Gear Solid',
    },
    {
      id: 264824,
      cover: { id: 328008, image_id: 'co713c' },
      name: 'Guilty Gear: Strive - Guilty Gear 25th Anniversary: Appreciation Color Pack',
    },
    {
      id: 9886,
      cover: { id: 257530, image_id: 'co5ipm' },
      name: 'Metal Gear Acid 2',
    },
    {
      id: 125764,
      cover: { id: 120958, image_id: 'co2lby' },
      name: 'Guilty Gear: Strive',
    },
    {
      id: 134303,
      cover: { id: 330696, image_id: 'co7360' },
      name: 'Guilty Gear X: Ver 1.5',
    },
    {
      id: 41038,
      cover: { id: 157632, image_id: 'co3dmo' },
      name: 'Metal Gear Acid Mobile',
    },
    {
      id: 62360,
      cover: { id: 330698, image_id: 'co7362' },
      name: 'Guilty Gear Vastedge XT',
    },
    {
      id: 221558,
      cover: { id: 256502, image_id: 'co5hx2' },
      name: 'Metal Gear Acid 2 Mobile',
    },
    { id: 117687, name: 'Gear' },
    {
      id: 9145,
      cover: { id: 85706, image_id: 'co1u4q' },
      name: 'Guilty Gear XX Accent Core',
    },
    {
      id: 254561,
      cover: { id: 311244, image_id: 'co6o5o' },
      name: 'Guilty Gear: Strive - Additional Battle Stage: Lap of the Kami',
    },
  ];
  return (
    <Stack direction="row" useFlexGap flexWrap="wrap">
      {games.map((item) => {
        return (
          <Card key={item.id}>
            <CardMedia
              component="img"
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co6pl8.webp"
            />
            <CardContent>
              <p>
                asdfdfsoñk adsogjvxòcivka`lfdksj adsñfak dsflk asdf asd lkjfads ñikjieapoiladsñlsd
                fldsak fas df sladk
              </p>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
