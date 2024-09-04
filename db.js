const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGODB_URI;
const dbName = "pijarmahir";

let client;

async function connectToMongoDB() {
  try {
    client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB server');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

function getDb() {
  return client.db(dbName);
}

module.exports = { connectToMongoDB, getDb };