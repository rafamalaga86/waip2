import { prisma } from 'src/database/prismaClient';

if (!process.argv[2]) {
  console.log('You should include the password as an argument');
  process.exit(1);
}
async function main(password: string) {
  try {
    await prisma.users.create({
      data: {
        username: 'Postizo',
        email: 'rafamalaga86@gmail.com',
        first_name: 'Rafael',
        last_name: 'García Doblas',
        is_superuser: true,
        is_staff: true,
        is_active: true,
        password: password,
      },
    });
  } catch (error: any) {
    console.log('Error: ', error.message);
    process.exit(1);
  }

  console.log('Created successfully');
}

main(process.argv[2]);
