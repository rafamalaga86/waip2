import { prisma } from 'src/database/prismaClient';

class Game {
  static async save(object) {
    prisma.game.save(object);
  }
}

export { Game };
