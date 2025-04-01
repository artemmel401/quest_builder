import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb"

export async function getTemplate(id) {
    const { db, client } = await connectToDatabase();
    try {
      return await db.collection('templates').find({'_id': new ObjectId(id)}).toArray()
    } catch(err) {
        console.log(err)
    }
    finally {
        client.close();
    }
}

export default async (req, res) => {
  let result = await getTemplate(req.body.id);
  return res.status(200).json(result);
} 