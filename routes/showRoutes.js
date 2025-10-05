const express = require('express');
const { createShow, getAllShows, getShowsByMovie, getShowsByTheater, deleteShow, bookTicket } = require('../controllers/showController');
const { authorizeRoles, authenticate } = require('../middleware/auth');
const router = express.Router();

const allowedRoles = 'theater owner';

/**
 * @swagger
 * tags:
 *   name: Shows
 *   description: Show management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Show:
 *       type: object
 *       required:
 *         - movieId
 *         - theaterId
 *         - screen
 *         - showDate
 *         - showTime
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the show
 *         movieId:
 *           type: string
 *           example: 60a123bc4567de890f123abc
 *         theaterId:
 *           type: string
 *           example: 60b123bc4567de890f123def
 *         screen:
 *           type: number
 *           example: 3
 *         showDate:
 *           type: string
 *           format: date
 *           example: 2025-09-23
 *         showTime:
 *           type: string
 *           example: "19:30"
 *         price:
 *           type: number
 *           example: 250
 *         totalSeats:
 *           type: number
 *           example: 100
 *         bookedSeats:
 *           type: array
 *           items:
 *             type: number
 *           example: [1, 5, 10]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/shows/createShow:
 *   post:
 *     summary: Create a new show (theater owner only)
 *     description: |
 *       Requires a valid **JWT Bearer Token** in the `Authorization` header.

 *       Example header:
 *       ```
 *       Authorization: Bearer <your_token>
 *       ```
 *     tags: [Shows]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Show'
 *     responses:
 *       201:
 *         description: Show created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Show'
 *       403:
 *         description: Forbidden - only theater owners allowed
 */
router.post('/createShow', authenticate, authorizeRoles(allowedRoles), createShow);

/**
 * @swagger
 * /api/shows/getAllShows:
 *   get:
 *     summary: Retrieve all shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: List of all shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
 */
router.get('/getAllShows', getAllShows);

/**
 * @swagger
 * /api/shows/getShowsByMovie/movie/{movieId}:
 *   get:
 *     summary: Get shows by movie ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: List of shows for the movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
 */
router.get('/getShowsByMovie/movie/:movieId', getShowsByMovie);

/**
 * @swagger
 * /api/shows/getShowsByTheater/theater/{theaterId}:
 *   get:
 *     summary: Get shows by theater ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: theaterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     responses:
 *       200:
 *         description: List of shows for the theater
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
 */
router.get('/getShowsByTheater/theater/:theaterId', getShowsByTheater);

/**
 * @swagger
 * /api/shows/deleteShow/{id}:
 *   delete:
 *     summary: Delete a show by ID (theater owner only)
 *      description: |
 *       Requires a valid **JWT Bearer Token** in the `Authorization` header.

 *       Example header:
 *       ```
 *       Authorization: Bearer <your_token>
 *       ```
 *     tags: [Shows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Show deleted successfully
 *       404:
 *         description: Show not found
 *       403:
 *         description: Forbidden - only theater owners allowed
 */
router.delete('/deleteShow/:id', authenticate, authorizeRoles(allowedRoles), deleteShow);
router.post('/bookingTicketByShowId/:id', authenticate, bookTicket)



module.exports = router;
