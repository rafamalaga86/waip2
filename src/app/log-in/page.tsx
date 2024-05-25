import { redirect } from 'next/navigation';
import 'src/app/globals.css';
import { getAuthUser, login } from 'src/lib/auth';
import { LogIn } from './LogIn';

export default async function LoginPage() {
  async function handleLogin(formData: FormData) {
    'use server';
    return await login(formData);
  }

  const user = await getAuthUser();
  if (user) {
    redirect('/');
  }
  return <LogIn handleSubmit={handleLogin} backgroundNumber={Math.floor(Math.random() * 7 + 1)} />;
}
