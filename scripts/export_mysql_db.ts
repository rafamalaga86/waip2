import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import mysql from 'mysql2/promise';

config(); // Load env file

// Mysql Config
let mysqlClient: any;
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'waip',
};
// MongoConfig Name
const DB_MONGO = 'waip2';

// Connection URL
if (!process.env.DATABASE_URL) {
  console.log('Database URL not found');
  process.exit(1);
}
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let mongoDb: any;

async function connect() {
  // Use connect method to connect to the server
  await mongoClient.connect();
  console.log('Connected successfully to MONGODB database');
  mongoDb = mongoClient.db(DB_MONGO);

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
  await migrateTable(
    'users',
    'auth_user',
    (item: {
      id?: Number;
      is_superuser: Number;
      is_staff: Number;
      is_active: Number;
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
  await migrateTable('games', 'games_game', (item: { id?: Number }) => {
    const mongoItem = { ...item };
    return mongoItem;
  });
  await migrateTable(
    'playeds',
    'games_played',
    (item: { id?: Number; beaten: Boolean }) => {
      const mongoItem = { ...item, beaten: !!item.beaten };
      return mongoItem;
    }
  );
  await migrateTable('notes', 'games_note', (item: { id?: Number }) => {
    const mongoItem = { ...item };
    return mongoItem;
  });
  return;
}

/**
 * @param {String} entity collection_name
 * @param {String} table_name name of the table in the mysql database
 */
async function migrateTable(entity: String, table_name: String, modifyRecord?: Function) {
  const collection = mongoDb.collection(entity);
  const deleteResult = await collection.deleteMany({});
  console.log(`Dropped ${deleteResult.deletedCount} records in the table ${entity}`);

  const items = await mysqlClient.query('SELECT * FROM ' + table_name);
  const itemsToInsert = items[0].map((item: { id?: Number }) => {
    return modifyRecord ? modifyRecord(item) : item;
  });

  // Using mongo db driver
  const result = await collection.insertMany(itemsToInsert);
}

run();
