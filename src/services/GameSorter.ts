export class GameSorter {
  #games: [];
  #gamesScores: [number?];

  constructor(games: []) {
    this.#games = games;
    this.#gamesScores = [];
  }

  sortByRelevance() {
    this.#calculateScores();
  }

  #calculateScores() {
    // @ts-ignore
    console.log(this.#games[0]);
    // this.#gamesScores = this.#games.map((game, index): number => {
    //   return 1;
    // });
  }
}

// #sortGamesByProperty(array: [], property: string) {
//   return array.sort((a: any, b: any) => {
//     if (b[property] === undefined) {
//       return -1;
//     }
//     if (a[property] === undefined) {
//       return 1;
//     }
//     if (b[property] < a[property]) {
//       return -1;
//     }
//     if (b[property] > a[property]) {
//       return 1;
//     }
//     return 0;
//   });
// }
