require('dotenv').config()
const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')

// set view engine to use ejs
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// body parser setup to get data from forms
app.use(express.urlencoded({
  extended: false
}));



app.get('/', (req, res) => {
  res.render('home')
})

// read all movies
app.get('/movies', (req, res) => {
  const searchQuery = req.query.q;
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s='${searchQuery}'`)
    .then(response => {
      res.render('results',{data:response.data})
    })
    .catch(err => {
      console.log(err)
    })
})



// show details about 1 movie
app.get('/movies/:id', (req, res) => {
  let id = req.params.id;

  axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}`)
    .then(response=>{
      console.log(response.data)
      res.render('show', {data: response.data})
    })
    .catch(err=>console.log(err))
})

// create a fave movie
app.post('/faves', (req, res) => {

})

// read all fave movies
app.get('/faves', (req, res) => {
  res.render('faves')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
