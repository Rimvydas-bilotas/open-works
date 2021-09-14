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
    if (typeof question !== 'string') {
      errors.push('question must be a string');
    }
    if (typeof description !== 'string') {
      errors.push('description must be a string');
    }
    if (typeof pseudonym !== 'string') {
      errors.push('pseudonym must be a string');
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

app.listen(PORT, () => {
  console.log("It's alive!");
});
