require('dotenv').config()
const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
//const methodOverride = require('method-override');

// set view engine to use ejs
app.set('view engine', 'ejs');
app.use(ejsLayouts);
// body parser setup to get data from forms
app.use(express.urlencoded({
  extended: false
}));

app.get('/',(req,res)=>{
  res.render('home')
})

// read all movies
app.get('/movies',(req,res)=>{
  const searchQuery = req.query.q;
  res.render('results')
})

// show details about 1 movie
app.get('/movies/:id',(req,res)=>{
  let idx = req.params.id;
  res.render('show')
})

// create a fave movie
app.post('/faves',(req,res)=>{

})

// read all fave movies
app.get('/faves',(req,res)=>{
  res.render('faves')
})

app.listen(process.env.PORT || 3000,()=>{
  console.log(`listening on port ${process.env.PORT}`)
})
