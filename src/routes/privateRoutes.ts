import express from 'express';
import DoctorController from '../controllers/DoctorController';
import { authorize } from '../middleware/authorize';
import { authenticateJWT } from '../middleware/auth';
import AppointmentController from '../controllers/AppointmentController';

const router = express.Router();


 /**
     * @swagger
     * /api/doctors:
     *   post:
     *     summary: Create a new doctor
     *     tags: [Doctors]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       201:
     *         description: Doctor created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: 'src/entity/Doctor'
     *       400:
     *         description: Bad request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
 router.post('/doctors', authenticateJWT, authorize(['Admin']), (req, res) => DoctorController.createDoctor(req, res));

 
/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor successfully deleted
 *       404:
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Doctor not found
 */
router.delete('/doctors/:id', authenticateJWT, authorize(['Admin']), (req, res) => DoctorController.deleteDoctor(req, res));

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Retrieve a list of doctors
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'src/entity/Doctor'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get('/doctors', authenticateJWT, authorize(['Admin','User']), (req, res) => DoctorController.getAllDoctors(req, res));

/**
 * @swagger
 * /api/appointment:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               patient:
*                 type: number
*               doctor:
*                 type: number
*               date:
*                 type: string
*               time:
*                 type: string
*               appointmentType:
*                 type: string
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'src/entity/Appointment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.post('/appointment', authenticateJWT, authorize(['Admin','User']), (req, res) => AppointmentController.createAppointment(req, res));

/**
 * @swagger
 * /api/appointment:
 *   get:
 *     summary: Retrieve a list of doctors
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'src/entity/Appointments'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.get('/appointment', authenticateJWT, authorize(['Admin','User']), (req, res) => AppointmentController.getAppointment(req, res));

/**
 * @swagger
 * /api/appointment/{id}:
 *   get:
 *     summary: Retrieve an appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: An appointment object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'src/entity/Appointment'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */
router.get('/appointment/:id', authenticateJWT, authorize(['Admin','User']), (req, res) => AppointmentController.getAppointmentById(req, res));

/**
 * @swagger
 * /api/appointment/{id}:
 *   put:
 *     summary: Update an appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The appointment ID
 *       - in: body
 *         name: appointmentData
 *         required: true
 *         description: The data to update the appointment with
 *         schema:
 *           type: object
 *           properties:
 *             patient:
 *               type: integer
 *             doctor:
 *               type: integer
 *             date:
 *               type: string
 *               format: date
 *             time:
 *               type: string
 *               format: time
 *             appointmentType:
 *               type: string
 *     responses:
 *       200:
 *         description: The updated appointment object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'src/entity/Appointment'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */
router.put('/appointment/:id', authenticateJWT, authorize(['Admin', 'User']), (req, res) => AppointmentController.updateAppointment(req, res));

/**
     * @swagger
     * /api/appointment/{id}:
     *   delete:
     *     summary: Delete an appointment by ID
     *     tags: [Appointments]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: The appointment ID
     *     responses:
     *       200:
     *         description: Appointment deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     *               example: Appointment deleted
     *       401:
     *         description: Unauthorized
     *       403:
     *         description: Forbidden
     *       404:
     *         description: Appointment not found
     *       500:
     *         description: Internal server error
     */
router.delete('/appointment/:id', authenticateJWT, authorize(['Admin', 'User']), (req, res) => AppointmentController.deleteAppointment(req, res));
export default router;