import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import formidable from 'formidable';
import PersistentFile from 'formidable/PersistentFile';

// Disables automatic body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};


// Configuration to cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: "dq0mokt4c",
  api_key: "775482471871541",
  api_secret: "wvfaZlTCnIab2Jx2XkRp-f-SxIQ"
});

// Configuration and connect to mongoose
const mongoose = require('mongoose')
const url =
  `mongodb+srv://admin:vH0ceyRtSuZVaNDy@videos.m4cdbi1.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)
const videoSchema = new mongoose.Schema({
  postId: String,
  url: String,
  user: String,
  date: Date,
})
const VideoMD = mongoose.model('Video', videoSchema)

// POST /api/post
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

      const title: any = fields.title;
      const content: any = fields.content;
      const email: any = fields.email;

      const postResult: any = prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: email } },
        },
      }).then((postResult) => {
        const postId = postResult.id;
        console.log(postId); // Assuming postId exists in the result

        // Handle the uploaded file here
        if(files.video) {
          const video: PersistentFile | any = files.video;
          console.log("trying to upload: ", video.filepath)
          const result = cloudinary.uploader.upload(video.filepath, {
            resource_type: 'video',
            folder: 'videos', // Specify the folder where you want to save the video file in Cloudinary
          });

          result.then((data:  any) => {
            // console.log(data);
            console.log(data.secure_url);

            
            const video = new VideoMD({
              postId: postResult.id,
              url: data.secure_url,
              user: postResult.authorId,
              date: new Date(),
            });
            video.save().then((res: any) => {
              console.log('video saved!', res.id)
              mongoose.connection.close()
            })

            // const video = new Video({
            //   postId: postId,
            //   url: data.secure_url,
            //   user: "sa",
            // });
            // video.save().then(result => {
            //   console.log('video saved!')
            //   mongoose.connection.close()
            // })


          }).catch((err: any) => {
            console.log(err);
          });
        }

      })
        // res.json(result);


      // Handle the uploaded file here
      // const video: PersistentFile | any = files.video;
      // console.log("trying to uplosad: ", video.filepath)
      // const result = cloudinary.uploader.upload(video.filepath, {
      //   resource_type: 'video',
      //   folder: 'videos', // Specify the folder where you want to save the video file in Cloudinary
      // });

      // result.then((data:  any) => {
      //   // console.log(data);
      //   console.log(data.secure_url);
      // }).catch((err: any) => {
      //   console.log(err);
      // });
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
