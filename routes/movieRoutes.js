const express = require('express');
const { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } = require('../controllers/movieController');
const router = express.Router();

router.post('/createMovie', createMovie);
router.get('/getAllMovies', getAllMovies);
router.get('/getMovieById/:id', getMovieById);
router.put('/updateMovie/:id', updateMovie);
router.delete('/deleteMovie/:id', deleteMovie);

module.exports = router;
