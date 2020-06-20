console.log('================================')
console.log('Basic Node API')
console.log('Server is running.')
console.log('================================')

const ADDITIONAL_PATH = 'json/additional.json'
const AFINN_PATH = 'json/afinn111.json'

// REQUIRES
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const fs = require('fs')

// LOADING JSON
const data = fs.readFileSync(ADDITIONAL_PATH)
const afinnData = fs.readFileSync(AFINN_PATH)
const additional = JSON.parse(data)
const afinn = JSON.parse(afinnData)

// CONNECTION
const app = express()
const server = app.listen(3000, () => {
  console.log('Connect to http://localhost:3000')
  console.log('Press Ctrl+C to exit')
  console.log('================================')
})

// APP DEFAULT STATIC
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Adding cors for hosting
app.use(cors())

// ROUTES
app.post('/analyze', (request, response) => {
  const text = request.body.text
  const words = text.split(/\W+/) // Any but not aZ09
  const wordList = []
  let found = false
  let score = 0
  let totalScore = 0

  for (const w of words) {
    if (additional.hasOwnProperty(w)) {
      score = Number(additional[w])
      found = true
    } else if (afinn.hasOwnProperty(w)) {
      score = Number(afinn[w])
      found = true
    }

    if (found) {
      wordList.push({ word: w, score: score })
      totalScore += score
    }
  }

  const comparative = totalScore / words.length
  const reply = {
    comparative: comparative,
    msg: 'Thank you!',
    score: totalScore,
    words: wordList
  }
  response.send(reply)
})

app.get('/example', (request, response) => {
  response.send('This is an response send example')
})

app.get('/add/:word/:score?', (request, response) => {
  const word = request.params.word
  const score = Number(request.params.score)
  let reply = {}

  if (!score && score !== 0) {
    reply = {
      word: word,
      score: score,
      status: 'invalid',
      success: false,
      failed: true,
      msg: `'${word}': Score is required, please add it to the URL to add the pair`
    }
    response.send(reply)
  } else {
    additional[word] = (!additional[word]) ? score : (additional[word] + score) / 2

    const dataString = JSON.stringify(additional, null, 2)
    fs.writeFile(ADDITIONAL_PATH, dataString, () => {
      reply = {
        word: word,
        score: score,
        status: 'success',
        success: true,
        failed: false,
        msg: `Word: '${word}' was added successfully`
      }
      response.send(reply)
    })
  }
})

app.get('/all', (request, response) => {
  response.send({ additional: additional, afinn: afinn })
})

app.get('/search/:word', (request, response) => {
  const word = request.params.word
  let reply = {}

  if (additional[word]) {
    reply = {
      status: 'found',
      word: word,
      score: additional[word]
    }
  } else {
    reply = {
      status: 'not found',
      word: word
    }
  }

  response.send(reply)
})
