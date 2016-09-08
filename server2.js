'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const { cyan, red } = require('chalk')

const app = express() // same as new Express

// PORT=1337 node fileName.js = in the terminal
const port = process.env.PORT || 3000
app.set('port', port) // more formal

// middlewares
app.use((req, res, next) => {
  // let date = req.headers['if-modified-since']
  // let get = req.method
  // let userAgent = req.headers['user-agent']
  //
  // let str = req.headers.referer
  // console.log(typeof str)
  // let arr = str.split('')
  // let newArr = []
  // for (let i = 21; i < arr.length; i++) {
  //   newArr.push(arr[i])
  // }
  // let newStr = newArr.join('')
  //
  // let finalStr = `[${date}] "${get} ${newStr}" ${userAgent}`
  //
  // console.log(finalStr + '\n')

  console.log(`[${new Date()}] "${cyan(`${req.method} ${req.url}`)}" "${req.agent}"`)
  next()
})

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

// error-handling middleware
app.use((req, res, next) => {
  console.error('404')
  const err = Error('Not Found')
  err.status = 404
  next(err)
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
