import { gameService } from 'src/services/GameService';

async function main() {
  const games = await gameService.searchGame('mario');
  console.log('Escupe: ', games);
}

main();
