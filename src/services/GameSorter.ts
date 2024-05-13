enum scoringType {
  hasProperty,
  numberOfItems,
  numberOfItemsMinusOne,
  multiply,
}

export class GameSorter {
  #games: any[];

  #scoreTable: [string, scoringType, number][] = [
    ['cover', scoringType.hasProperty, 30],
    ['parent_game', scoringType.hasProperty, 10],
    ['platforms', scoringType.numberOfItemsMinusOne, 1],
    ['game_localizations', scoringType.numberOfItems, 1],
    ['language_supports', scoringType.numberOfItems, 1],
    ['franchises', scoringType.numberOfItems, 3],
    ['dlc', scoringType.numberOfItems, 3],
    ['expansions', scoringType.numberOfItems, 8],
    ['collections', scoringType.numberOfItems, 8],
    ['rating_count', scoringType.multiply, 0.5],
    ['rating', scoringType.multiply, 5],
    ['remasters', scoringType.numberOfItems, 20],
    ['remakes', scoringType.numberOfItems, 20],
    ['ports', scoringType.numberOfItems, 3],
    ['release_dates', scoringType.numberOfItemsMinusOne, 10],
    ['websites', scoringType.numberOfItems, 1],
    ['alternative_names', scoringType.numberOfItems, 3],
  ];

  constructor(games: []) {
    this.#games = games;
  }

  sortByRelevance() {
    this.#calculateScores();
    this.#games.sort((a, b) => b.score - a.score);
    return this.#games;
  }

  #calculateScores() {
    this.#games.forEach((game, _) => {
      let score: number = 0;
      this.#scoreTable.forEach((rule, _) => {
        if (rule[1] === scoringType.hasProperty) {
          score = score + (game.hasOwnProperty(rule[0]) ? rule[2] : 0);
        }
        if (rule[1] === scoringType.numberOfItems) {
          score = score + (game.hasOwnProperty(rule[0]) ? game[rule[0]].length * rule[2] : 0);
        }
        if (rule[1] === scoringType.numberOfItemsMinusOne) {
          score = score + (game.hasOwnProperty(rule[0]) ? (game[rule[0]].length - 1) * rule[2] : 0);
        }
        if (rule[1] === scoringType.multiply) {
          score = score + (game.hasOwnProperty(rule[0]) ? game[rule[0]] * rule[2] : 0);
        }
      });
      game.score = Math.floor(score);
    });
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
