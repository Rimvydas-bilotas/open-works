require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const { check, param, validationResult } = require('express-validator');

const app = express();
const { PORT } = process.env;
const { USER } = process.env;
const { PASS } = process.env;

const uri = `mongodb+srv://${USER}:${PASS}@selinantis1tunantis0.hupgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(cors(), express.json());
const client = new MongoClient(uri);

app.get('/services/', async (request, response) => {
  try {
    await client.connect();
    const collection = client
      .db('NodeJS-11-12-services-users')
      .collection('services');
    const users = await collection.find().toArray();
    await client.close();
    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.post(
  '/services/',
  check('name')
    .isString()
    .withMessage('Name should be a string')
    .isLength({ min: 1, max: 30 }),
  check('price')
    .isDecimal({ decimal_digits: '2' })
    .withMessage('Price should be with 2 decimal symbols after comma')
    .isFloat({ min: 0 })
    .withMessage('Price should be positive'),
  check('description')
    .isString()
    .withMessage('Description should be a string')
    .isLength({ min: 1, max: 200 }),
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      const { name, price, description } = request.params;
      await client.connect();
      const collection = client
        .db('NodeJS-11-12-services-users')
        .collection('services');
      const result = await collection.insertOne({ name, price, description });
      await client.close();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },
);

app.delete(
  '/services/:id',
  param('id').custom(async (value) => {
    try {
      await client.connect();
      const collection = client
        .db('NodeJS-11-12-services-users')
        .collection('services');
      const users = await collection.findOne(ObjectId(value));
      await client.close();
      if (users) {
        return true;
      }
      throw new Error('There is no such service in DB with given ID');
    } catch (error) {
      throw new Error('There is no such service in DB with given ID');
    }
  }),
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      const { id } = request.params;
      await client.connect();
      const collection = client
        .db('NodeJS-11-12-services-users')
        .collection('services');
      const users = await collection.deleteOne({ _id: ObjectId(id) });
      await client.close();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },
);

app.get('/users/:order((asc)|(dsc))', async (request, response) => {
  try {
    const order = request.params['0'] || request.params['1'];
    await client.connect();
    const collection = client
      .db('NodeJS-11-12-services-users')
      .collection('users');
    const users = await collection.aggregate([
      { $match: {} },
      {
        $lookup: {
          from: 'services',
          localField: 'membership_type',
          foreignField: '_id',
          as: 'membership',
        },
      },
      {
        $unwind: '$membership',
      },
      {
        $project: {
          first_name: 1, last_name: 1, email: 1, memberships: '$membership.name',
        },
      },
      {
        $sort: { first_name: order === 'dsc' ? -1 : 1 },
      },
    ]).toArray();
    await client.close();
    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.post(
  '/users/',
  check('name')
    .isString()
    .withMessage('Name should be a string')
    .isLength({ min: 1, max: 30 }),
  check('surname')
    .isString()
    .withMessage('Surname should be a string')
    .isLength({ min: 1, max: 30 }),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('membership').custom(async (value) => {
    try {
      await client.connect();
      const collection = client
        .db('NodeJS-11-12-services-users')
        .collection('services');
      const users = await collection.findOne(ObjectId(value));
      await client.close();
      if (users) {
        return true;
      }
      throw new Error('There is no such service in DB with given ID');
    } catch (error) {
      throw new Error('There is no such service in DB with given ID');
    }
  }),
  async (request, response) => {
    try {
      const {
        name, surname, email, membership,
      } = request.body;
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      await client.connect();
      const collection = client
        .db('NodeJS-11-12-services-users')
        .collection('users');
      const result = await collection.insertOne({
        first_name: name,
        last_name: surname,
        email,
        membership_type: ObjectId(membership),
      });
      await client.close();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },
);

app.listen(PORT, () => {
  console.log("It's alive!");
});
