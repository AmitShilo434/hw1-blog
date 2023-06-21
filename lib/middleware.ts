import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

interface User extends JwtPayload {
  id: string;
}

export interface AuthenticatedRequest extends NextApiRequest {
  user?: User;
}

export const authMiddleware = (handler: NextApiHandler) => async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
  
  console.log("in Middleware")
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "no_secret") as User;
    req.user = decodedToken;

    return await handler(req, res);

  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
