import { connectToDatabase } from "../../../utils/mongodb"

export async function getAny() {
    const { db, client } = await connectToDatabase();
    try {
      return await db.collection('quizzes').find().toArray()
    } catch(err) {
        console.log(err)
    }
    finally {
        client.close();
    }
}

export default async (req, res) => {
  let result = await getAny(req.number);
  return res.status(200).json(result);
} 