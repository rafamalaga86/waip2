import { MongoClient } from 'mongodb';

export async function getClient() {
  if (!process.env.MONGO_DATABASE_URL) {
    throw new Error('Needs a URL for Mongo Database');
  }

  const client = new MongoClient(process.env.MONGO_DATABASE_URL);
  try {
    await client.connect();
    return client;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
