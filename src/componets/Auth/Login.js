import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../assets/images/Logov1.png";
import { Link, useHistory } from "react-router-dom";
import { handleError, HttpCall } from "../../services/UseHttps";
import { LoginUrl } from "../../services/Network";

import "./Login.css"

// import Images from '../../assets/Images/index'

const Login = (props) => {
  const history = useHistory();
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
    // console.log(userlogin);
    let errorlogin = {};

    if (!userlogin.email ) {
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
    if(userlogin.email && userlogin.password )
   { HttpCall(`${LoginUrl}`, "POST", userlogin)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
     
        localStorage.setItem("userId", response.data._id);
        // console.log("response",response.data.message);
        if (response.data.message==="login user successfully") {
          
          history.push("./");
          props.authcheck(true);
        }else{
          localStorage.clear();
        }
        handleError(response.data)
      })
      .catch((error) => {
        // console.log("not logged in", error);
        // props.onwrongLogin(true)
      });}
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
        {errors.email && <p className="error-message-login">{errors.email}</p>}

        <div className="form-group ">
          
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
        {errors.password && <p className="error-message-login">{errors.password}</p>}
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
