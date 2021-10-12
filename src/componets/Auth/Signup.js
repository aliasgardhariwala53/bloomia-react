import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../assets/images/Logov1.png";
// import Images from '../../assets/Images/index'
import { Link } from "react-router-dom";
import Validate from "./Validate";
import {handleError, HttpCallPost} from '../../services/UseHttps';
import { SignupUrl } from "../../services/Network";

const Signup = () => {
  const [usersignup, setUsersignup] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUsersignup({ ...usersignup, [name]: value });
    // console.log(value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    
    // console.log(usersignup);
    setErrors(Validate(usersignup));
  
    HttpCallPost(`${SignupUrl}`, 'POST', usersignup)
    .then((response)=>{
      console.log("response recieved",response);
    })
    .catch((error)=>{
        handleError(error)
        console.log("u", error);
    })
   
  };

  return (
    <div className="sign-form-container  ">
      <div className="image-container">
        <img src={Logo} alt="hello" width="200px" />
      </div>
      <form onSubmit={submitForm}>
        <h3 className="welcome">Welcome to Bloomia.</h3>
        <p className="para-create-account">
          Please enter your details to create your account.
        </p>
        <div className="form-group">
          {/* <label htmlFor="exampleInputFirstName">First Name</label> */}
          <input
            type="text"
            className="form-control authinput"
            value={usersignup.first_name}
            onChange={handleChange}
            id="exampleInputFirstName"
            placeholder="FirstName"
            name="first_name"
          />
          <div className="input-icon">
              <span>
                <i className="fa fa-user"></i>
              </span>
            </div>
        </div>
        {errors.first_name && <p className="error-messege">{errors.first_name}</p>}
        <div className="form-group">
          {/* <label htmlFor="exampleInputLastName"></label> */}
          <input
            type="text"
            className="form-control authinput"
            value={usersignup.last_name}
            onChange={handleChange}
            id="exampleInputLastName"
            placeholder="Lastname"
            name="last_name"
            />
            <div className="input-icon">
              <span>
                <i className="fa fa-user"></i>
              </span>
            </div>
        </div>
            {errors.last_name && <p className="error-messege">{errors.last_name}</p>}
        <div className="form-group">
          {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
          <input
            type="email"
            className="form-control authinput authinput-email"
            value={usersignup.email}
            onChange={handleChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            />
            <div className="input-icon">
              <span>
                <i className="fa fa-envelope"></i>
              </span>
            </div>
        </div>
            {errors.email && <p className="error-messege">{errors.email}</p>}

        <div className="form-group ">
          {/* <label htmlFor="exampleInputPassword1">Password</label> */}
          <input
            type="password"
            className="form-control authinput authinput-email"
            value={usersignup.password}
            onChange={handleChange}
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            />
            <div className="input-icon">
              <span>
                <i className="fa fa-lock"></i>
              </span>
            </div>
        </div>
            {errors.password  && <p className="error-messege">{errors.password}</p>}

        <button type="submit" className="btn btn-primary signbtn">
          Registration
        </button>
      </form>
      <div>
        <p>or Sign Up </p>
        <button className="googlebtn">
          <i className="fa fa-google"></i> Sign Up with Google
        </button>
      </div>
      <div className="footer">
        <div>
          Already have an account?
          <Link to="./login"  style={{ textDecoration: 'none' }}>
            <span> Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
