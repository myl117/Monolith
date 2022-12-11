const express = require('express');
const { Magic } = require('@magic-sdk/admin');
const MongoClient = require('mongodb').MongoClient;
const randString = require('./functions/randString');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const m = new Magic(process.env.MAGIC_SECRET);

// Establish a global mongodb connection which can be used anywhere in the application
MongoClient.connect(process.env.DB_URI).then((client) => {
  global.DBO = client.db('entrydb');
});

// Middleware to allow CORS access
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  next();
});

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/stocks', (req, res) => {
  res.json({
    stocks: [
      { id: 1, symbol: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ', ethical: true, esg_score: 80 },
      { id: 2, symbol: 'TSLA', name: 'Tesla Inc', exchange: 'NASDAQ', ethical: true, esg_score: 89 },
      { id: 3, symbol: 'META', name: 'Meta Inc', exchange: 'NASDAQ', ethical: true, esg_score: 64 },
    ]
  })
});

app.get('/login', async (req, res) => {
  const { token } = req.query;
  const { email } = await m.users.getMetadataByToken(token);

  const user = await global.DBO.collection('stock_screener_users').findOne({ email });
  let access_token = randString(16);

  // create user if user does not exist.
  if (!user) {
    await global.DBO.collection('stock_screener_users').insertOne({
      email,
      pro: false,
      access_token,
    });

    console.log('created user:', email);
  } else {
    console.log('account already exists', email);
    access_token = user.access_token;
  }

  res.json({
    email,
    access_token,
  })
});

app.listen(PORT, () => {
  console.log('Listening on port:', PORT)
});
