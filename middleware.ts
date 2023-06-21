import { NextRequest, NextResponse } from 'next/server';
import { useAuthContext, User } from './components/AuthContext';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Limit the middleware to paths starting with `/api/`
// '/api/user/:path*', '/api/publish/:path*', '/api/post/:path*'
export const config = {
  matcher: [],
};

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  const { user } = useAuthContext();
  const token = user?.token ?? '';
  console.log('in MIDDLEWARE with token ', token);

  const verifyToken = (token: string): boolean => {
    try {
      // Replace the use of the 'buffer' module with base64 decoding
      const encodedPayload = token.split('.')[1];
      const decodedPayload = atob(encodedPayload);
      const payload = JSON.parse(decodedPayload) as User;

      // Verify the token using the secret key or public key, depending on how it was signed
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'no_secret') as JwtPayload & User;

      return true; // Token is valid and verified
    } catch (error) {
      return false; // Token is invalid or verification failed
    }
  };

  if (!verifyToken(token)) {
    console.log('UNAUTHHHH');
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }
}
