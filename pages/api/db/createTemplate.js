import { connectToDatabase } from "../../../utils/mongodb";

export async function createTemplate() {
  const { db, client } = await connectToDatabase();
  try {
    const newData = {
      rooms: [], 
      subjects: [], 
      relations: [],
      title: '',
      type: ''
    }
    const result = await db.collection('templates').insertOne(newData);
    return result.insertedId;
  } catch(err) {
      console.log(err)
  }
}

export default async (req, res) => {
let result = await createTemplate();
return res.status(200).json(result);
} 