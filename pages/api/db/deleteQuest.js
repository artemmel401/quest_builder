import { connectToDatabase } from "../../../utils/mongodb";

export async function deleteQuest(number) {
  const { db, client } = await connectToDatabase();
  console.log(number)
  try {
    return await db.collection('quizzes').deleteOne({number: number})
  } catch(err) {
      console.log(err)
  }
  finally {
      client.close();
  }
}

export default async (req, res) => {
let result = await deleteQuest(req.body.number);
return res.status(200).json(result);
} 