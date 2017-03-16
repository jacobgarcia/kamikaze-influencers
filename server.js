const express = require('express') //minimalist framwork for requests, responses, etc.
const bodyParser = require('body-parser') //access information passed in url or body
const helmet = require('helmet') //Helmet helps you secure your Express apps by setting various HTTP headers.
const app = express() //initialize server

// const API = require(__dirname + "/routers/api.js") //assign api files to variable
// const config = require(__dirname + "/config/config.js") //require config data

var port = process.env.PORT || 8080 //use port passed or 8080

app.use(helmet()) //Basic protection
app.use('/static', express.static( __dirname + '/static'))
app.use('/dist', express.static( __dirname + '/dist'))
app.use(bodyParser.json()) //Get elements from body (JSON)
app.use(bodyParser.urlencoded({ extended: true })) //Get elements from URL

// app.use('/api', API) //Add api routes

//Send index file for every route
app.use('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html')
})

// Start listening for server
app.listen(port, () => {
  console.log('App listening on port ' + port + '!');
})
