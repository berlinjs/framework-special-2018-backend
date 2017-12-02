const argon2 = require('argon2');
const { Router } = require('express');
const bodyParser = require('body-parser');

const { USER_KEY } = require('../db');
const { createToken } = require('../utils/auth');

const MANDATORY_REQUEST_PARAMS = ['username', 'password'];

const postBodyParsers = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false })
];
const router = Router();

router.post('/login', ...postBodyParsers, async (req, res) => {
  if (!req.body) {
    res.status(400).send('Missing POST body parameters');
    return;
  }

  for (let key of MANDATORY_REQUEST_PARAMS) {
    if (typeof req.body[key] !== 'string') {
      res.status(400).send(`Missing parameter ${key}`);
      return;
    }
  }

  try {
    const user = await req.db
      .get(USER_KEY)
      .find({ username: req.body.username })
      .value();

    if (!user) {
      res.status(403).send('Invalid username/password');
      return;
    }

    argon2.verify(user.hashedPassword, req.body.password).then(match => {
      if (match) {
        const token = createToken(user.username);
        res.send({ token });
      } else {
        res.status(403).send('Invalid username/password');
        return;
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to perform login');
  }
});

router.post('/register', ...postBodyParsers, async (req, res) => {
  if (!req.body) {
    res.status(400).send('Missing POST body parameters');
    return;
  }

  for (let key of MANDATORY_REQUEST_PARAMS) {
    if (typeof req.body[key] !== 'string') {
      res.status(400).send(`Missing parameter ${key}`);
      return;
    }
  }

  try {
    const hashedPassword = await argon2.hash(req.body.password, {
      type: argon2.argon2d
    });

    const data = { username: req.body.username, hashedPassword };
    const user = await req.db
      .get(USER_KEY)
      .insert(data)
      .write();
    const token = createToken(data.username);
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed creating user');
  }
});

module.exports = router;
