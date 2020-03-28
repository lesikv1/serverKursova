const axios = require('axios')
const cheerio = require('cheerio')

const URL_PARSE = 'https://www.science-community.org/ru/conferences'

class Controller {
  static async getCards (req, res) {
    const { data } = await axios.get(URL_PARSE)
    const $ = cheerio.load(data)

    const childrenDiv = $('#main > div > div.center-wrapper > div.panel-col-first.panel-panel > div > div > div > div > div.view-content').children().length

    const cards = []
    for (let i = 1; i <= childrenDiv; i++) {
      cards.push({
        title: $(`#main > div > div.center-wrapper > div.panel-col-first.panel-panel > div > div > div > div > div.view-content > div:nth-child(${i}) > div.views-field.views-field-title > span > a`).text(),
        startDate: $(`#main > div > div.center-wrapper > div.panel-col-first.panel-panel > div > div > div > div > div.view-content > div:nth-child(${i}) > div.views-field.views-field-field-conference-theses-deadlin > div > span`).text(),
        endDate: $(`#main > div > div.center-wrapper > div.panel-col-first.panel-panel > div > div > div > div > div.view-content > div:nth-child(${i}) > div.views-field.views-field-field-conf-start > div > span`).text(),
        sity: $(`#main > div > div.center-wrapper > div.panel-col-first.panel-panel > div > div > div > div > div.view-content > div:nth-child(${i}) > div.views-field.views-field-field-city > div`).text()
      })
    }

    res.json({
      cards
    })
  }
}

module.exports = Controller
