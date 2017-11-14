const express = require('express');
const lowdb = require('lowdb');
const lodashId = require('lodash-id');
const FileAsync = require('lowdb/adapters/FileAsync');

const { DB_PATH, DB_DEFAULTS } = require('./db');
const meetupRouter = require('./routes/meetup');

const PORT = process.env.PORT || 3000;

let db;
const app = express();

app.use((req, res, next) => {
  req.db = db;
});

app.use('/meetup', meetupRouter);

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
