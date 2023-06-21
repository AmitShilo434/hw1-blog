import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.email;
  // console.log("email",email)


  if (!email) {
    return res.status(400).json({ message: 'Missing email parameter' });
  }

  try {
    const drafts = await prisma.post.findMany({
      where: {
        author: { email: email.toString() },
        published: false,
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    return res.status(200).json({ drafts });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch drafts' });
  }
}
