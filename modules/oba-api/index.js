const axios = require("axios");
const env = require("dotenv").config();
const queryString = require("query-string");
const convert = require("xml-to-json-promise").xmlDataToJSON;
const jp = require("jsonpath");

module.exports = class OBA {
  constructor(options) {
    this.publicKey = options.public
  }

  getAll(endpoint, query) {
    const url = `https://zoeken.oba.nl/api/v1/${endpoint}/?authorization=${this.publicKey}&${queryString.stringify(query)}`

    return this.getPageNumber(url)
    .then(requests => {
      return axios.all(requests)
        .then(axios.spread((...responses) => {
          const json = responses.map((res) => convert(res.data))
          return Promise.all(json)
        }))
        .then(res => res.map(obj => obj.aquabrowser.results[0].result))
        .then(res => {
          return {
            data: [].concat(...res),
            url: url
          }
        })
    })
  }

  maxResults(url) {
    return axios.get(url)
      .then(res => convert(res.data))
      .then(res => (Math.ceil(res.aquabrowser.meta[0].count[0] / 20) + 1))
  }

  getPageNumber(url) {
    return this.maxResults(url).then(amount => {
      const pages = []
      amount > 20 ? amount = 20 : false
      for (let i = 1; i < amount; i++) {
        pages.push(axios.get(`${url}&page=${i}`))
      }
      return pages
    })
  }

}
