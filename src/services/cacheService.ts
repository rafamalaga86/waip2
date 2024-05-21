import { JsonObject } from '@prisma/client/runtime/library';
import { getClient } from 'src/lib/mongoClient';

class CacheService {
  #client: any;
  #db: any;
  #collection: any;
  #initialized: boolean = false;

  async initialize() {
    this.#client = await getClient();
    this.#db = this.#client.db(process.env.MONGO_CACHE_DB);
    this.#initialized = true;
  }

  async findById(id: number): Promise<{ data: IgdbGame } | null> {
    id = Number(id);
    const cursor = await this.#collection.find({
      _id: id,
    });
    const result = await cursor.toArray();
    return result.length ? result[0] : null;
  }

  async save(game: IgdbGame) {
    console.log('Escupe: fasd');
    const result = this.#collection.updateOne(
      { _id: game.id },
      { $set: { _id: game.id, updated_at: game.updated_at, data: game } },
      { upsert: true }
    );
  }

  setCollection(collection: string) {
    this.#collection = this.#db.collection(collection);
    return this.#collection;
  }

  isInitialized() {
    return this.#initialized;
  }
}

let cacheService: CacheService | null = null;

async function getCacheService(cacheCollection: string) {
  if (!cacheService) {
    cacheService = new CacheService();
  }
  if (!cacheService.isInitialized()) {
    await cacheService.initialize();
  }
  cacheService.setCollection(cacheCollection);
  return cacheService;
}

export { getCacheService };
