import GameCardsMasonry from 'src/components/GameCardsMasonry';
import { prisma } from 'src/database/prismaClient';

export default async function homePage() {
  // const games = await GameModel.findGamesWithStoppedPlayingNull(1);
  console.time('Main page');
  const initialGames = await prisma.games.findMany({ take: 20 });
  console.timeEnd('Main page');
  return (
    <>
      <h4 className="title-font text-align-center color-primary">Currently Playing Games</h4>
      <GameCardsMasonry initialGames={initialGames} />
    </>
  );
}
