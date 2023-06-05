// db.ts
import mongoose from 'mongoose';

// Create a connection pool
const mongooseUrl =
  `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASS}@videos.m4cdbi1.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongooseUrl);

const db = mongoose.connection;

// Handle connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default db;
