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

// POST /api/cloudinary
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const form = new formidable.IncomingForm();
  
    form.parse(req, (err, fields, files) => {
        if (fields.session) {
            if (err) {
            res.status(500).json({ error: 'Error parsing form' });
            return;
            }

            // Handle the uploaded file here
            if(files.video) {
                const video: PersistentFile | any = files.video;
                // console.log("trying to upload: ", video.filepath)
                const result = cloudinary.uploader.upload(video.filepath, {
                resource_type: 'video',
                folder: 'videos', // Specify the folder where you want to save the video file in Cloudinary
                });
    
                result.then((data:  any) => {
                // console.log(data);
                console.log(data.secure_url);
                res.status(200).json({ url: data.secure_url });
                }).catch((error: any) => {
                    res.status(500).json({ error: 'cant upload the video' });
                });
            }
        } else {
            res.status(401).send({ message: 'Unauthorized' })
        }
    });
}
