# basic-node-api
Basic Node API for text analysis

# Set up
1. Clone the repo
1. Run `npm i`
1. Run `npm run start`
1. Go to `http://localhost:3000`

# Scripts
* start - Starts node server
* dev - Stars nodemon for dev

# Routes
* `/add/:word/:score` for adding new values
* `/search/:word` for searching entries
* `/all` for listing all entries

# JSON dbish
For learning purpose, a simple pair key-value database is set in JSON.
For adding new entries, go to localhost:3000/add/:word/:score with
the value you want to add
