import { config } from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import mysql from 'mysql2/promise';

config(); // Load env file

// Mysql Config
let mysqlClient;
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'waip',
};
// MongoConfig Name
const DB_MONGO = 'waip2';

// Connection URL
const mongoClient = new MongoClient(process.env.MONGODB_URL);
let mongDb;

async function connect() {
  // Use connect method to connect to the server
  await mongoClient.connect();
  console.log('Connected successfully to MONGODB database');
  mongDb = mongoClient.db(DB_MONGO);

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
  }
}

async function doMigrate() {
  const collection = mongDb.collection('games');
  await collection.deleteMany({});

  const games = await mysqlClient.query('SELECT * FROM games_game');
  const gamesToInsert = games[0].map(item => {
    let newItem = { _id: new ObjectId(item.id), ...item };
    return newItem;
  });

  const result = await collection.insertMany(gamesToInsert);

  const document = await collection.findOne({}, { projection: { _id: 1, name: 1 } });

  console.log(document);

  // await gamesToInsert.forEach(async item => {
  //   const result = await collection.insertOne(item);
  //   console.log('Illo: ', result);
  // });

  return;
}

await run();
process.exit(0);
