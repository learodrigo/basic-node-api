console.log('================================')
console.log('Basic Node API')
console.log('Server is running.')
console.log('================================')

// REQUIRES
const express = require('express')
const fs = require('fs')

// LOADING JSON
const data = fs.readFileSync('./words.json')
const words = JSON.parse(data)

// CONNECTION
const app = express()
const server = app.listen(3000, () => {
  console.log('Connect to http://localhost:3000')
  console.log('Press Ctrl+C to exit')
  console.log('================================')
})

// APP DEFAULT STATIC
app.use(express.static('public'))

// ROUTES
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
    words[word] = (!words[word]) ? score : (words[word] + score) / 2

    const dataString = JSON.stringify(words, null, 2)
    fs.writeFile('./words.json', dataString, () => {
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
  response.send(words)
})

app.get('/search/:word', (request, response) => {
  const word = request.params.word
  let reply = {}

  if (words[word]) {
    reply = {
      status: 'found',
      word: word,
      score: words[word]
    }
  } else {
    reply = {
      status: 'not found',
      word: word
    }
  }

  response.send(reply)
})
