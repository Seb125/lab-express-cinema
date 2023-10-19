const express = require('express');
const router = express.Router();





const Movie = require('../models/Movie.models.js');


const getAllMovies = async (req, res) => {

    const myMovies = await Movie.find();
    console.log(myMovies[0]._id.toString())
    res.render('movies', {movies: myMovies})

}

const getMovieDetails = async (req, res) => {
    const movieId =  req.params.id;

    //res.send(movieId)

    const details = await Movie.findById(movieId);

    res.render('movie-detail', {details: details});
}



router.get("/", (req, res) => {

    getAllMovies(req, res);

})


router.get("/:id", (req, res) => {
  
    getMovieDetails(req, res);
})


module.exports = router; 