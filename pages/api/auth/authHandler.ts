import { NextApiHandler } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";

const secret = process.env.SECRET || "your-secret-key"; 

const authHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // Retrieve the user from the database
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare the provided password with the stored hash
      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (!passwordsMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create a JWT token with the user's ID as the payload
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1d" });

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error authenticating user:", error);
      res.status(500).json({ message: "Failed to authenticate user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default authHandler;
