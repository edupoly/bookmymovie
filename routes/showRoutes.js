const express = require('express');
const { createShow, getAllShows, getShowsByMovie, getShowsByTheater, deleteShow } = require('../controllers/showController');
const router = express.Router();

router.post('/createShow', createShow);
router.get('/getAllShows', getAllShows);
router.get('/getShowsByMovie/movie/:movieId', getShowsByMovie);
router.get('/getShowsByTheater/theater/:theaterId', getShowsByTheater);
router.delete('/deleteShow/:id', deleteShow);

module.exports = router;
