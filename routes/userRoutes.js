const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  deleteUser
} = require('../controllers/userController');

// Routes
router.post('/signup', register);
router.post('/login', login);
router.get('/profile/:token',getProfile)
router.delete('/deleteuser/:id', deleteUser);

module.exports = router;
