import { MongoClient } from 'mongodb';

declare const globalThis: {
  mongoClient?: MongoClient;
};

export async function getClient() {
  if (!process.env.MONGO_DATABASE_URL) {
    throw new Error('Needs a URL for Mongo Database');
  }

  try {
    if (globalThis.mongoClient && globalThis.mongoClient instanceof MongoClient) {
      return globalThis.mongoClient;
    }

    globalThis.mongoClient = new MongoClient(process.env.MONGO_DATABASE_URL);
    await globalThis.mongoClient.connect();
    return globalThis.mongoClient;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
