import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {

    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: "",
        age: "",
        gender: "",
        password: ""

    });

    //Handle Inputs
    const handleInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setUser({ ...user, [name]: value });
    }

    //Handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        //Object Destructuring
        //Store object data into variables
        const { name, email, contact, age, gender, password } = user;
        try {
            //It is submitting data on port 3000 by default i.e frontend but we need to submit on port 3001 i.e backend
            // so we will use Proxy
            const res = await fetch('/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, contact, age, gender, password
                })
            })
            console.log(res.status)
            if (res.status === 400 || !res) {
                window.alert("Already Used Details")
            } else {
                // You need to Restart the Server for Proxy Works
                // Now Try Again
                window.alert("Registered Successfully");
                navigate.push('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="container shadow  my-5">
                <div className="row justify-content-end ">
                    <div className="col-md-5 d-flex flex-column align-items-center form text-white justify-content-center order-2  ">
                        <h1 className="display-4 fw-bolder ">Hello</h1>
                        <p className="lead text-center ">Enter Your Details To Register</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50 ">Login</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
    
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name"
                                    name="name" value={user.name} onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    name="email" value={user.email} onChange={handleInput} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label">Contact</label>
                                <input type="number" className="form-control" id="contact"
                                    name="contact" value={user.contact} onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">Age</label>
                                <input type="number" className="form-control" id="age"
                                    name="age" value={user.age} onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <input type="text" className="form-control" id="gender"
                                    name="gender" value={user.gender} onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                    name="password" value={user.password} onChange={handleInput} />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">I Agree terms and Conditions</label>
                            </div>
                            <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill ">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;