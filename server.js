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

// Setting the routes
app.get('/example', (request, response) => {
  response.send('This is an response send example')
})
app.get('/search/:example/:num', (request, response) => {
  const data = request.params
  const num = data.num
  let reply = ''
  for (let i = 1; i <= num; i++) {
    reply += `${i}. This is an response send example with '${data.example}' as custom data`
  }
  response.send(reply)
})
