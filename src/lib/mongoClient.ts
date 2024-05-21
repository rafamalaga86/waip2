import { MongoClient } from 'mongodb';

let client: MongoClient | null;

export async function getClient() {
  if (!process.env.MONGO_DATABASE_URL) {
    throw new Error('Needs a URL for Mongo Database');
  }

  try {
    if (!client) {
      client = new MongoClient(process.env.MONGO_DATABASE_URL);
      await client.connect();
    }
    return client;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
