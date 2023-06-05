import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    postId: String,
    url: String,
    user: String,
    date: Date,
  });

const VideoMD = mongoose.models.Video || mongoose.model('Video', videoSchema)

export default VideoMD;