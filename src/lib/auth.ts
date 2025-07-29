import { Prisma, users } from '@prisma/client';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { userValidator } from 'src/lib/validators';
import { UserModel } from 'src/models/UserModel';
import { UserModelCached } from 'src/models/cached/UserModelCached';
import { ClientFeedbackError } from './errors/ClientFeedbackError';

const KEY = new TextEncoder().encode(process.env.SECRET_KEY);
const EXPIRE_TIME = 60 * 60 * 1000; // 1 hour
const SALT_ROUNDS = 10;

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 hour from now')
    .sign(KEY);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, KEY, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function register(formData: FormData) {
  const userDetails = {
    username: formData.get('username') as string,
    last_name: formData.get('last_name') as string,
    first_name: formData.get('first_name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const resultValidator = userValidator.validate(userDetails, { abortEarly: false });

  if (resultValidator.error) {
    throw new ClientFeedbackError(JSON.stringify(resultValidator.error.details), 400);
  }

  let user;
  try {
    userDetails.password = await hashPassword(userDetails.password);
    user = await UserModel.create(userDetails);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === 'P2002' &&
        error.meta &&
        error.meta.target &&
        // @ts-ignore
        error.meta.target[0] === 'username'
      ) {
        throw new ClientFeedbackError(
          '[{"path":"username", "message":"The username is being used by another user already"}]',
          400
        );
      } else if (
        error.code === 'P2002' &&
        error.meta &&
        error.meta.target &&
        // @ts-ignore
        error.meta.target[0] === 'email'
      ) {
        throw new ClientFeedbackError(
          '[{"path":"email", "message":"That email is being used by another user already"}]',
          400
        );
      }
    }
    // Si la excepción no es de tipo UniqueConstraintViolation, la lanzamos nuevamente
    throw error;
  }
  await createSession(user);

  return user;
}

export async function getAuthUser(): Promise<users | null> {
  const session = await getSession();
  if (!session) return null;
  return session.user;
}

export async function getAuthUserVisible(): Promise<UserVisible | null> {
  const user = await getAuthUser();
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };
}

export async function login(formData: FormData): Promise<boolean> {
  const email = formData.get('email');
  if (!email || typeof email !== 'string') {
    throw new ClientFeedbackError('That is not a valid email');
  }
  const genericError = 'The password is incorrect or email does not exists';

  const password = formData.get('password');
  if (!password || typeof password !== 'string') {
    throw new ClientFeedbackError(genericError);
  }
  // Verify credentials && get the user
  const user = await UserModelCached.getByEmail(email);
  if (!user) {
    throw new ClientFeedbackError(genericError);
  }
  if (!(await checkPassowrd(password, user.password))) {
    throw new ClientFeedbackError(genericError);
  }
  // Create the session
  await createSession(user);

  return true;
}

async function createSession(user: users) {
  const expires = new Date(Date.now() + EXPIRE_TIME);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set('session', session, {
    expires,
    httpOnly: true, // httpOnly cookies are only read on server
  });

  UserModel.updateLastLogin(user.id);
}

export async function logout(): Promise<boolean> {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) });
  return true;
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value; // If user is logged in
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + EXPIRE_TIME);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

async function hashPassword(password: string) {
  const bcrypt = require('bcrypt');
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function checkPassowrd(password: string, hashedPassowrd: string) {
  const bcrypt = require('bcrypt');
  return await bcrypt.compare(password, hashedPassowrd);
}
