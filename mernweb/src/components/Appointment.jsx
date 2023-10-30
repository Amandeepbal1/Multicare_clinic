import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
    // Define your state variables for form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        specialty: "",
        date: "",
        time: "", // Add the "time" field
        appointmentReason: "",
    });

    // Get the navigate function for redirecting
    let navigate = useNavigate();

    // Handle Inputs
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Make a POST request to your backend API
            const response = await fetch('/appointment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 201) {
                // Request was successful
                window.alert("Appointment submitted successfully");
                navigate('/Home');
            } else {
                // Request failed
                window.alert("Failed to submit Appointment details");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Function to generate time slots
    const generateTimeSlots = () => {
        const timeSlots = [];
        let time = new Date("2000-01-01T09:00");

        while (time <= new Date("2000-01-01T17:00")) {
            timeSlots.push(time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
            time.setMinutes(time.getMinutes() + 30);
        }

        return timeSlots;
    };

    // Function to get the current date
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Define the list of specialties
    const specialty = ["Cardiologist", "Dermatologist", "Pediatrician", "Orthopedist", "Psychiatrist"];
    const [appointmentReason, setAppointmentReason] = useState("");

    return (
        <div>
            <div className="container shadow my-5">
                <div className="row justify-content-end">
                    <div className="col-md-5 d-flex flex-column align-items-center form text-white justify-content-center order">
                        <h1 className="display-4 fw-bolder">Hello</h1>
                        <p className="lead text-center">Enter Your Details To Get an Appointment</p>
                    </div>
                    <div className="col-md-6 p-5">
                    <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input type="text" className="form-control" id="name" name="name" onChange={handleInputChange} 
                                value={formData.name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange}
                                value={formData.email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor ="contact" className="form-label">
                                    Contact</label>
                                <input type="text" className="form-control" id="contact" name="contact" onChange={handleInputChange}
                                value={formData.contact} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="specialty" className="form-label">
                                    Doctor Specialty
                                </label>
                                <select
                                    className="form-control"
                                    id="specialty"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleInputChange}>
                                    <option value="">Select a Specialty</option>
                                    {specialty.map((specialty, index) => (
                                        <option key={index} value={specialty}>
                                            {specialty}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">
                                    Date
                                </label>
                                <input type="date" className="form-control" id="date" name="date" min={getCurrentDate()} 
                                onChange={handleInputChange} value={formData.date}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="time" className="form-label">
                                    Time
                                </label>
                                <select
                                    className="form-control"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}>
                                    {generateTimeSlots().map((timeSlot, index) => (
                                        <option key={index} value={timeSlot}>
                                            {timeSlot}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="appointmentReason" className="form-label">
                                    Reason for Appointment
                                </label>
                                <textarea
                                    className="form-control"
                                    id="appointmentReason"
                                    name="appointmentReason"
                                    rows="4"
                                    value={appointmentReason}
                                    onChange={(e) => setAppointmentReason(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
 }
export default Appointment;