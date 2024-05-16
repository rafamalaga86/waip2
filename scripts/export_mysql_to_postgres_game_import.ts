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
    'SELECT gg.name, gp.beaten, gp.stopped_playing_at FROM games_game gg LEFT JOIN games_played gp ON gg.id = gp.game_id;'
  );

  const gamesToImport = queryResult[0];

  gamesToImport.sort((a: { name: string }, b: { name: string }) => a.name > b.name);
  gamesToImport.forEach((item: { user_id: number }) => {
    item.user_id = USER_ID;
  });

  // const resultInsert = await prisma.gamesToImport.createMany(gamesToImport);

  // console.log('Escupe: items', resultInsert);

  return;
}

/**
 * @param {String} entity collection_name
 * @param {String} table_name name of the table in the mysql database
 */
async function migrateTable(entity: string, table_name: string, modifyRecord?: any) {
  const items = await mysqlClient.query('SELECT * FROM ' + table_name);
  const itemsToInsert = items[0].map((item: { id?: number }) => {
    return modifyRecord ? modifyRecord(item) : item;
  });

  //@ts-ignore
  const resultCreate = await prisma[entity].createMany({
    data: itemsToInsert,
  });

  console.log('Inserted ' + resultCreate.count + ' records in table ' + entity);
}

run();
