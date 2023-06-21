import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import formidable from 'formidable';
import PersistentFile from 'formidable/PersistentFile';
import db from '../../../mongoose/db';
import VideoMD from '../../../mongoose/schemas/VideoSchema';

// Disables automatic body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};


// Configuration to cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// POST /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ error: 'Error parsing form' });
        return;
      }

      const title: any = fields.title;
      const content: any = fields.content;
      const email: any = fields.email;

      const postResult: any = prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: email } },
        },
      }).then((postResult: { id: any; authorId: any; }) => {
        const postId = postResult.id;
        console.log(postId); // Assuming postId exists in the result

        // Handle the uploaded file here
        if(files.video) {
          const video: PersistentFile | any = files.video;
          const result = cloudinary.uploader.upload(video.filepath, {
            resource_type: 'video',
            folder: 'videos', // Specify the folder where you want to save the video file in Cloudinary
          });

          result.then((data:  any) => {
            // console.log(data);
            // console.log(data.secure_url);

            const video: any = new VideoMD({
              postId: postResult.id,
              url: data.secure_url,
              user: postResult.authorId,
              date: new Date(),
            });
            db.once
            video.save().then((res: any) => {
              console.log('video saved!', res.id)
              // mongoose.connection.close()
              try {
                const updatedItem = prisma.post.update({
                  where: { id: postId }, 
                  data: { videoUrl: res.id },
                }).then((postResult: any) => {
                  console.log('Item updated: ', postResult);
                })
              } catch (error) {
                console.error('Error updating item:', error);
              }
            })

          }).catch((err: any) => {
            console.log(err);
          });
        }

      })
      res.json(postResult);

    // Example response
    // res.status(200).json({ message: 'File uploaded successfully' });
  });

}
