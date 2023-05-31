const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
