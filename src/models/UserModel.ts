import { prisma } from 'src/database/prismaClient';

interface UserCreationPayload {
  username: string;
  last_name: string;
  first_name: string;
  email: string;
  password: string;
}

export class UserModel {
  static async getDemoUser() {
    const user = await prisma.users.findUniqueOrThrow({ where: { id: 1 } });
    return {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }
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
    const user = await prisma.users.create({
      data: {
        // TODO: delete the random part
        username: payload.username,
        last_name: payload.last_name,
        first_name: payload.first_name,
        email: payload.email,
        password: payload.password,
        is_active: true,
        is_staff: false,
        is_superuser: false,
        last_login: new Date(),
      },
    });
    return user;
  }
}
