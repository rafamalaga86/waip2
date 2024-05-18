import { config } from 'dotenv';
import mysql from 'mysql2/promise';
import { GameModel } from 'src/models/GameModel';
import { prisma } from '../src/database/prismaClient';

interface OldGame {
  id: number;
  user_id: number;
  beaten: number | boolean;
  name: string;
  stopped_playing_at: Date;
  order: number;
  created_at: Date;
  updated_at: Date;
  cover_url: string;
  metacritic_score: string;
  release_date: Date;
  synopsis: string;
  developer: string;
  genres: string;
  hltb_length: number;
}

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
    await doMigrate();
  } catch (err) {
    console.error(err);
    console.log('Hubo un error...');
    process.exit(0);
  }

  console.log('Terminó con éxito');
  process.exit(0);
}

async function doMigrate() {
  const result = await mysqlClient.query(
    `
    SELECT
      gg.*,
      gp.beaten,
      gp.stopped_playing_at
    FROM games_game gg
    LEFT JOIN games_played gp
    ON gg.id = gp.game_id
    WHERE gg.user_id = ${OLD_USER_ID}
    ;`
  );

  const queryResult = result[0];

  queryResult.sort((a: { name: string }, b: { name: string }) => a.name > b.name);
  const gamesToImport = queryResult.map((game: OldGame) => {
    return {
      name: game.name,
      beaten: !!game.beaten,
      user_id: USER_ID,
      stopped_playing_at: game.stopped_playing_at,
      order: game.order,
      created_at: game.created_at,
      updated_at: game.updated_at,
      extra: {
        old_game_properties: {
          id: game.id,
          cover_url: game.cover_url,
          metacritic_score: game.metacritic_score,
          release_date: game.release_date,
          synopsis: game.synopsis,
          developer: game.developer,
          genres: game.genres,
          hltb_length: game.hltb_length,
        },
      },
    };
  });

  await prisma.games_to_import.deleteMany({ where: { user_id: USER_ID } });
  return await prisma.games_to_import.createMany({ data: gamesToImport });
}

run();
