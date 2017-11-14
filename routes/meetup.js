const { Router } = require('express');
const bodyParser = require('body-parser');
const pick = require('lodash/pick');

const {
  MEETUP_KEY,
  MEETUP_MANDATORY_KEYS,
  MEETUP_VALID_KEYS
} = require('../data/default-entries');

const router = Router();

const postBodyParsers = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false })
];

router.get('/meetup', async (req, res) => {
  const data = await req.db.get(MEETUP_KEY).value();
  res.send({ data });
});

router.get('/meetup/:id', async (req, res) => {
  const id = req.params.id;
  const data = await req.db
    .get(MEETUP_KEY)
    .getById(id)
    .value();

  if (data.id === undefined) {
    res.status(404);
  }

  res.send({ data });
});

router.post('/meetup', ...postBodyParsers, async (req, res) => {
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
    const meetup = await req.db
      .get(MEETUP_KEY)
      .insert(entry)
      .write();
    res.send({ data: meetup });
  } catch (err) {
    res.status(500).send({ error: 'Failed to write to database' });
  }
});

router.patch('/meetup/:id', ...postBodyParsers, async (req, res) => {
  const newData = pick(req.body, MEETUP_VALID_KEYS);
  const id = req.params.id;

  try {
    const data = await req.db
      .get(MEETUP_KEY)
      .updateById(id, newData)
      .write();
    res.send({ data });
  } catch (err) {
    res.status(500).send({ error: 'Failed to write to database' });
  }
});

router.put('/meetup/:id', ...postBodyParsers, async (req, res) => {
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
    const data = await req.db
      .get(MEETUP_KEY)
      .upsert(newData)
      .write();
    res.send({ data });
  } catch (err) {
    res.status(500).send({ error: 'Failed to write to database' });
  }
});

module.exports = router;
