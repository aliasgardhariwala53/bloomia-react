import React, { useState, useRef } from "react";
import "./Auth.css";
import Logo from "../../assets/images/Logov1.png";
import { Link, useHistory } from "react-router-dom";
import { handleError, HttpCall } from "../../services/UseHttps";
import { LoginUrl } from "../../services/Network";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index";

import "./Login.css";

// import Images from '../../assets/Images/index'

const Login = (props) => {
  const dispatch = useDispatch()
  const emailref = useRef();
  const passwordref = useRef();
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      email: emailref.current.value,
      password: passwordref.current.value,
    };
    let errorlogin = {};
    if (!data.email) {
      errorlogin.email = "email required";
    }
    if (!data.password) {
      errorlogin.password = "password required";
    }
    setErrors(errorlogin);

    // api integration function started
    if (data.email && data.password) {
      HttpCall(`${LoginUrl}`, "POST", data)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          if (response.data.sucess === true) {
            history.push("./");
            dispatch(authActions.login())//redux dispatch function
            props.authcheck(true);
          } else {
            localStorage.clear();
          }
          handleError(response.data);
        })
        .catch((error) => {
          // console.log("not logged in", error);
          // props.onwrongLogin(true)
        });
    }
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
        <div className="form-group d-flex">
          <input
            ref={emailref}
            type="email"
            className="form-control authinput  authinput-email"
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
        {errors.email && <p className="error-message-login">{errors.email}</p>}

        <div className="form-group d-flex">
          <input
            ref={passwordref}
            type="password"
            className="form-control authinput  authinput-email"
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
        {errors.password && (
          <p className="error-message-login">{errors.password}</p>
        )}
        <div>
          <Link
            to="/Forgetpassword"
            className="float-right mb-2 "
            style={{ textDecoration: "none" }}
          >
            <span> Forget Your password?</span>
          </Link>
        </div>
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
          <Link to="/sign-up" style={{ textDecoration: "none" }}>
            <span> Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
