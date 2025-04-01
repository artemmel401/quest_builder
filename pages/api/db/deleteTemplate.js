import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";

export async function deleteTemplate(id) {
  const { db, client } = await connectToDatabase();
  console.log(id)
  try {
    return await db.collection('templates').deleteOne({_id: new ObjectId(id)})
  } catch(err) {
      console.log(err)
  }
  finally {
      client.close();
  }
}

export default async (req, res) => {
let result = await deleteTemplate(req.body.id);
return res.status(200).json(result);
} 