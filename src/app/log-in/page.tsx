import { redirect } from 'next/navigation';
import 'src/app/globals.css';
import { login } from 'src/lib/auth';
import { UserModel } from 'src/models/UserModel';
import { LogIn } from './LogIn';

export default async function LoginPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    const wasLoggedIn = await login(formData);
    return wasLoggedIn;
  }

  const user = await UserModel.getAuth();
  if (user) {
    redirect('/');
  }
  return <LogIn handleSubmit={handleSubmit} backgroundNumber={Math.floor(Math.random() * 7 + 1)} />;
}
