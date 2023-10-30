const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const appointmentController = require("../controllers/appointmentController")

router.post("/register", userController.register)

router.post("/login", userController.login)

// Define routes for appointment-related operations
router.post('/appointments', appointmentController.createAppointment);
router.get('/appointments', appointmentController.getAppointments);
router.get('/appointments/:id', appointmentController.getAppointment);
router.put('/appointments/:id', appointmentController.updateAppointment);
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports= router;

