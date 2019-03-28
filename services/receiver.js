const express = require('express');
const app = express();
const mocks = require('../test/mocks');

app.get('/:id', (_, res) => res.send(mocks.user));
let state = 1;

app.post('/me/messages', express.json(), (req, res) => {
  app.emit(`message${state}`, req.body);
  state++;
  res.send({res: 'response'});
});

module.exports = app;
