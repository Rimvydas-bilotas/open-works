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

app.get('/questions/:id/answers', async (request, response) => {
  try {
    await client.connect();
    const collection2 = client
      .db('forum')
      .collection('answers');
    const answers = await collection2.find({ question_id: ObjectId(request.params.id) }).toArray();
    await client.close();
    return response.status(200).json(answers);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.post('/questions/', async (request, response) => {
  try {
    const { question, description, pseudoname } = request.body;
    const createdDate = new Date();
    const updatedDate = '';
    const errors = [];
    if (typeof question !== 'string' || question.length < 1) {
      errors.push('question must be a string and must not be empty');
    }
    if (typeof description !== 'string' || description.length < 1) {
      errors.push('description must be a string and must not be empty');
    }
    if (typeof pseudoname !== 'string' || pseudoname.length < 1) {
      errors.push('pseudonym must be a string and must not be empty');
    }
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }
    await client.connect();
    const collection = client.db('forum').collection('questions');
    const addQuestion = await collection.insertOne({
      question, description, pseudonym: pseudoname, createdDate, updatedDate,
    });
    await client.close();
    return response.status(200).json(addQuestion);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.post('/questions/:id/answers', async (request, response) => {
  try {
    const { answer, pseudoname } = request.body;
    const createdDate = new Date();
    const updatedDate = '';
    const upvotes = 0;
    const downvotes = 0;
    const errors = [];
    if (typeof answer !== 'string' || answer.length < 1) {
      errors.push('question must be a string and must not be empty');
    }
    if (typeof pseudoname !== 'string' || pseudoname.length < 1) {
      errors.push('pseudonym must be a string and must not be empty');
    }
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }
    await client.connect();
    const collection1 = client.db('forum').collection('questions');
    const findQuestion = await collection1.findOne({ _id: ObjectId(request.params.id) });
    await client.close();
    if (!findQuestion) {
      errors.push('invalid question id');
    }
    await client.connect();
    const collection = client.db('forum').collection('answers');
    const addTheAnswer = await collection.insertOne({
      // eslint-disable-next-line max-len
      answer, pseudonym: pseudoname, upvotes, downvotes, createdDate, updatedDate, question_id: ObjectId(request.params.id),
    });
    await client.close();
    return response.status(200).json(addTheAnswer);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.delete('/questions/:id', async (request, response) => {
  try {
    await client.connect();
    const collection = client.db('forum').collection('questions');
    await collection.deleteOne({ _id: ObjectId(request.params.id) });
    await client.close();
    try {
      await client.connect();
      const collection2 = client.db('forum').collection('answers');
      await collection2.deleteMany({ question_id: ObjectId(request.params.id) });
      await client.close();
      response.status(200).json('all items deleted');
    } catch (error) {
      response.status(500).json({ error });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.patch('/questions/:id', async (request, response) => {
  try {
    const {
      id, description, question, pseudoname,
    } = request.body;
    const errors = [];
    if (typeof description !== 'string' || description.length < 1) {
      errors.push('question must be a string and must not be empty');
    }
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }
    await client.connect();
    const database = client.db('forum');
    const collection = database.collection('questions');
    const updateQuestion = await collection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: { description, question, pseudonym: pseudoname },
        $currentDate: { updatedDate: true },
      },
    );
    await client.close();
    return response.status(200).json(updateQuestion);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.patch('/answers/:id', async (request, response) => {
  try {
    const {
      id, answer, pseudoname,
    } = request.body;
    const errors = [];
    if (typeof answer !== 'string' || answer.length < 1) {
      errors.push('answer must be a string and must not be empty');
    }
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }
    await client.connect();
    const database = client.db('forum');
    const collection = database.collection('answers');
    const updateAnswer = await collection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: { answer, pseudonym: pseudoname },
        $currentDate: { updatedDate: true },
      },
    );
    await client.close();
    return response.status(200).json(updateAnswer);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log("It's alive!");
});
