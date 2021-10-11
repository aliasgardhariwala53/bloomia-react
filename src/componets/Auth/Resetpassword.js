import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../assets/images/Logov1.png";
import { Link, useHistory, useParams } from "react-router-dom";
import { handleError, HttpCallPost } from "../../services/UseHttps";
import { ResetPasswordurl } from "../../services/Network";
import SweetAlert from 'react-bootstrap-sweetalert';

// import Images from '../../assets/Images/index'

const Resetpassword = (props) => {
  const {id} = useParams()
  console.log(id);
  const history = useHistory();

  const [userpassword, setUserpassword] = useState({
    _id: id,
    newPassword: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserpassword({ ...userpassword, [name]: value });
    // console.log(name,value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(userpassword);
    let errorlogin = {};

    if (!userpassword.password) {
      errorlogin.password = "password required";
    }
    setErrors(errorlogin);

    // api integration function started

    HttpCallPost(`${ResetPasswordurl}`, "PUT", userpassword)
      .then((response) => {
        console.log("response recieved", response);
       
        history.push('/login')
      })
      .catch((error) => {
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
        <p className="para-create-account">Please enter your new password</p>

        <div className="form-group ">
          <input
            type="text"
            className="form-control authinput  authinput-email"
            value={userpassword.userid}
            onChange={handleChange}
            id="exampleInputuserid"
            name="userid"
            hidden
          />
        </div>

        <div className="form-group ">
          {/* <label htmlFor="exampleInputPassword1">Password</label> */}
          <input
            type="password"
            className="form-control authinput  authinput-email"
            value={userpassword.newPassword}
            onChange={handleChange}
            id="exampleInputPassword1"
            placeholder="Enter your new password"
            name="newPassword"
          />
          <div className="input-icon">
            <span>
              <i className="fa fa-lock"></i>
            </span>
          </div>
        </div>
        {errors.newPassword && <p className="error-messege">{errors.newPassword}</p>}
        <div className="form-group ">
          {/* <label htmlFor="exampleInputPassword1">Password</label> */}
          <input
            type="password"
            className="form-control authinput  authinput-email"
            value={userpassword.confirmpassword}
            onChange={handleChange}
            id="exampleInputPassword1"
            placeholder="Confirm your password"
            name="confirmpassword"
          />
          <div className="input-icon">
            <span>
              <i className="fa fa-lock"></i>
            </span>
          </div>
        </div>
        {errors.confirmpassword && (
          <p className="error-messege">{errors.confirmpassword}</p>
        )}

        <button type="submit" className="btn btn-primary signbtn">
          Submit
        </button>
      </form>

      <div className="footer">
        <div>
          Want to try Sign In?
          <Link to="/login">
            <span> Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Resetpassword;
