console.log('------------------');
console.log('Basic Node API');
console.log('Server is running.');
console.log('------------------');

const express = require('express');
const app = express();
const server = app.listen(3000, () => {
  console.log('Listening...');
  console.log('------------------');
  console.log('Connect to http://localhost:3000');
  console.log('Press Ctrl+C to exit');
});

app.use(express.static('public'));
