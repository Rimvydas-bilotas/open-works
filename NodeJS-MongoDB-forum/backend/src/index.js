require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const {
  PORT, URI,
} = process.env;

app.use(cors(), express.json());
const client = new MongoClient(URI);

app.get('/questions', async (request, response) => {
  try {
    await client.connect();
    const collection = client
      .db('forum')
      .collection('questions');
    const questions = await collection.find().toArray();
    await client.close();
    return response.status(200).json(questions);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.post('/questions', async (request, response) => {
  try {
    const { question, description, pseudonym } = request.body;
    const createdDate = new Date();
    const updatedDate = '';
    const errors = [];
    if (typeof question !== 'string' || question.length < 1) {
      errors.push('question must be a string and must not be empty');
    }
    if (typeof description !== 'string' || description.length < 1) {
      errors.push('description must be a string and must not be empty');
    }
    if (typeof pseudonym !== 'string' || pseudonym.length < 1) {
      errors.push('pseudonym must be a string and must not be empty');
    }
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }
    await client.connect();
    const collection = client.db('forum').collection('questions');
    const addQuestion = await collection.insertOne({
      question, description, pseudonym, createdDate, updatedDate,
    });
    await client.close();
    return response.status(200).json(addQuestion);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.delete('/questions/:id', async (request, response) => {
  try {
    await client.connect();
    const collection = client.db('forum').collection('questions');
    const deletedquestion = await collection.deleteOne({ _id: ObjectId(request.params.id) });
    await client.close();
    response.status(200).json(deletedquestion);
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log("It's alive!");
});
