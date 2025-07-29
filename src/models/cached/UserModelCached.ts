import { cache } from 'react';
import { UserModel } from 'src/models/UserModel';

export class UserModelCached {
  static async getDemoUser() {
    return await cache(UserModel.getDemoUser)();
  }

  static async getByEmailOrThrow(email: string) {
    return await cache(UserModel.getByEmailOrThrow)(email);
  }

  static async getByEmail(email: string) {
    return await cache(UserModel.getByEmail)(email);
  }
}
