import { connectToDatabase } from "../../../utils/mongodb"

export async function changeQuestField(body) {
    const { db, client } = await connectToDatabase();
    try {
      return await db.collection('quizzes').findOneAndUpdate({number: parseInt(body.number)},
      { $set: { [body.field]: body.value } })
    } catch(err) {
        console.log(err)
    }
    finally {
        client.close();
    }
}

export default async (req, res) => {
  let result = await changeQuestField(req.body);
  return res.status(200).json(result);
} 