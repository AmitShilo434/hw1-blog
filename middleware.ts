import { NextRequest, NextResponse } from 'next/server'
import { useAuthContext, User } from './components/AuthContext';
import jwt, { JwtPayload } from "jsonwebtoken";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: ['/api/user/:path*', '/api/publish/:path*'],
}
 
export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  const { user } = useAuthContext();
  const token = user?.token ?? ""

  const verifyToken = (token: string): boolean => {
        try {
        // Verify the token using the secret key or public key, depending on how it was signed
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "no_secret") as User;
        return true; // Token is valid and verified

        } catch (error) {
        return false; // Token is invalid or verification failed
        }
    }

  console.log("in MIDDLEWARE")
  if (!verifyToken(token)) {
    console.log("UNAUTHHHH")
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}