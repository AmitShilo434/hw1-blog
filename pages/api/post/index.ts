import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import formidable from 'formidable';
import PersistentFile from 'formidable/PersistentFile';

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: "dq0mokt4c",
  api_key: "775482471871541",
  api_secret: "wvfaZlTCnIab2Jx2XkRp-f-SxIQ"
});


export const config = {
  api: {
    bodyParser: false, // Disables automatic body parsing
  },
};

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log("in handle")
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (fields.session) {
      console.log("in parse")
      if (err) {
        console.log("in err")
        console.error('Error parsing form:', err);
        res.status(500).json({ error: 'Error parsing form' });
        return;
      }

      // Handle the uploaded file here
      const video: PersistentFile | any = files.video;
      console.log("trying to uplosad: ", video.filepath)
      const result = cloudinary.uploader.upload(video.filepath, {
        resource_type: 'video',
        folder: 'videos', // Specify the folder where you want to save the video file in Cloudinary
      });

      result.then((data:  any) => {
        // console.log(data);
        console.log(data.secure_url);
      }).catch((err: any) => {
        console.log(err);
      });
    } else {
    res.status(401).send({ message: 'Unauthorized' })
  }

    


    // You can access the file information through `video` object
    // For example, you can get the file path using `video.path`

    // Example response
    res.status(200).json({ message: 'File uploaded successfully' });
  });
  
  console.log("finished handle")



  // const { title, content, session, email } = req.body;

  
  // if (session) {
  //   const result = await prisma.post.create({
  //     data: {
  //       title: title,
  //       content: content,
  //       author: { connect: { email: email } },
  //     },
  //   });
  //   res.json(result);
  // } else {
  //   res.status(401).send({ message: 'Unauthorized' })
  // }
}
