const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  deleteUser
} = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and profile management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - number
 *         - email
 *         - password
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID by MongoDB
 *         username:
 *           type: string
 *           example: John Doe
 *         number:
 *           type: number
 *           example: 9876543210
 *         email:
 *           type: string
 *           example: john@example.com
 *         password:
 *           type: string
 *           example: MySecurePassword123
 *         role:
 *           type: string
 *           enum: [admin, customer, theater owner, movie owner]
 *           example: customer
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-21T12:00:00Z
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input or user already exists
 */
router.post('/signup', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: JohnDoe
 *               password:
 *                 type: string
 *                 example: MySecurePassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid username or password
 */
router.post('/login', login);

/**
 * @swagger
 * /api/users/profile/{token}:
 *   get:
 *     summary: Get user profile using token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT or session token
 *     responses:
 *       200:
 *         description: User profile retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized or invalid token
 */
router.get('/profile/:token', getProfile);

/**
 * @swagger
 * /api/users/deleteuser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/deleteuser/:id', deleteUser);

module.exports = router;
