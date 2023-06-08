import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import db from '../../../mongoose/db';
import VideoMD from '../../../mongoose/schemas/VideoSchema';


// GET /api/video/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const itemId = req.query.id;

  if (req.method === "GET") {
      // console.log("trying to get id: ", itemId)

      var url = ""
      db.once
      VideoMD.find({_id: itemId}).then((result: any[]) => {
        result.forEach(item => {
          // return note.url to the caller here
          url = item.url
        })
        // mongoose.connection.close()
        res.json(url);

      })

  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}