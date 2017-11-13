const express = require('express');
const lowdb = require('lowdb');
const lodashId = require('lodash-id');
const pick = require('lodash/pick');
const FileAsync = require('lowdb/adapters/FileAsync');
const bodyParser = require('body-parser');

const {
  DB_DEFAULTS,
  MEETUP_KEY,
  MEETUP_MANDATORY_KEYS,
  MEETUP_VALID_KEYS
} = require('./data/default-entries');

const PORT = process.env.PORT || 3000;
const DB_PATH = '.data/db.json';

let db;
const app = express();
const postBodyParsers = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false })
];

app.get('/meetup', async (req, res) => {
  const data = await db.get(MEETUP_KEY).value();
  res.send({ data });
});

app.get('/meetup/:id', async (req, res) => {
  const id = req.params.id;
  const data = await db
    .get(MEETUP_KEY)
    .getById(id)
    .value();

  if (data.id === undefined) {
    res.status(404);
  }

  res.send({ data });
});

app.post('/meetup', ...postBodyParsers, async (req, res) => {
  const data = req.body;
  for (let key of MEETUP_MANDATORY_KEYS) {
    if (typeof data[key] !== 'string') {
      res.status(400).send({
        error: `Missing property ${key} or argument is not a string.`
      });
      return;
    }
  }

  const entry = pick(data, MEETUP_VALID_KEYS);
  try {
    const meetup = await db
      .get(MEETUP_KEY)
      .insert(entry)
      .write();
    res.send({ data: meetup });
  } catch (err) {
    res.status(500).send({ error: 'Failed to write to database' });
  }
});

app.patch('/meetup/:id', ...postBodyParsers, async (req, res) => {
  const newData = pick(req.body, MEETUP_VALID_KEYS);
  const id = req.params.id;

  try {
    const data = await db
      .get(MEETUP_KEY)
      .updateById(id, newData)
      .write();
    res.send({ data });
  } catch (err) {
    res.status(500).send({ error: 'Failed to write to database' });
  }
});

app.put('/meetup/:id', ...postBodyParsers, async (req, res) => {
  const newData = pick(req.body, MEETUP_VALID_KEYS);
  const id = req.params.id;

  for (let key of MEETUP_MANDATORY_KEYS) {
    if (typeof newData[key] !== 'string') {
      res.status(400).send({
        error: `Missing property ${key} or argument is not a string.`
      });
      return;
    }
  }

  newData.id = id;

  try {
    const data = await db
      .get(MEETUP_KEY)
      .upsert(newData)
      .write();
    res.send({ data });
  } catch (err) {
    res.status(500).send({ error: 'Failed to write to database' });
  }
});

async function initDb() {
  db = await lowdb(new FileAsync(DB_PATH));
  db._.mixin(lodashId);
  return db.defaults(DB_DEFAULTS).write();
}

async function run() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
