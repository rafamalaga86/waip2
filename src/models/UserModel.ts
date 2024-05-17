import { prisma } from 'src/database/prismaClient';

interface UserCreationPayload {
  username: string;
  last_name: string;
  first_name: string;
  email: string;
  password: string;
}

export class UserModel {
  static async getByEmailOrThrow(email: string) {
    return prisma.users.findUniqueOrThrow({ where: { email: email } });
  }

  static async getByEmail(email: string) {
    return prisma.users.findUnique({
      where: {
        email: email,
      },
    });
  }

  static async updateLastLogin(id: number) {
    const result = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        last_login: new Date(),
      },
    });

    return !!result;
  }

  static async create(payload: UserCreationPayload) {
    const wasCreated = await prisma.users.create({
      data: {
        // TODO: delete the random part
        username: payload.username + Math.floor(Math.random() * 1000000),
        last_name: payload.last_name,
        first_name: payload.first_name,
        email: payload.email + Math.floor(Math.random() * 1000000),
        password: payload.password,
        is_active: true,
        is_staff: false,
        is_superuser: false,
        last_login: new Date(),
      },
    });
    return wasCreated;
  }
}
