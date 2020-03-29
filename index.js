const axios = require('axios')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const cheerio = require('cheerio')

const URL_PARSE = 'https://www.science-community.org/ru/conferences'
const PORT = process.env.PORT || 3001

app.use(bodyParser.json())

app.use(express.static('build'))

app.post('/api/get-cards', async (req, res) => {
  const { data } = await axios.get(URL_PARSE + encodeURI(req.body.data.link))

  const $ = cheerio.load(data)

  const childrenDiv = $('.panel-col-first.panel-panel > div > div > div.pane-content > div > div.view-content').children().length

  const cards = []
  for (let i = 1; i <= childrenDiv; i++) {
    cards.push({
      title: $(`.panel-col-first.panel-panel > div > div > div > div > div.view-content > div:nth-child(${i}) > div.views-field.views-field-title > span > a`).text(),
      startDate: $(`.panel-col-first.panel-panel > div > div > div > div > div.view-content > div:nth-child(${i}) > div.views-field.views-field-field-conference-theses-deadlin > div > span`).text(),
      endDate: $(`.panel-col-first.panel-panel > div > div > div > div > div.view-content > div:nth-child(${i}) > div.views-field.views-field-field-conf-start > div > span`).text(),
      sity: $(`.panel-col-first.panel-panel > div > div > div > div > div.view-content > div:nth-child(${i}) > div.views-field.views-field-field-city > div`).text()
    })
  }

  res.json({
    cards
  })
})

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
