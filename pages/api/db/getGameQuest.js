import { connectToDatabase } from "../../../utils/mongodb"

export async function getGameQuest(number) {
  const { db, client } = await connectToDatabase();
  
  try {
    const quest = await db.collection('quizzes').findOne({ number: parseInt(number) });
    
    if (!quest) {
      console.log('Quest not found');
      return null;
    }

    const processTask = (task) => {
      if (!task?.answers) return task;
      
      return {
        ...task,
        answers: task.answers.map(answer => {
          if (task.type === 'text') return {};
          return { ...answer, correct: false }; // Исправлено typo: fasle → false
        })
      };
    };

    if (quest.variants) {
      quest.variants = quest.variants.map(variant => {
        const processedVariant = { ...variant };
        
        ['tasks', 'questionListTasks', 'controlQuestion'].forEach(field => {
          if (Array.isArray(processedVariant[field])) {
            processedVariant[field] = processedVariant[field].map(processTask);
          }
        });
        
        return processedVariant;
      });
    }

    return quest;
    
  } catch (err) {
    console.error('Error fetching quest:', err);
    throw err; 
  } finally {
    await client.close();
  }
}

export default async (req, res) => {
  let result = await getGameQuest(req.body.number);
  return res.status(200).json(result);
} 