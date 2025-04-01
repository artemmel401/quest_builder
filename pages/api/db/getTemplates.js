import { connectToDatabase } from "../../../utils/mongodb"

export async function getTemplates() {
    const { db, client } = await connectToDatabase();
    try {
      return await db.collection('templates').find().toArray()
    } catch(err) {
        console.log(err)
    }
    finally {
        client.close();
    }
}

export default async (req, res) => {
  let result = await getTemplates();
  return res.status(200).json(result);
} 