import { connectToDatabase } from "../../../utils/mongodb"

export async function getAny() {
    const { db, client } = await connectToDatabase();
    try {
      return await db.collection('users').find({'email': 'artemmel40@mail.ru'}).toArray()
    } catch(err) {
        console.log(err)
    }
    finally {
        client.close();
    }
}

export default async (req, res) => {
  let result = await getAny();
  return res.status(200).json(result);
} 