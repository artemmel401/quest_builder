db = db.getSiblingDB('data');

db.createCollection("quizzes");

print("Collection 'quizzes' created in database 'data'.");