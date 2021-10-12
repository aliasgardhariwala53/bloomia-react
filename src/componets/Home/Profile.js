import React, { useState, useEffect ,useMemo} from "react";
import "./Profile.css";
import {
  handleError,
  HttpCallPost,
  HttpCallImgPost,
} from "../../services/UseHttps";
import { updateProfileUrl } from "../../services/Network";
import { HttpCallGet } from "../../services/UseHttps";
import {
  GetUserUrl,
  updatePassworurl,
  UploadImage,
} from "../../services/Network";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import avatar from "../../assets/avatar.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import ImageCropper from "./ImageCropper";
import Swal from 'sweetalert2'
// import Header from './Header';

const Profile = (props) => {
  const [profileimage, setProfileimage] = useState();
  const [userdata, setUserdata] = useState({
   
  
  first_name: "Avatar ",
  last_name: " ",
  profileImage: "uploads/1633780506772defaultImage.jpg"

  });

  const [refresh, setrefresh] = useState(false);
  const [userdatapre, setUserdatapre] = useState([]);
  const token = localStorage.getItem("token");
  // get method called
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues: useMemo(() => {
    console.log("User has changed");
    return userdata;
  }, [userdata])
});
useEffect(() => {
  console.log("Reset");
  reset(userdata);
}, [userdata]);

  // useform started
  useEffect(() => {
    HttpCallGet(`${GetUserUrl}`, token)
      .then((response) => {
        console.log(response.data.data);
        setUserdata(response.data.data);
        console.log("get api called");
      })
      .catch((error) => {
        // console.log("error getting data", error);
        handleError(error);
      });
      
      if (userdata.profileImage==="uploads/1633780506772defaultImage.jpg") {
        document.getElementById("remove-image").classList.add("d-none");
      }
  }, [refresh]);

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
    setrefresh(!refresh);
  };


  // get api

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

  props.onchangheaderuser(userdata);

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

  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;

        setImageToCrop(image);
        document.getElementById("modal-box").classList.remove("d-none");
      });

      reader.readAsDataURL(event.target.files[0]);
    } else {
      document.getElementById("modal-box").classList.add("d-none");
    }
  };
 
  const onremoveimage=(e)=>{
    
    e.preventDefault();
  Swal.fire({
    title: 'Are you sure Want to remove Profile Image?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Succesfully Removed!', '', 'success')
      let data = new FormData();
      data.append("attachments", null);
      const usertoken = localStorage.getItem("token");
      HttpCallImgPost(`${UploadImage}`, "PUT", data, usertoken)
      .then((response) => {
        console.log(response);
        console.log("response recieved", response.data.message);
        setProfileimage(response.data.data.profileImage);
        document.getElementById("remove-image").classList.add("d-none");
        document.getElementById("image-fa-plus").classList.remove("d-none");
        document.getElementById("image-fa-pen").classList.add("d-none");
       
        setrefresh(!refresh);
      })
      .catch((error) => {
        // handleError(error)
        console.log("failed image null", error);
      });
    } 
  })
 
   
  }
  const onSubmitfile = (e) => {
    e.preventDefault();
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "ALi.png", { type: "image/png" });
        let data = new FormData();
        data.append("attachments", file);
        const usertoken = localStorage.getItem("token");
        HttpCallImgPost(`${UploadImage}`, "PUT", data, usertoken)
          .then((response) => {
            console.log(response);
            console.log("response recieved", response.data.message);
            setProfileimage(response.data.data.profileImage);
            document.getElementById("modal-box").classList.add("d-none");
            document.getElementById("crop-box").classList.add("d-none");
            document.getElementById("image-fa-plus").classList.add("d-none");
            document.getElementById("image-fa-pen").classList.remove("d-none");
            document.getElementById("remove-image").classList.remove("d-none");
            setrefresh(!refresh);
          })
          .catch((error) => {
            // handleError(error)
            console.log("failed image", error);
          });
      });
  };

  const showPreview = () => {
    document.getElementById("preview-box").classList.remove("d-none");
    document.getElementById("crop-box").classList.add("d-none");
  };
  const cancelmodel = () => {
    document.getElementById("modal-box").classList.add("d-none");
  };
  const backPreview = () => {
    document.getElementById("preview-box").classList.add("d-none");
    document.getElementById("crop-box").classList.remove("d-none");
  };
  return (
    <>
      <div className="container profile-container ml-2">
        <div className="row">
          <div className="col-6 ">
            <h3 className="text-left">{(userdata.first_name + " " +userdata.last_name) || "Avatar" }</h3>
          </div>
          <div className="col-12 ">
            <img
              className="float-left rounded-circle"
              src={"https://bloomia.herokuapp.com/" + userdata.profileImage}
              alt=""
              width="105"
              height="105"
            />{" "}
            <span className="float-left mb-0"></span>
          </div>
          <span id="remove-image" onClick={onremoveimage} className="col-4 text-danger remove-image " >Remove image</span>
          <div className="col-12 d-flex mt-4">
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
          <label
            className="select-image"
            htmlFor="imagefile"
            style={{ margin: "2px 6px 0px",    width: "20px", cursor: "pointer" }}
          >
            <i id="image-fa-plus" className="fa fa-plus image-fa-icon"></i>
            <i id="image-fa-pen" className="fas fa-pen image-fa-icon d-none"></i>
          </label>
          <div className="col-12">
            {/* image form started */}
            <div className="col-8  model-box d-none" id="modal-box">
              <form
                className="row"
                method="POST"
                action="#"
                id="#"
                onSubmit={onSubmitfile}
              >
                <h4>Adjust the image</h4>
                <div className="app " id="crop-box">
                  <input
                    type="file"
                    id="imagefile"
                    style={{ visibility: "hidden" }}
                    accept="image/*"
                    onChange={onUploadFile}
                  />
                  <div>
                    <ImageCropper
                      imageToCrop={imageToCrop}
                      onImageCropped={(croppedImage) =>
                        setCroppedImage(croppedImage)
                      }
                    />
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className="bg-danger rounded save-button mx-auto "
                    onClick={cancelmodel}
                  >
                    cancel
                  </div>
                  <div
                    className="bg-success rounded save-button mx-auto my-1"
                    style={{ cursor: "pointer" }}
                    onClick={showPreview}
                  >
                    preview
                  </div>
                </div>

                <div className="d-none" id="preview-box">
                  {croppedImage && (
                    <div>
                      <img
                        className="Cropped_Img"
                        alt="Cropped Img"
                        src={croppedImage}
                      />
                      <div
                        style={{ cursor: "pointer" }}
                        className="bg-danger rounded save-button mt-2 mx-auto c"
                        onClick={backPreview}
                      >
                        back
                      </div>
                      <button className="bg-success rounded m-1 save-button">
                        Save
                      </button>
                    </div>
                  )}
                </div>
                {/* <button className="bg-success">Cancel</button> */}
              </form>
            </div>
           

            <form className="row" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-6 form-group">
                <label htmlFor="exampleInputFirstName">First Name</label>
                <input
                  ref={register}
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="First name"
                  name="first"
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
                  style={{ cursor: "not-allowed" }}
                  type="text"
                  className="form-control authinput profile-input"
                  placeholder="Email"
                  value={userdata.email}
                
                  disabled={true}
                />
              </div>
              <div className="col-6 form-group">
                
              </div>
              
              <div className="col-6 form-group">
                <label htmlFor="exampleInputPassword1">Phone Number</label>
                <input
                  type="tel"
                  ref={register}
                  className="form-control authinput profile-input"
                  placeholder="Mobile number"
                  {...register("contact", {
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

              <button
                type="submit"
                id="submitEdit"
                className="submitButton d-none"
                
              ><i className="fas fa-check fa-sm text-light"></i></button>
            </form>
            <form className="row" onSubmit={submitFormPassword}>
              <div className="col-12">
                <hr />

                <h5 className="text-left">Password Settings</h5>
              </div>
              <div className="col-6  form-group ">
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
               <div className="col-6 form-group">
                
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
