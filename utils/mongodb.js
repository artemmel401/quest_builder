import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const dbTestString = process.env.DB_TEST_STRING;
  
  const mongoClient = new MongoClient(dbTestString);

  const client = await mongoClient.connect();
  const dbName = dbTestString.split('/')[3];
  const db = client.db(dbName);

  return { client, db };
}