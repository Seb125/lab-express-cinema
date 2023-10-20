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


const createMovie = async (req, res) => {
    const movie =  req.body;

    

    Movie.create(movie);

    res.redirect('/');
}





router.get("/", (req, res) => {

    getAllMovies(req, res);

})


router.get("/create", (req, res) => {

    res.render("create-movie")

})

router.post("/create", (req, res) => {

    createMovie(req, res);

})

router.get("/:id", (req, res) => {
  
    getMovieDetails(req, res);
})



router.get("/:id/update", (req, res) => {

    const updateMovie = async (req, res) => {
        try {
            const movieId = req.params.id;
            
            const details = await Movie.findById(movieId);
            
            res.render('update-movie', {details: details})
        } catch(err) {
            console.log(err)
        }
    }



    updateMovie(req, res);
})


router.post("/:id/update", (req, res) => {
    const updateMovie = async (req, res) => {
        try {
            const movieId = req.params.id;
            console.log(movieId)
            const newData = req.body;

            const formattedData = {
                title: newData.title,
                director: newData.director,
                stars: newData.stars.split(','),
                image: newData.image,
                description: newData.description,
                showtimes: newData.showtimes.split(',')
            }
            console.log(formattedData)
            const updatedMovie = await Movie.findByIdAndUpdate(movieId, formattedData);
            
            res.redirect('/movies')
        } catch(err) {
            console.log(err)
        }
    }



    updateMovie(req, res);
})

router.get("/:id/delete", (req, res) => {
    const deleteMovie = async (req, res) => {
        
        try {
            const movieId = req.params.id;

            const deletedMovie = await Movie.findByIdAndDelete(movieId);

            res.redirect('/movies');
        } catch(err) {
            console.log(err)
        }

    }

    deleteMovie(req, res);
})


module.exports = router; 