import React, { useState } from "react";
import "./Profile.css";
import Header from "./Header";
import avatar from "../../assets/avatar.jpg";

const Profile = () => {
  const [useredit, setUseredit] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  //   const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUseredit({ ...useredit, [name]: value });
    console.log(value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(useredit);
    // setErrors(Validate(usersignup));
  };
  const enableedit = () => {
   return true;
  };

const [disabled , setDisabled] = useState(enableedit) 
if(disabled){ 
 setDisabled(false)
}else{ 
 setDisabled(true) 
} 


  return (
    <>
      <Header />

      <div className="container profile-container ml-2">
        <div className="row">
          <div className="col-2 ">
            <h2>Avatar</h2>
          </div>
          <div className="col-12 ">
            <img className="float-left" src={avatar} alt="" width="150px" />{" "}
            <span className="float-left mb-0">
              <i className="fa fa-plus"></i>
            </span>
          </div>
          <div className="col-12 d-flex">
            <div className="">Personal Information</div>
            <div onclick={enableedit} className="ml-auto edit-button"><a className="" href="./Home.js"><i className="fa fa-pencil text-light"></i></a></div>
            
          </div>

          <div className="col-12">
            <form className="row" onSubmit={submitForm}>
              <div className="col-6 form-group">
                <label for="exampleInputFirstName">First Name</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  value={useredit.firstname}
                  onChange={handleChange}
                  id="exampleInputFirstName"
                  placeholder="FirstName"
                  name="firstname"
                />
              </div>

              <div className="col-6 form-group">
                <label for="exampleInputLastName">Last Name</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  value={useredit.lastname}
                  onChange={handleChange}
                  id="exampleInputLastName"
                  placeholder="Lastname"
                  name="lastname"
                  disabled= {disabled}

                />
              </div>

              <div className="col-6  form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control authinput profile-input"
                  value="a@gmail.com"
                  onChange={handleChange}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  disabled= {disabled}
                  

                />
              </div>

              <div className="col-7  form-group ">
                <label for="exampleInputPassword1">Phone Number</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  value={useredit.phone}
                  onChange={handleChange}
                  id="exampleInputphone"
                  placeholder="Phone Number"
                  name="phone"
                />
              </div>
              <div className="col-7">
                <hr />

                <h2>Password Settings</h2>
              </div>
              <div className="col-6 form-group ">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control authinput profile-input"
                  value={useredit.password}
                  onChange={handleChange}
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="col-6 form-group ">
                <label for="exampleInputPassword2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control authinput profile-input"
                  value={useredit.password}
                  onChange={handleChange}
                  id="exampleInputPassword2"
                  placeholder="Password"
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
