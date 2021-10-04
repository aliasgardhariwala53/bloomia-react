import React, { useState } from "react";
import "./Profile.css";
// import Header from "./Header";
import avatar from "../../assets/avatar.jpg";
import { useForm } from "react-hook-form";

const Profile = () => {
  // fuctions for 1st form start
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(errors);

  // fuctions for 1st form end

  // password functions
  const [userpassword, setUserpassword] = useState({
    password: "",
    confirmpassword: "",
  });
  const handleChangePassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserpassword({ ...userpassword, [name]: value });
    console.log(value);
  };
  const submitPassword = (e) => {
    e.preventDefault();
    console.log(userpassword);
  };
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
            <div
              onClick={enableedit}
              id="editEnable"
              className="ml-auto edit-button "
            >
              <i className="fa fa-pencil text-light"></i>
            </div>
            <div
              onClick={enableedit}
              id="editDisable"
              className="ml-auto edit-button d-none"
            >
              <i className="fa fa-times text-light" aria-hidden="true"></i>
            </div>
          </div>

          <div className="col-12">
      
            <form className="row">
              <button
                type="submit"
                id="submitEdit"
                className=" submitButton d-none"
              >
                <i
                  className="fa fa-check-circle text-light"
                  aria-hidden="true"
                ></i>
              </button>
              <div className=" form-group image-upload">
                <label
                  htmlFor="file"
                  style={{ margin: "2px 6px 0px", cursor: "pointer" }}
                >
                  <i className="fa fa-plus"></i>
                </label>
                
                <input
                  type="file"
                  style={{ visibility: "hidden" }}
                  id="file"
                  className="form-control "
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="exampleInputFirstName">First Name</label>
                <input
                  // {...register('firstname', { required: true })}
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="FirstName"
                  // name="firstname"
                  disabled={disabled}
                />
                {/* { errors.firstname?.type && <span className='text-red-500 text-sm'>First Name is Required</span>} */}
              </div>

              <div className="col-6 form-group">
                <label htmlFor="exampleInputLastName">Last Name</label>
                <input
                  {...register("lastname", { required: true })}
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="Lastname"
                  // name="lastname"
                  disabled={disabled}
                />
              </div>

              <p className="error-messege">{errors.lastname}</p>
              <div className="col-6  form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  style={{ cursor: "not-allowed" }}
                  type="email"
                  className="form-control authinput profile-input"
                  value="a@gmail.com"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  // name="email"
                  disabled={true}
                />
              </div>

              <div className="col-7  form-group ">
                <label htmlFor="exampleInputPassword1">Phone Number</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  id="exampleInputphone"
                  placeholder="Phone Number"
                  // name="phone"
                  disabled={disabled}
                />
              </div>
            </form>
            <form className="row" onSubmit={submitPassword}>
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
                  value={userpassword.password}
                  onChange={handleChangePassword}
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
                  value={userpassword.confirmpassword}
                  onChange={handleChangePassword}
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
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
