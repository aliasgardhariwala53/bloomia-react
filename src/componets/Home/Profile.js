import React, { useState } from "react";
import "./Profile.css";

import avatar from "../../assets/avatar.jpg";
import { useForm } from "react-hook-form";
// import Header from './Header';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);




  // edit button code start
  const [disabled, setDisabled] = useState(true);
  const enableedit = () => {
    setDisabled(!disabled);
    console.log(disabled);
    let divs = document.querySelectorAll(".form-control");
    for (var i = 0; i < divs.length; i++) {
      if (disabled) {
        divs[i].classList.add("mystyle");
        document.getElementById("submitEdit").classList.remove("d-none");
        document.getElementById("editEnable").classList.add("d-none");
        document.getElementById("editDisable").classList.remove("d-none");
      } else {
        divs[i].classList.remove("mystyle");
        document.getElementById("submitEdit").classList.add("d-none");
        document.getElementById("editEnable").classList.remove("d-none");
        document.getElementById("editDisable").classList.add("d-none");
      }
    }
  };
  return (
    <>
      
      <div className="container profile-container ml-2">
        <div className="row">
          <div className="col-2 ">
            <h2>Avatar</h2>
          </div>
          <div className="col-12 ">
            <img className="float-left" src={avatar} alt="" width="150px" />{" "}
            <span className="float-left mb-0"></span>
          </div>
          <div className="col-12 d-flex">
            <div className="">Personal Information</div>
            <div  onClick={enableedit}
              id="editEnable" className="ml-auto edit-button ">
              <i className="fa fa-pencil text-light"></i>
            </div>
            <div  onClick={enableedit} id="editDisable" className="ml-auto edit-button d-none">
              <i className="fa fa-times text-light" aria-hidden="true"></i>
            </div>
          </div>
          <div className="col-12">
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <div className=" form-group image-upload">
                <label
                  htmlFor="file"
                  style={{ margin: "2px 6px 0px", cursor: "pointer" }}
                >
                  <i className="fa fa-plus"></i>
                </label>
                
                <input
                  type="file"
                  {...register("image", { required: true, maxLength: 80 })}
                  style={{ visibility: "hidden" }}
                  
                  className="form-control "
                  disabled={disabled}
                />
              </div>
              <div className="col-6 form-group">
              <label htmlFor="exampleInputFirstName">First Name</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="First name"
                  {...register("firstname", { required: true, maxLength: 80 })}
                  disabled={disabled}
                />
                {errors.firstname && (
                   <p  className="error-messege">
                   firstname is Required
                 </p>
                )}
              </div>
              <div className="col-6 form-group">
              <label htmlFor="exampleInputLastName">Last Name</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="Last name"
                  {...register("lastname", { required: true, maxLength: 100 })}
                  disabled={disabled}
                />
                {errors.lastname && (
                  <p  className="error-messege">
                    lastname is Required
                  </p>
                )}
              </div>
              <div className="col-6 form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="Email"
                  {...register("Email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  disabled={disabled}
                />
                
              </div>
              <div className="col-7 form-group">
              <label htmlFor="exampleInputPassword1">Phone Number</label>
                <input
                  type="tel"
                  className="form-control authinput profile-input"
                  placeholder="Mobile number"
                  {...register("Mobile number", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                  })}
                  disabled={disabled}
                />
                {errors.lastname && (
                  <p  className="error-messege">
                    mobile Number is Required
                  </p>
                )}
              </div>

              <input type="submit"  id="submitEdit" className="submitButton d-none" />
            </form>
            <form className="row">
              <div className="col-7">
                <hr />

                <h2>Password Settings</h2>
              </div>

              <div className="col-6 form-group ">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  style={{ cursor: "auto" }}
                  className="form-control authinput profile-input"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="col-6 form-group ">
                <label htmlFor="exampleInputPassword2">Confirm Password</label>
                <input
                  type="password"
                  style={{ cursor: "auto" }}
                  className="form-control authinput profile-input"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Save Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
