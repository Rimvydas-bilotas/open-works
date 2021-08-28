require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
// const { json } = require('express');

const app = express();
const PORT = 8080;
const USER = 'Admin';
const PASS = 'Admin';
// const { PORT, USER, PASS } = process.env;
const uri = `mongodb+srv://${USER}:${PASS}@selinantis1tunantis0.hupgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(cors(), express.json());
const client = new MongoClient(uri);

app.get('/', async (request, response) => {
  try {
    console.log(request.query.type);
    await client.connect();
    const database = client.db('PetsDB');
    const collection = database.collection('pets');
    const pets = await collection.find({ type: { $in: request.query.type?.split(',') } }).sort('age', request.query.sort?.toLowerCase() === 'dsc' ? -1 : 1).toArray();
    await client.close();
    return response.status(200).json(pets);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.post('/', async (request, response) => {
  try {
    const { name, type, age } = request.body;
    const errors = [];
    if (typeof name !== 'string') {
      errors.push('name must be a string');
    }
    if (!['cat', 'dog', 'parrot'].includes(type)) {
      errors.push('type must be cat, dog or parrot');
    }

    if (!Number.isInteger(age) || age < 0 || age > 100) {
      errors.push('age must be an integer between 1 and 99');
    }
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    await client.connect();
    const database = client.db('PetsDB');
    const collection = database.collection('pets');
    const pet = await collection.insertOne({ name, type, age });
    await client.close();
    return response.status(200).json(pet);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.get('/:id', async (request, response) => {
  try {
      const { id } = request.params;
      console.log(id);
      await client.connect();
      const database = client.db('PetsDB');
      const collection = database.collection('pets');
      const pet = await collection.findOne(ObjectId(id));
      await client.close();
      response.status(200).json(pet);
  }
  catch (error) {
      response.status(500).json({ error });
      console.log(`GET-ONE: ${error}`);
  }
});

app.delete('/:petId', async (request, response) => {
  try {
      await client.connect();
      const database = client.db('PetsDB');
      const collection = database.collection('pets');
      console.log(request.params.petId);
      const deletedPet = await collection.deleteOne({ "_id" : ObjectId(request.params.petId) });
      await client.close();
      response.status(200).json(deletedPet);
  }
  catch (error) {
      response.status(500).json({ error });
      console.log(`DELETE: ${error}`);
  }
});

app.put('/:petId', async (request, response) => {
  try {
    const { name, type, age } = request.body;
    const errors = [];
    if (typeof name !== 'string') {
      errors.push('name must be a string');
    }
    if (!['cat', 'dog', 'parrot'].includes(type)) {
      errors.push('type must be cat, dog or parrot');
    }

    if (!Number.isInteger(age) || age < 0 || age > 100) {
      errors.push('age must be an integer between 1 and 99');
    }
    if (errors.length > 0) {
      return response.status(400).json({ errors });
    }

    await client.connect();
    const database = client.db('PetsDB');
    const collection = database.collection('pets');
    const updatePet = await collection.replaceOne(
      { "_id" : ObjectId(request.params.petId) },
      { name: name.trim(), type, age }
      );
    await client.close();
    return response.status(200).json(updatePet);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(
    `My app is running and listening to port http://localhost:${PORT}/`,
  );
});
