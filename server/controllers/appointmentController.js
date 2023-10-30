const Appointment = require("../models/appointmentSchema");

const appointmentController = {};

appointmentController.createAppointment = async (req, res) => {
  const {
    name, email, contact, specialty, date, time, reason
  } = req.body;

  if (!name || !email || !contact || !specialty || !date || !time || !reason) {
    return res.status(400).json("All fields are required");
  }

  try {
    const newAppointment = new Appointment({
      name,
      email,
      contact,
      specialty,
      date,
      time,
      reason
    });

    await newAppointment.save();

    return res.status(200).json("Appointment created successfully");
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

appointmentController.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

appointmentController.getAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json("Appointment not found");
    }
    return res.status(200).json(appointment);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

appointmentController.updateAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      req.body, // You can use req.body directly
      { new: true }
    );
    return res.status(200).json("Appointment updated successfully");
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

appointmentController.deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    await Appointment.findByIdAndRemove(appointmentId);
    return res.status(200).json("Appointment deleted successfully");
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

module.exports = appointmentController;
