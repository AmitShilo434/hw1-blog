import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'


// Configuration and connect to mongoose
const mongoose = require('mongoose')
const mongooseUrl =
  `mongodb+srv://admin:vH0ceyRtSuZVaNDy@videos.m4cdbi1.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
const videoSchema = new mongoose.Schema({
  postId: String,
  url: String,
  user: String,
  date: Date,
});
const VideoMD = mongoose.models.Video || mongoose.model('Video', videoSchema)


// GET /api/video/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const itemId = req.query.id;

  if (req.method === "GET") {
      console.log("trying to get id: ", itemId)

      await mongoose.connect(mongooseUrl);
      console.log("Connected to MongoDB");

      var url = ""
      VideoMD.find({_id: itemId}).then((result: any[]) => {
        result.forEach(item => {
          console.log(item)
          // return note.url to the caller here
          url = item.url
        })
        mongoose.connection.close()
        res.json(url);

      })

  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}