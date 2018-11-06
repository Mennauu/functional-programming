const OBA = require('./modules/oba-api')
const express = require('express')
const app = express()
const fs = require('fs')
const chalk = require('chalk')

const client = new OBA({
    public: process.env.PUBLIC_KEY,
    secret: process.env.SECRET_KEY,
})

const search = {
    endpoint: 'search',
    query: {
        q: 'Menno',
        facet: 'Type(book)',
        refine: true,
        pagesize: 20
    }
}

client.getAll(search.endpoint, search.query)
  .then(response => {

  let result = response.data.map(book => {
    return {
        title: book.titles[0].title[0]['_'].split('/').slice(0,1).join().trim(),
        format: book.formats[0].format[0]['_'],
        publication_year: book.publication && book.publication[0].year && book.publication[0].year[0]['_'] ? book.publication[0].year[0]['_'] : null,
        language: book.languages ? book.languages[0].language[0]['_'] : null,
        ['original-language']: book.languages && book.languages[0] && book.languages[0]['original-language'] ? book.languages[0]['original-language'][0]['_'] : null
    }
  })

  let translatedBooks = [];

  result.map(book => {
    if (book.language === 'dut' && book['original-language'] === 'eng') {
      translatedBooks.push(book)
    }
  })

  app.get('/', (req, res) => res.json(translatedBooks)).listen(3000)
})
.catch(err => {
    if (err.err) {
        console.log(chalk.red(err.err))
    } else {
        console.log(chalk.red('Something went wrong in index.js: ' + err))
    }

})
