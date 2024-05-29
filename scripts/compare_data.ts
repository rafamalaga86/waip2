import { config } from 'dotenv';
import mysql from 'mysql2/promise';
import { prisma } from '../src/database/prismaClient';

config(); // Load env file

const OLD_USER_ID = 1;
const USER_ID = 1;

// Mysql Config
let mysqlClient: any;
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'waip',
};

async function connect() {
  mysqlClient = await mysql.createConnection(mysqlConfig);
  await mysqlClient.connect();
}

async function run() {
  try {
    await connect();
    console.log('Connected successfully to DBs');
    await compare();
  } catch (err) {
    console.error(err);
    console.log('Hubo un error...');
    process.exit(0);
  }

  console.log('Terminó con éxito');
  process.exit(0);
}

async function getNewGames() {
  const games = await prisma.games.findMany();
  console.log(`Fetched ${games.length} new games`);
  return games;
}

async function getOldGames() {
  const allGames = await mysqlClient.query(
    `
    SELECT
      *
    FROM games_game
    WHERE user_id = ${OLD_USER_ID}
    ;`
  );

  console.log(`Fetched ${allGames[0].length} old games`);

  const oldGames = {};
  for (const game of allGames[0]) {
    // @ts-ignore
    oldGames[game.id] = game;
  }

  return oldGames;
}

async function compare() {
  // await compareInOldNotInNew();
  // await compareNewNotInOld();
  await compareTitles();
}

async function compareInOldNotInNew() {
  const oldGames = await getOldGames();
  const newGames = await getNewGames();

  newGames.forEach(item => {
    // @ts-ignore
    const oldId = item.extra.old_game_properties.id;
    delete oldGames[oldId];
  });

  console.log(oldGames);
  console.log(Object.keys(oldGames).length);
}

async function compareNewNotInOld() {
  const oldGames = await getOldGames();
  const newGames = await getNewGames();
  const newGamesRemaining = await getOldIdToKey(newGames);

  Object.values(oldGames).forEach(item => {
    // @ts-ignore
    console.log('Escupe2: ', item.id.toString());
    delete newGamesRemaining[item.id.toString()];
    console.log('New games remaining: ' + Object.keys(newGamesRemaining).length);
  });

  console.log('Escupe: ', newGamesRemaining);

  // console.log(newGamesRemaining);
  // console.log(Object.keys(oldGames).length);
}

async function compareTitles() {
  const oldGames = await getOldGames();
  const oldGames2 = await getOldGames();
  const newGames = await getNewGames();
  console.log('Escupe1: ', newGames.length);
  const newGamesRemaining = await getOldIdToKey(newGames);
  const newGamesRemaining2 = await getOldIdToKey(newGames);

  Object.values(oldGames).forEach(item => {
    const newGame = newGamesRemaining[item.id.toString()];
    if (newGame) {
      const newGameName = newGame.name;
      // @ts-expect-error
      delete newGamesRemaining2[item.id.toString()];
      delete oldGames2[item.id.toString()];
      // @ts-ignore
      console.log(
        `${item.name} - ${newGameName} | Remains: ${Object.keys(newGamesRemaining2).length}`
      );
    } else {
      console.log('Game not in newGames: ' + item.name);
    }
  });

  console.log(
    'Remaining games in newGamesRemaining2: ',
    Object.values(newGamesRemaining2).length,
    newGamesRemaining2
  );
  console.log('Remaining games in oldGames2: ', Object.values(oldGames2).length, oldGames2);
}

async function getOldIdToKey(newGames: object[]) {
  const result = {};
  console.log('primero:', newGames.length);
  newGames.forEach(item => {
    // @ts-ignore
    // if (result[item.extra.old_game_properties.id]) {
    //   throw new Error('already exists');
    // }
    result[item.extra.old_game_properties.id] = item;
  });
  console.log('segundo:', Object.keys(result).length);
  return result;
}

run();
