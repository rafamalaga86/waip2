import { getClient } from 'src/lib/mongoClient';

class CacheService {
  #client: any;
  #collection: any;

  constructor() {}

  async initialize(collection: string) {
    this.#client = await getClient();
    this.#client.db(process.env.MONGO_CACHE_DB);
    this.#collection = this.#client.collection(collection);
  }

  async fetchById(id: number) {
    await this.#collection.find({ _id: id }).toArray();
  }
}

async function getCacheService(cacheCollection: string) {
  const cacheService = new CacheService();
  await cacheService.initialize(cacheCollection);
  return cacheService;
}

export { getCacheService };
