import { dbTest, dbTestString } from './site';

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const MongoClient = require('mongodb').MongoClient;
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const ObjectId = require('mongodb').ObjectId;

export async function connectToDatabase() {
  const mongoClient = new MongoClient(dbTestString);
  const client = await mongoClient.connect();
  return { 'client': client, 'db': client.db(dbTest) };
}