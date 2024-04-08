import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verifyUser } from './auth';
import { logout } from './actions';
import { UserDetails } from './types';
import { generateToken } from './auth';
 
export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value ?? '';
  const loginURL = new URL('/login', request.url);
  if(!session) {  // cookie expiration
    console.log('cookie expired');
    return request.nextUrl.pathname === '/login' ? NextResponse.next() : NextResponse.redirect(loginURL);
  }
  // if the user is already logged in, dont let them go to /login
  if(request.nextUrl.pathname === '/login') return NextResponse.redirect(new URL('/', request.url));
  const response = NextResponse.next();
  try {
    const userDetails = await verifyUser(session);
    //  renew session cookie (create a new jwt)
    const expiresInSeconds = 30;
    const token = await generateToken<UserDetails>(userDetails, expiresInSeconds);
    const cookieList = response.cookies;
    cookieList.set('session', token, { expires: Date.now() + expiresInSeconds * 1000, httpOnly: true });
  } catch (err) {
    console.log(err);
    // if in case of error, logout
    await logout(response);
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}