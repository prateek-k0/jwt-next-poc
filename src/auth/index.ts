import { cookies } from 'next/headers';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { UserDetails } from '@/types';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dummy-secret-key');

export const generateToken = async <T extends JWTPayload = UserDetails> (details: T, expiresIn: number = 30, SECRET_KEY: Uint8Array = JWT_SECRET) => {
  return await new SignJWT(details)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(Date.now() + expiresIn * 1000)
    .setIssuedAt()
    .sign(SECRET_KEY)
}

export async function login(formData: FormData, expiresInSeconds: number = 30) {  // expires in is in seconds
  const username = formData.get('username') as string;
  if(!username) {
    throw new Error('Invalid Username');
  }
  // else
  // create new session cookie for the user
  const userDetails = { username };
  const token = await generateToken<UserDetails>(userDetails, expiresInSeconds);
  return { username, token };
}

export async function verifyUser<T extends JWTPayload = UserDetails>(session: string): Promise<T> {
  const { payload }: { payload: T } = await jwtVerify(session, JWT_SECRET, {
    algorithms: ['HS256']
  });
  return payload;
}

export async function getSession<T extends JWTPayload = UserDetails>(): Promise<T | null> {
  const session = cookies().get('session')?.value ?? '';
  if(!session || session === '') return null;
  try {
    const userDetails: T = await verifyUser(session);
    return userDetails;
  } catch (err) {
    console.log(err);
    return null;
  }
}