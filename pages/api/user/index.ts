import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware, AuthenticatedRequest } from "../../../lib/middleware";
import prisma from "../../../lib/prisma";

const userHandler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  // Access the authenticated user ID using req.user.id
  const userId = req.user?.id;

  try {
    // Fetch user information from the database using the userId
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      // Exclude sensitive fields if needed
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // Return the user information
    res.status(200).json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authMiddleware(userHandler);
