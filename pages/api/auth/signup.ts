import { NextApiHandler } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

const signupHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const user = {
        name: username,
        email: email,
        password: hashedPassword,
      }
      const newUser = await prisma.user.create({
        data: user,
      })

      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default signupHandler;
