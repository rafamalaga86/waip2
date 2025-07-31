import 'dotenv/config';
import { getClient } from '../src/lib/mongoClient';

async function flushMongo() {
  try {
    const client = await getClient();
    const db = client.db(process.env.MONGO_CACHE_DB);
    const collection = process.env.CACHE_KEY;

    if (!collection) {
      throw new Error('There is no collection name to flush.');
    }

    await db.collection(collection).deleteMany({});
    console.log(`Emptied collection: ${collection}`);

    console.log('MongoDB cache flushed successfully.');
    await client.close();
  } catch (error) {
    console.error('Error flushing MongoDB cache:', error);
  }
}

flushMongo();
