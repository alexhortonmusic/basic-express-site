'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const { cyan, red } = require('chalk')
const routes = require('./routes/') // assumes index file

const app = express() // same as new Express

// PORT=1337 node fileName.js = in the terminal
const port = process.env.PORT || 3000
app.set('port', port) // more formal

// for Pug config
// app.set('views', 'views') // this is assumed
app.set('view engine', 'pug')

if (process.env.NODE_ENV !== 'production') {
  app.locals.pretty = true
}

app.locals.company = 'Sick Pizza Shop'

// middlewares
app.use((req, res, next) => {
  console.log(`[${new Date()}] "${cyan(`${req.method} ${req.url}`)}" "${req.agent}"`)
  next()
})


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.use(routes)

// error-handling middleware
app.use((req, res) => { // custom 404 page
  res.render('404')
})

app.use((err, req, res, next) => {
  res.sendStatus(err.status || 500)
  // res.send('Internal Server Error')
  console.error(`[${new Date()}] "${red(`${req.method} ${req.url}`)}" Error(${res.statusCode}): "${res.statusMessage}"`)
})


// Listens for Port changes/logs message when it triggers
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
