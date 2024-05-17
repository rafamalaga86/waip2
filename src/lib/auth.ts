import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from 'src/models/UserModel';

const KEY = new TextEncoder().encode(process.env.SECRET_KEY);
const EXPIRE_TIME = 60 * 60 * 1000; // 1 hour

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
  const wasCreated = await UserModel.create({
    username: 'peter',
    last_name: 'Griffin',
    first_name: 'Peter',
    email: 'peter@griffin.com',
    password: 'password',
  });
  return wasCreated;
}

export async function getAuthUser() {
  const session = await getSession();
  if (!session) return null;
  return session.user;
}

export async function login(formData: FormData): Promise<boolean> {
  const email = formData.get('email');
  if (!email || typeof email !== 'string') {
    throw new Error('That is not a valid email');
  }

  // Verify credentials && get the user
  const user = await UserModel.getByEmail(email);
  if (!user) {
    throw new Error('The password is incorrect or email does not exists');
  }
  UserModel.updateLastLogin(user.id);

  // Create the session
  const expires = new Date(Date.now() + EXPIRE_TIME);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set('session', session, {
    expires,
    httpOnly: true, // httpOnly cookies are only read on server
  });

  return true;
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) });
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
