const words = {
  "rainbow": 5,
  "unicorn": 3,
  "doom": -3,
  "gloom": -2
}

console.log('------------------')
console.log('Basic Node API')
console.log('Server is running.')
console.log('------------------')

const express = require('express')
const app = express()
const server = app.listen(3000, () => {
  console.log('Listening...')
  console.log('------------------')
  console.log('Connect to http://localhost:3000')
  console.log('Press Ctrl+C to exit')
})

// Uses static public/ content
app.use(express.static('public'))

/* ----------- */
/*   ROUTES    */
/* ----------- */
// Example route
app.get('/example', (request, response) => {
  response.send('This is an response send example')
})

// Adding a new score
app.get('/add/:word/:score?', (request, response) => {
  const word = request.params.word
  const score = Number(request.params.score)
  let reply

  if (!score) {
    reply = {
      msg: 'Score is required, please add it to the URL to add the pair'
    }
  } else {
    if (!words[word]) {
      words[word] = score
    } else {
      words[word] = (words[word] + score) / 2
    }
    reply = {
      msg: 'Word was successfully sumbitted! Thanks for you!'
    }
  }

  response.send(reply)
})

// Listing all entries
app.get('/all', (request, response) => {
  response.send(words)
})

// Search
app.get('/search/:word', (request, response) => {
  const word = request.params.word
  let reply

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
