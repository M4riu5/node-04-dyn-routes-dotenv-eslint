const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const { people } = require('./data/db');

const app = express();

// DATA
const users = [
  { id: 3, name: 'James', age: 20 },
  { id: 1, name: 'Serbentautas', age: 45 },
  { id: 2, name: 'Lenteja', age: 30 },
];

// middleware
app.use(morgan('dev'));
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET /api/users = grazina visus users
app.get('/api/users', (req, res) => {
  res.json(users);
});
// GET /api/users/:uid = grazina useri su id uid (DINAMINIS)
// GET /api/users/2 = grazina useri su id 2
app.get('/api/users/:uid', (req, res) => {
  console.log('req.params ---->', req.params);
  const uid = +req.params.uid;
  const findUsers = users.find((a) => a.id === uid);
  if (findUsers) {
    res.json(findUsers);
    return;
  }
  res.status(404).json({ msg: `users with id ${uid} not found` });
});
// GET /api/users/age/30 - grazina useri kurio amzius yra 30 (ne pagal indexa)
app.get('/api/users/age/:uage', (req, res) => {
  console.log('req.params ---->', req.params);
  const uage = +req.params.uage;
  const findUsers = users.find((a) => a.age === uage);
  if (findUsers) {
    res.json(findUsers);
    return;
  }
  res.status(404).json({ msg: `User with age ${uage} not found` });
});
// GET /api/users/lt/age/30 - grazina useri kurio amzius maziau nei 30 (ne pagal indexa)
// GET /api/people/ - grazina visus zmones su visa info
app.get('/api/people/', (req,res) => {
  res.json(people)
});
// visu /api/people/ages amzius masyvo pavidalu
app.get('/api/people/ages', (req, res) => {
  res.json(people.map((pObj) => pObj.age))
});
// GET /api/people/males - grazinti visus vyrus
app.get('/api/people/males', (req, res) => {
  res.json(people.filter((a) => a.sex === 'male'))
});
// GET /api/people/females - grazinti visus moteris
app.get('/api/people/female', (req, res) => {
  res.json(people.filter((a) => a.sex === 'female'))
});
// GET /api/people/ages/avg - grazina visu zmoniu amziu vidurki
app.get('/api/people/ages/avg', (req, res) => {
  res.json(people.reduce((a, b) => a + b.age, 0) / people.length)
});
// 404
app.use((req, res) => {
  res.status(404).json({ msg: 'TOKIO NERA' });
});
const port = 3000;
app.listen(port, () => console.log(`server is runining on port ${port}`.cyan.bold));
