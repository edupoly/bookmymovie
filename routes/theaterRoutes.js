const express = require('express');
const {
  createTheater,
  getAllTheaters,
  getTheaterById,
  updateTheater,
  deleteTheater
} = require('../controllers/theaterController');
const { authenticate, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

const allowedRoles = 'theater owner';

/**
 * @swagger
 * tags:
 *   name: Theaters
 *   description: Theater management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Theater:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - city
 *         - screens
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the theater
 *         name:
 *           type: string
 *           example: PVR Cinemas
 *         address:
 *           type: string
 *           example: 123 Main St, Downtown
 *         city:
 *           type: string
 *           example: New York
 *         state:
 *           type: string
 *           example: NY
 *         zip_code:
 *           type: string
 *           example: 10001
 *         latitude:
 *           type: number
 *           example: 40.7128
 *         longitude:
 *           type: number
 *           example: -74.0060
 *         contact_info:
 *           type: string
 *           example: +1-234-567-8900
 *         screens:
 *           type: number
 *           minimum: 1
 *           example: 5
 *         facilities:
 *           type: array
 *           items:
 *             type: string
 *           example: ["3D", "Dolby Atmos", "Wheelchair Accessible"]
 *         logo:
 *           type: string
 *           example: https://image.png
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-22T12:00:00Z
 */

/**
 * @swagger
 * /api/theaters/createTheater:
 *   post:
 *     summary: Create a new theater (theater owner only)
 *     description: |
 *       Requires a valid **JWT Bearer Token** in the `Authorization` header.

 *       Example header:
 *       ```
 *       Authorization: Bearer <your_token>
 *       ```
 *     tags: [Theaters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Theater'
 *     responses:
 *       201:
 *         description: Theater created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theater'
 *       403:
 *         description: Forbidden – Only theater owners can perform this action
 */
router.post('/createTheater', authenticate, authorizeRoles(allowedRoles), createTheater);

/**
 * @swagger
 * /api/theaters/updateTheater/{id}:
 *   put:
 *     summary: Update a theater (theater owner only)
 *     description: |
 *       Requires a valid **JWT Bearer Token** in the `Authorization` header.

 *       Example header:
 *       ```
 *       Authorization: Bearer <your_token>
 *       ```
 *     tags: [Theaters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Theater'
 *     responses:
 *       200:
 *         description: Theater updated successfully
 *       404:
 *         description: Theater not found
 *       403:
 *         description: Forbidden – Only theater owners can perform this action
 */
router.put('/updateTheater/:id', authenticate, authorizeRoles(allowedRoles), updateTheater);

/**
 * @swagger
 * /api/theaters/deleteTheater/{id}:
 *   delete:
 *     summary: Delete a theater (theater owner only)
 *     description: |
 *       Requires a valid **JWT Bearer Token** in the `Authorization` header.

 *       Example header:
 *       ```
 *       Authorization: Bearer <your_token>
 *       ```
 *     tags: [Theaters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     responses:
 *       200:
 *         description: Theater deleted successfully
 *       404:
 *         description: Theater not found
 *       403:
 *         description: Forbidden – Only theater owners can perform this action
 */
router.delete('/deleteTheater/:id', authenticate, authorizeRoles(allowedRoles), deleteTheater);

/**
 * @swagger
 * /api/theaters/getAllTheaters:
 *   get:
 *     summary: Get a list of all theaters
 *     tags: [Theaters]
 *     responses:
 *       200:
 *         description: List of theaters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Theater'
 */
router.get('/getAllTheaters', getAllTheaters);

/**
 * @swagger
 * /api/theaters/getTheaterById:
 *   get:
 *     summary: Get a single theater by ID (using query param `id`)
 *     tags: [Theaters]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Theater ID
 *     responses:
 *       200:
 *         description: Theater details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theater'
 *       404:
 *         description: Theater not found
 */
router.get('/getTheaterById', getTheaterById);

module.exports = router;
