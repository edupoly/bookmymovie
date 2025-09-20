const express = require('express');
const { createTheater, getAllTheaters } = require('../controllers/theaterController');
const router = express.Router();

router.post('/createTheater', createTheater);
router.get('/getAllTheaters', getAllTheaters);

module.exports = router;
