import { register } from 'src/lib/auth';
import { Register } from './Register';

export default async function RegisterPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    const result = await register(formData);
    return result;
  }

  return <Register handleSubmit={handleSubmit} />;
}
