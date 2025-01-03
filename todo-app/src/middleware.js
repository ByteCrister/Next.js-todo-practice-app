import verifyToken from '@/helper/verifyToken';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  // const token = request.cookies.get('__Secure-token')?.value;
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  console.log(token);

  if (!token) {
    if (pathname === '/signin' || pathname === '/signup') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  const decodedToken = await verifyToken(token);

  if (decodedToken) {
    if (pathname === '/signin' || pathname === '/signup') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();

  } else {
    if (pathname !== '/signin' && pathname !== '/signup') {
      return NextResponse.redirect(new URL('/signup', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signin', '/signup'],
};