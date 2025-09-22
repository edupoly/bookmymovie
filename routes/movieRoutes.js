const express = require('express');
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

const allowedRoles = 'movie owner';

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - duration
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated movie ID
 *         title:
 *           type: string
 *           example: Inception
 *         description:
 *           type: string
 *           example: A mind-bending thriller about dreams within dreams.
 *         duration:
 *           type: number
 *           example: 148
 *         language:
 *           type: array
 *           items:
 *             type: string
 *           example: ["English", "Hindi"]
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Sci-Fi", "Thriller"]
 *         releaseDate:
 *           type: string
 *           format: date
 *           example: 2010-07-16
 *         rating:
 *           type: number
 *           example: 8.8
 *         reviews:
 *           type: string
 *           example: Excellent movie with stunning visuals.
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
 *         crew:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Christopher Nolan", "Hans Zimmer"]
 *         censorCertificate:
 *           type: string
 *           example: PG-13
 *         posterUrl:
 *           type: string
 *           example: http://example.com/poster.jpg
 *         theaters:
 *           type: array
 *           items:
 *             type: string
 *           example: ["60a123bc4567de890f123abc"]
 */

/**
 * @swagger
 * /api/movies/createMovie:
 *   post:
 *     summary: Create a new movie (movie owner only)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       403:
 *         description: Forbidden - only movie owners allowed
 */
router.post('/createMovie', authenticate, authorizeRoles(...allowedRoles), createMovie);

/**
 * @swagger
 * /api/movies/updateMovie/{id}:
 *   put:
 *     summary: Update an existing movie (movie owner only)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 *       403:
 *         description: Forbidden - only movie owners allowed
 */
router.put('/updateMovie/:id', authenticate, authorizeRoles(...allowedRoles), updateMovie);

/**
 * @swagger
 * /api/movies/deleteMovie/{id}:
 *   delete:
 *     summary: Delete a movie (movie owner only)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       403:
 *         description: Forbidden - only movie owners allowed
 */
router.delete('/deleteMovie/:id', authenticate, authorizeRoles(...allowedRoles), deleteMovie);

/**
 * @swagger
 * /api/movies/getAllMovies:
 *   get:
 *     summary: Retrieve all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/getAllMovies', getAllMovies);

/**
 * @swagger
 * /api/movies/getMovieById/{id}:
 *   get:
 *     summary: Get a movie by its ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 */
router.get('/getMovieById/:id', getMovieById);

module.exports = router;
