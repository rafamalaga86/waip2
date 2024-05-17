import { config } from 'dotenv';
import mysql from 'mysql2/promise';
import { prisma } from '../src/database/prismaClient';

config(); // Load env file

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
  const queryResult = await mysqlClient.query(
    'SELECT gg.name, gp.beaten, gp.stopped_playing_at, gg.created_at, gg.updated_at, gg.order FROM games_game gg LEFT JOIN games_played gp ON gg.id = gp.game_id;'
  );

  const gamesToImport = queryResult[0];

  gamesToImport.sort((a: { name: string }, b: { name: string }) => a.name > b.name);
  gamesToImport.forEach((item: { user_id: number; beaten: number | boolean }) => {
    item.beaten = !!item.beaten;
    item.user_id = USER_ID;
  });

  await prisma.gamesToImport.deleteMany({ where: { user_id: USER_ID } });
  const resultInsert = await prisma.gamesToImport.createMany({ data: gamesToImport });
  return;
}

run();
