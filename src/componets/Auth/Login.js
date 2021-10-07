import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../assets/images/Logov1.png";
import { Link } from "react-router-dom";

import { handleError, HttpCallPost } from "../../services/UseHttps";
import { LoginUrl } from "../../services/Network";

// import Images from '../../assets/Images/index'

const Login = (props) => {
  const [userlogin, setUserlogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserlogin({ ...userlogin, [name]: value });
    // console.log(name,value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(userlogin);
    let errorlogin = {};

    if (!userlogin.email) {
      errorlogin.email = "email required";
    } else if (
      !/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    ) {
      errorlogin.email = "email Invalid";
    }
    if (!userlogin.password) {
      errorlogin.password = "password required";
    }
    setErrors(errorlogin);

    // api integration function started
    const usertoken = localStorage.getItem("token");
    HttpCallPost(`${LoginUrl}`, "POST", userlogin, usertoken)
      .then((response) => {
        console.log("response recieved", response);
        console.log("token recieved", response.data.result.token);
        localStorage.setItem("token", response.data.result.token);
        localStorage.setItem("userId", response.data.result.token);
        // localStorage.setItem("userId", response.data.data._id);
        // window.location.assign('/home');
        props.history.push("./home");
      })
      .catch((error) => {
        // handleError(error)
        console.log("u", error);
      });
  };

  return (
    <div className="sign-form-container  ">
      <div className="image-container">
        <img src={Logo} alt="hello" width="200px" />
      </div>
      <form onSubmit={submitForm}>
        <h3 className="welcome">Welcome to Bloomia.</h3>
        <p className="para-create-account">
          Please enter your address and password to login
        </p>
        <div className="form-group">
          {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
          <input
            type="email"
            className="form-control authinput  authinput-email"
            value={userlogin.email}
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
            className="form-control authinput  authinput-email"
            value={userlogin.password}
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
        {errors.password && <p className="error-messege">{errors.password}</p>}

        <button type="submit" className="btn btn-primary signbtn">
          Sign in
        </button>
      </form>
      <div>
        <p>or Sign in</p>
        <button className="googlebtn">
          <i className="fa fa-google"></i> Sign Up with Google
        </button>
      </div>
      <div className="footer">
        <div>
          Don't have an account?
          <Link to="/sign-up">
            <span> Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
