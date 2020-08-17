import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const isEmailValid = () => {
    const regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regx.test(state.email);
  };

  const validateEmail = () => {
    const email_error = document.getElementById("email-error");
    if (state.email !== "" && !isEmailValid()) {
      email_error.innerText = "Email is not valid";
    } else {
      email_error.innerText = "";
    }
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const error = document.getElementById("error");
    
    if (state.firstName !== "" && 
        state.lastName!=="" &&
        state.email !== "" && isEmailValid() &&
        state.password !== "") 
      {
        error.innerText = "";
        const email_error = document.getElementById("email-error");

        const validateEmailUrl = `https://api.raisely.com/v3/check-user`;
        const signupUrl = `https://api.raisely.com/v3/signup`;

        const validateEmailData = {
            "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
            "data": {
             "email": state.email,
            }
        }

        const requestData = {
          "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
          "data": {
           "firstName": state.firstName,
           "lastName": state.lastName,
           "email": state.email,
           "password": state.password
          }
        }

        const validateEmaildata = await axios.post(validateEmailUrl, validateEmailData);
        if(validateEmaildata.data.data.status === 'Ok')
        {
            email_error.innerText = '';
            const result = await axios.post(signupUrl, requestData);
            console.log(result);
        }else if(validateEmaildata.data.data.status === 'EXISTS'){
            email_error.innerText = "Email already exists";
        }else{
            email_error.innerText = '';
        }
    }
    else{
      error.innerText = "All fields are required";
    }
  };

  return (
    <div className="App">
      <div className="container">
        <form className="form" methop="POST" onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <span id="error"></span>
          <div className="form-item">
            <label className="form-lable">First Name</label>
            <input
              required
              className="form-input"
              type="text"
              name="firstName"
              value={state.firstName}
              onChange={handleInput}
            />
          </div>
          <div className="form-item">
            <label className="form-lable">Last Name</label>
            <input
              required
              className="form-input"
              type="text"
              name="lastName"
              value={state.lastName}
              onChange={handleInput}
            />
          </div>
          <div className="form-item">
            <label className="form-lable">Email</label>
            <input
              required
              className="form-input"
              type="email"
              name="email"
              value={state.email}
              onChange={handleInput}
              onBlur={validateEmail}
            />
            <span id="email-error"></span>
          </div>
          <div className="form-item">
            <label className="form-lable">Password</label>
            <input
              required
              className="form-input"
              type="password"
              name="password"
              value={state.password}
              onChange={handleInput}
            />
          </div>
          <div className="form-item">
            <input className="form-btn" type="submit" value="sign up" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
