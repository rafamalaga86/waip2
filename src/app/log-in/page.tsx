import { redirect } from 'next/navigation';
import 'src/app/globals.css';
import { getAuthUser, login } from 'src/lib/auth';
import { LogIn } from './LogIn';

export default async function LoginPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    const wasLoggedIn = await login(formData);
    return wasLoggedIn;
  }

  const user = await getAuthUser();
  if (user) {
    redirect('/');
  }
  return <LogIn handleSubmit={handleSubmit} backgroundNumber={Math.floor(Math.random() * 7 + 1)} />;
}
