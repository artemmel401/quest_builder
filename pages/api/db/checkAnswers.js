import { connectToDatabase } from "../../../utils/mongodb"

export async function checkAnswers(body) {
  const { db, client } = await connectToDatabase();
  try {
    const quest = await db.collection('quizzes').find({ 'number': parseInt(body.number) }).toArray();
    if (!quest[0]) return false;

    const task = quest[0].variants[body.variantNumber][body.taskType]?.[body.taskIndex];
    if (!task) return false;

    const userAnswer = body.userAnswer;

    switch (task.type) {
      case 'text':
        console.log(userAnswer,task.answers)
        return task.answers.some(answer =>
          answer.content.toString() === userAnswer.toString()
        );

      case 'checkbox':
        if (!Array.isArray(userAnswer)) return false;
        const correctIds = task.answers
          .filter(answer => answer.correct)
          .map(answer => answer.id)
          .sort();
        return correctIds.length === userAnswer.length &&
          correctIds.every((id, index) => id === userAnswer.sort()[index]);

      case 'radio':
        const selectedAnswer = task.answers.find(answer => answer.id === userAnswer);
        return selectedAnswer ? selectedAnswer.correct : false;

      default:
        return false;
    }
  } catch (err) {
    console.log(err)
    return false
  }
  finally {
    client.close();
  }
}

export default async (req, res) => {
  let result = await checkAnswers(req.body);
  return res.status(200).json(result);
} 