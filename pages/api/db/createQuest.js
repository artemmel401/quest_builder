import { connectToDatabase } from "../../../utils/mongodb";

export async function createQuiz(templateId) {
  const { db, client } = await connectToDatabase();
  try {
    const numbers = await db.collection('quizzes').countDocuments();
    const newData = {
      number: numbers + 100000863 + 1,
      type: 'questBuilder',
      userId: '6606e2dd22428850e0b5bf4f',
      templateId: templateId,
      variants: [],
      title: '',
      updateTime: Date.now(),
      description: "",
      fields: ['Фамилия', 'Имя', '']
    }
    await db.collection('quizzes').insertOne(newData);
    return numbers + 100000863 + 1;
  } catch(err) {
      console.log(err)
  }
}

export default async (req, res) => {
let result = await createQuiz(req.body.templateId);
return res.status(200).json(result);
} 