import { redirect } from 'next/navigation';
import 'src/app/globals.css';
import { getAuthUser, login } from 'src/lib/auth.server';
import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';
import { LogIn } from './LogIn';

export default async function LoginPage() {
  async function handleLogin(formData: FormData): Promise<string> {
    'use server';
    try {
      await login(formData);
      return ''; // No error message
    } catch (error: any) {
      if (error instanceof ClientFeedbackError) {
        return error.getMessage();
      }
      return 'There was a problem logging in';
    }
  }

  const user = await getAuthUser();
  if (user) {
    redirect('/');
  }
  return <LogIn handleSubmit={handleLogin} backgroundNumber={Math.floor(Math.random() * 7 + 1)} />;
}
