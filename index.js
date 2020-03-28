const axios = require('axios')
const express = require('express');
const Controller = require('./controller')
const app = express();

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/api/get-cards', Controller.getCards)

app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});
