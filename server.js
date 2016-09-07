'use strict';

// these two lines are how the express community requires it i.e. 'app'
const express = require('express')
// const hbs = require('express-handlebars')
// don't have to require 'ejs'


const app = express()

// allows express to read handlebars templates
// HANDLEBARS
// app.engine('handlebars', hbs())
// app.set('view engine', 'handlebars')
// app.set('views', 'templates')

// app.engine('handlebars', hbs()) // don't need this line for EJS
// EJS
// app.set('views', 'templates')
// app.set('view engine', 'ejs')

// PUG (used to be Jade)
app.set('views', 'templates')
app.set('view engine', 'pug')

// this serves static files from the 'public' folder
// this should always be at the top of the routing
// think: middleware function
app.use(express.static('public'))

// app.get behaves like a transform stream

app.get('/', (req, res) => { // renders a file that uses a template
  res.render('page', {title: 'Home'})
})
app.get('/about', (req, res) => {
  res.render('page', {title: 'About'})
})
app.get('/contact', (req, res) => {
  res.render('page', {title: 'Contact'})
})
app.post('/contact', (req, res) => {
  res.send('Thanks for contacting us!')
})

app.get('*', (req, res) => {
  res.send('404: Not found')
})

app.listen(3000)

// var express = require('express');
// var app = express();
//
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

// app.on('request', (req, res) => {
//   if(req.url === '/') {
//     res.end('This is the home page')
//   } else if (req.url === '/about') {
//     res.end('This is the about page')
//   } else if (req.url === '/contact') {
//     res.end('This is the contact page')
//   } else {
//     res.end('404: Not found')
//   }
// })
