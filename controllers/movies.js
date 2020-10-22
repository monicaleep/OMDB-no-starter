require('dotenv').config()
const express = require('express');
const router = express.Router()
const axios = require('axios')

// read all movies
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  let id = req.params.id;
  axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}`)
    .then(response=>{
      console.log(response.data)
      res.render('show', {data: response.data})
    })
    .catch(err=>console.log(err))
})

module.exports = router
