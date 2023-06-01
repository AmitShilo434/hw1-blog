import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { itemId } = req.query;

  // Configuration and connect to mongoose
  const mongoose = require('mongoose')
  const url =
    `mongodb+srv://admin:vH0ceyRtSuZVaNDy@videos.m4cdbi1.mongodb.net/?retryWrites=true&w=majority`
  mongoose.set('strictQuery',false)
  mongoose.connect(url)

  try {
    await client.connect();

    const db = mongoose.db('test');
    const collection = db.collection('Videos');

    const item = await collection.findOne({ _id: new ObjectId(itemId) });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json(item);
  } catch (error) {
    console.error('Error retrieving item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
