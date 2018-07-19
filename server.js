const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// Partials
hbs.registerPartials(__dirname + '/views/partials');

// View
app.set('view engine', 'hbs');

// Middlewares
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


// Helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


// Request Handlers
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');

  // res.send({
  //   name: 'Vitthal',
  //   likes: [
  //     'watching movies',
  //     'listening songs'
  //   ]
  // });

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website!',
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorCode: 400,
    errorMessage: 'Bad Request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
