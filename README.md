# Impact of better control of the English language in the Netherlands on translations of English books into Dutch

**Since 1986, a great deal of attention has been given to the English language in our country. English was then obligated in group 7 and 8 of primary school. In the Dutch media we also encountered the English language more and more, especially on television and radio. A recent study by language education agency EF Education shows that Dutch people have better control of the English language than other countries that do not use English as their mother tongue. In general, Dutch people have become good at English and many English speaking people moved to The Netherlands. So what is the impact of translations of English books into Dutch?**

## Main question
What is the impact of better control of the English language on translations of English books into Dutch?

### Hypothesis
Better control of the English language ensures that fewer books are translated from English into Dutch

### Required variables
* Original language
* Languages
* Publication year
* Target audience
* Format

## Research
To link data to the required variables, we use data from the Amsterdam Public Library (Openbare Bibliotheek Amsterdam, OBA)

### Retrieve data from the OBA API
[Rijk van Zanten] (https://github.com/rijkvanzanten) has written a [tool] (https://github.com/rijkvanzanten/node-oba-api) to extract and convert data from the OBA API to JSON. I have modified the tool so that the results of a search term are prettified and written to a .json file. I then retrieved all the keys and based the available data on it.

#### Available data

* Title
* Short title
* Subtitle
* Main author
* Author
* Format
* Publisher
* Description
* Language
* Original language
* Genre
* Characteristics
* Cover
* ISBN
* SISO
* Publication year
* Topic
* Edition
* Series
* Target audience

### Searching through data
Folkert and Dennis adapted Rijk's tool to make the tool more passable. That's why I first made the switch to the tool that they adapted. However, I didn't gain much from it. Gijs convinced me to write it myself, because than I would know how it worked, understand the code, and change it to however I would want it to work.

But damn, I got sick, and missed two days. Now it's the next week and I still don't have the data that I want, and we were supposed to be working in D3 already! That is when Gijs and me decided to work on the project together, since we were both behind, a lot. What's first? I know the data that I want, so we decide to work on retrieving the data first.

1. First, I want to change my search query to something specific. I only want to retrieve BOOKS, not magazines or whatever. So I look through the [Aquabrowser API Documentation](https://zoeken.oba.nl/api/v1/) and find out that I can do that by changing the facet to *Type(book)*, and put refine on true.
```javascript
const search = {
  endpoint: 'search',
  query: {
    q: 'Potter',
    facet: 'Type(book)',
    refine: true,
    pagesize: 20
  }
}
```

2. Alright, we got some data. Now we have to filter out all the data that we don't need. So we map through the (retrieved) data and format it to data that we can then easily access.

```javascript
let result = response.data.map(book => {
  return {
    format: book.formats[0].format[0]['_'],
    publication_year: book.publication && book.publication[0].year && book.publication[0].year[0]['_'] ? book.publication[0].year[0]['_'] : null,
    language: book.languages ? book.languages[0].language[0]['_'] : null,
    ['original-language']: book.languages && book.languages[0] && book.languages[0]['original-language'] ? book.languages[0]['original-language'][0]['_'] : null
  }
})
```

3. The last thing we have to do is filter the retrieved books. We only want books which are translated from English to Dutch. I created a variable called translatedBooks, mapped through all the results, and then pushed all the books to the variable translatedBooks which have language as Dutch and English as original language.

```javascript
let translatedBooks = [];

result.map(book => {
  if (book.language === 'dut' && book['original-language'] === 'eng') {
    translatedBooks.push(book)
  }
})
```

4. We now have the results that we want in the variable translatedBooks. The last thing we have to do is create a JSON file where the results will be written to.

```javascript
fs.writeFile ("results.json", JSON.stringify(translatedBooks), function(err) {
  if (err) throw err
})
```

#### Visualize data
