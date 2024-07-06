'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { login } from '@/auth';
import { NextResponse } from 'next/server';

export async function loginSubmit(formState: { message: string }, formData: FormData) {
  try {
    const expiresInSeconds = 30;
    const { username, token } = await login(formData, expiresInSeconds);
    const cookieList = cookies();
    cookieList.set('session', token, { expires: Date.now() + expiresInSeconds * 1000, httpOnly: true });
    console.log('new user login ->', username);
  } catch (err) {
    console.log(err);
    return { message: (err as Error).message };
  }
  redirect('/');
}

export async function logout(response: NextResponse | undefined = undefined) {
  const cookieList = response?.cookies ?? cookies();
  cookieList.set('session', '', { expires: new Date(0) });
  return;
}

export async function logoutSubmit() {
  await logout();
  redirect('/');
}