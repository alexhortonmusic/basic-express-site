'use strict';

const express = require('express')
const bodyParser = require('body-parser')

const app = express() // same as new Express

// PORT=1337 node fileName.js = in the terminal
const port = process.env.PORT || 3000
app.set('port', port) // more formal

// middlewares
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

// for setting up Pug
// app.set('views', 'views') // this is assumed
app.set('view engine', 'pug')

if (process.env.NODE_ENV !== 'production') {
  app.locals.pretty = true
}

app.locals.company = 'Sick Pizza Shop'

// routes
app.get('/', (req,res) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about', {page: 'About'})
})

app.get('/contact', (req, res) => {
  res.render('contact', {page: 'Contact'})
})

app.post('/contact', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})


// Listens for Port changes/logs message when it triggers
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
