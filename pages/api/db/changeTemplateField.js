import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb"

export async function changeTemplateField(body) {
    const { db, client } = await connectToDatabase();
    try {
      return await db.collection('templates').findOneAndUpdate({_id: new ObjectId(body.id)},
      { $set: { [body.field]: body.value } })
    } catch(err) {
        console.log(err)
    }
    finally {
        client.close();
    }
}

export default async (req, res) => {
  let result = await changeTemplateField(req.body);
  return res.status(200).json(result);
} 