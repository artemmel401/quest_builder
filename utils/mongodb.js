import { MongoClient, ObjectId } from 'mongodb';
const util = require('util');

export async function connectToDatabase() {
  const dbTestString = process.env.dbTestString;

  const DB_HOSTS = [
    'rc1b-ge01esxbeubbgk80.mdb.yandexcloud.net:27018'
    ]
    
  const DB_USER  = 'user'
  const DB_PASS  = '1q2w3E_4r'
  const DB_NAME = 'data'
  const CACERT   = 'C:/Users/artem/.mongodb/root.crt'
    
  const url = util.format('mongodb://%s:%s@%s/', DB_USER, DB_PASS, DB_HOSTS.join(','))

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsCAFile: CACERT,
    authSource: DB_NAME
}

  const mongoClient = new MongoClient(dbTestString);

  const client = await mongoClient.connect();
  const dbName = dbTestString.split('/')[3];
  const db = client.db(dbName);

  return { client, db };
}