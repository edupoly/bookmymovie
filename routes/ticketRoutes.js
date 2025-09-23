const express = require('express');
const { getAllTicketsById } = require('../controllers/ticketController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.get('/getTicketsById', authenticate,getAllTicketsById);

module.exports = router;
