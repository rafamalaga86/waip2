import { gameService } from 'src/services/GameService';

async function main() {
  const games = await gameService.searchGame('mario');
}

main();
