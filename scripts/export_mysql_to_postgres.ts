import { config } from 'dotenv';
import mysql from 'mysql2/promise';
import { prisma } from '../src/database/prismaClient';

config(); // Load env file

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
  await truncateTable('oldPlayeds');
  await truncateTable('notes');
  await truncateTable('oldGames');
  await truncateTable('users');

  await migrateTable(
    'users',
    'auth_user',
    (item: {
      id?: number;
      is_superuser: number;
      is_staff: number;
      is_active: number;
      date_joined?: Date;
    }) => {
      const mongoItem = {
        ...item,
        is_superuser: !!item.is_superuser,
        is_staff: !!item.is_staff,
        is_active: !!item.is_active,
        created_at: item.date_joined,
        updated_at: item.date_joined,
      };
      delete mongoItem.date_joined;
      return mongoItem;
    }
  );
  await migrateTable('oldGames', 'games_game', (item: { id?: number }) => {
    const mongoItem = { ...item };
    return mongoItem;
  });
  await migrateTable('oldPlayeds', 'games_played', (item: { id?: number; beaten: Boolean }) => {
    const mongoItem = { ...item, beaten: !!item.beaten };
    return mongoItem;
  });
  await migrateTable('notes', 'games_note', (item: { id?: number }) => {
    const mongoItem = { ...item };
    return mongoItem;
  });
  return;
}

async function truncateTable(entity: string) {
  //@ts-ignore
  const resultDelete = await prisma[entity].deleteMany({ where: {} });
  console.log(`Dropped ${resultDelete.count} records in the table ${entity}`);
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
