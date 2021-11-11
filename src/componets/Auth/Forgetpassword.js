import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../assets/images/Logov1.png";
import { Link } from "react-router-dom";
import { HttpCall } from "../../services/UseHttps";
import { ForgetPasswordUrl } from "../../services/Network";
const Forgetpassword = () => {
  
  const [useremail, setUseremail] = useState({
    email: "",
  
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUseremail({ ...useremail, [name]: value });
    // console.log(name,value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    // console.log(useremail);
    let errorlogin = {};

    if (!useremail.email) {
      errorlogin.email = "email required";
    } else if (
      !/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    ) {
      errorlogin.email = "email Invalid";
    }
   
    setErrors(errorlogin);

    // api integration function started

    
    HttpCall(`${ForgetPasswordUrl}`,"PUT", useremail)
      .then((response) => {
        // console.log("response recieved", response);
        // console.log("token recieved", response.data.result.token);
        localStorage.setItem("token", response.data.result.token);
        localStorage.setItem("userId", response.data.result.data._id);
  
      })
      .catch((error) => {
        // handleError(error)
        // console.log("u", error);
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
          Please enter your email address assosiated with bloomia account
          </p>
          <div className="form-group d-flex">
            {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
            <input
              type="email"
              className="form-control authinput  authinput-email"
              value={useremail.email}
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
  
       
          <button type="submit" className="btn btn-primary signbtn">
            Submit
          </button>
        </form>
        
        <div className="footer">
          <div>
          Already have an account? 
            <Link to="/login">
              <span> Sign In</span>
            </Link>
          </div>
          
        </div>
      </div>
    )
}

export default Forgetpassword;
