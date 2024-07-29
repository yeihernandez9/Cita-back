import express from 'express';
import { exampleController } from '../controllers/exampleController';

const router = express.Router();
/**
 * @swagger
 * /example:
 *   get:
 *     summary: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/example', exampleController);

export default router;