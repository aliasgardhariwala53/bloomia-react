import React, { useState, useEffect } from "react";
import "./Profile.css";
import { handleError, HttpCallPost ,HttpCallImgPost} from "../../services/UseHttps";
import { updateProfileUrl } from "../../services/Network";
import { HttpCallGet } from "../../services/UseHttps";
import { GetUserUrl, updatePassworurl,UploadImage } from "../../services/Network";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import avatar from "../../assets/avatar.jpg";
import { useForm } from "react-hook-form";

// import Header from './Header';

const Profile = (props) => {
  const [userdata, setUserdata] = useState([]);
  const token = localStorage.getItem("token");
  // get method called

  // useform started
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm();
  // submit function defined
  const onSubmit = (data) => {
    HttpCallPost(`${updateProfileUrl}`, "PUT", data, token)
      .then((response) => {
        console.log("response recieved", response.data.message);
      })
      .catch((error) => {
        handleError(error);
        console.log("u", error);
      });
  };
  useEffect(() => {
    HttpCallGet(`${GetUserUrl}`, token)
      .then((response) => {
        setUserdata(response.data.result.data);
        console.log("n");
      })
      .catch((error) => {
        // console.log("error getting data", error);
        handleError(error);
      });
  }, []);

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

  props.onchangheaderuser(userdata.first_name);

  // on submit password
  const [userpassword, setUserpassword] = useState({
    newPassword: "",
    password: "",
    confirmpassword: "",
  });

  const [errorspassword, setErrorspassword] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserpassword({ ...userpassword, [name]: value });
    // console.log(name,value);
  };
  const submitFormPassword = (e) => {
    e.preventDefault();
    console.log(userpassword);
    let errorlogin = {};

    if (!userpassword.newPassword) {
      errorlogin.password = "password required";
    }
    if (!userpassword.confirmpassword) {
      errorlogin.confirmpassword = "confirm password required";
    }
    if (!(userpassword.confirmpassword === userpassword.newpassword)) {
      errorlogin.matchpassword = "confirm password Does not match";
    }
    if (!userpassword.password) {
      errorlogin.password = "current password required";
    }

    if (true) {
      setErrorspassword(errorlogin);
      const usertoken = localStorage.getItem("token");

      HttpCallPost(`${updatePassworurl}`, "PUT", userpassword, usertoken)
        .then((response) => {
          // console.log("response recieved", response);
          // console.log("token recieved", response.data.result.token);
          console.log("response recieved", response.data.message);
        })
        .catch((error) => {
          // handleError(error)
          console.log("failed password", error);
        });
    }
  };

  //set user image
  const [file, setFile] = useState();
  
  const popupalert=(event)=>{
    if (event.target.files.length) {
     
      setFile({ image: event.target.files[0]});
      console.log(file);
      document.getElementById('modal-box').classList.remove("d-none");
      
    } else{
      document.getElementById('modal-box').classList.add("d-none");


    }
    const usertoken = localStorage.getItem("token");

    HttpCallImgPost(`${UploadImage}`, "PUT", file,usertoken)
      .then((response) => {
        console.log("response recieved", response.data.message);
      })
      .catch((error) => {
        // handleError(error)
        console.log("failed image", error);
      });
  }


  // const submitimage=(e)=>{
  //   const file=e.target.files[0]
  //     setFile(file)
  //     HttpCallImgPost(`${UploadImage}`, "PUT", file)
  //     .then((response) => {
  //       console.log("response recieved", response.data.message);
  //     })
  //     .catch((error) => {
  //       // handleError(error)
  //       console.log("failed image", error);
  //     });
  //   }
  return (
    <>
      <div className="container profile-container ml-2">
        <div className="row">
          <div className="col-4 ">
            <h2>{userdata.first_name}</h2>
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





            {/* image form started */}
            <div className="col-8 offset-2 model-box bg-primary d-none" id="modal-box">
           <div className="row">
           <div className="col-8 offset-2">Adjust the image
                        </div>
               <div className="col-12 h-5">Image preview
                        </div>
               <div className="col-4 offset-2">cancel
                        </div>
               <div className="col-4 offset-1">preview
                        </div>
           </div>
            </div>
            <form>
            <div className=" form-group image-upload">
                <label 
                  htmlFor="imagefile"
                  style={{ margin: "2px 6px 0px", cursor: "pointer" }}
                >
                  <i className="fa fa-plus"></i>
                </label>

                <input
                name="file"
                id="imagefile"
                onChange={popupalert}
                
                  type="file"
                
                  // style={{ visibility: "hidden" }}
                  className="form-control "
                />
              </div>
            </form>












            <form className="row" onSubmit={handleSubmit(onSubmit)}>
              
              <div className="col-6 form-group">
                <label htmlFor="exampleInputFirstName">First Name</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="First name"
                  {...register("first_name", { required: true, maxLength: 80 })}
                  disabled={disabled}
                />
                {errors.first_name && (
                  <p className="error-messege">firstname is Required</p>
                )}
              </div>
              <div className="col-6 form-group">
                <label htmlFor="exampleInputLastName">Last Name</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="Last name"
                  {...register("last_name", { required: true, maxLength: 100 })}
                  disabled={disabled}
                />
                {errors.last_name && (
                  <p className="error-messege">lastname is Required</p>
                )}
              </div>
              <div className="col-6 form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="Email"
                  value="a@gmail"
                  // {...register("Email", {
                  //   required: true,
                  //   pattern: /^\S+@\S+$/i,
                  // })}
                  disabled={disabled}
                />
              </div>
              <div className="col-7 form-group">
                <label htmlFor="exampleInputPassword1">Phone Number</label>
                <input
                  type="tel"
                  className="form-control authinput profile-input"
                  placeholder="Mobile number"
                  {...register("number", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                  })}
                  disabled={disabled}
                />
                {errors.number && (
                  <p className="error-messege">mobile Number is Required</p>
                )}
              </div>

              <input
                type="submit"
                id="submitEdit"
                className="submitButton d-none"
              />
            </form>
            <form className="row" onSubmit={submitFormPassword}>
              <div className="col-12">
                <hr />

                <h2>Password Settings</h2>
              </div>
              <div className="col-7  form-group ">
                <label htmlFor="exampleInputPassword2">Current Password</label>
                <input
                  type="password"
                  style={{ cursor: "auto" }}
                  className="form-control authinput profile-input"
                  id="exampleInputPassword0"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  name="password"
                />
                {errorspassword.password && (
                  <p className="error-messege">Current password is Required</p>
                )}
              </div>
              <div className="col-6 form-group ">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  style={{ cursor: "auto" }}
                  className="form-control authinput profile-input"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={handleChange}
                  name="newPassword"
                />
                {errorspassword.newpassword && (
                  <p className="error-messege">password is Required</p>
                )}
              </div>

              <div className="col-6 form-group ">
                <label htmlFor="exampleInputPassword2">confirm Password</label>
                <input
                  type="password"
                  style={{ cursor: "auto" }}
                  className="form-control authinput profile-input"
                  id="exampleInputPassword2"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  name="confirmpassword"
                />
                {errorspassword.confirmpassword && (
                  <p className="error-messege">confirm password is Required</p>
                )}
              </div>
              <div className="col-3">
                <button type="submit" className="btn btn-primary">
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
