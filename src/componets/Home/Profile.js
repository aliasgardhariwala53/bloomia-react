import React, { useState, useEffect, useMemo } from "react";
import "./Profile.css";
import {
  handleError,
  HttpCall,
} from "../../services/UseHttps";
import { updateProfileUrl } from "../../services/Network";

import { GetUserUrl, UploadImage } from "../../services/Network";
import "react-image-crop/dist/ReactCrop.css";
import { useForm } from "react-hook-form";
import ImageCropper from "./ImageCropper";
import Swal from "sweetalert2";
import Changepassword from "./Changepassword";

const Profile = (props) => {
  const token = localStorage.getItem("token")
  const [removebutton, setRemovebutton] = useState(true);
  const [editprofile, setEditprofile] = useState(true);

  const [profileimage, setProfileimage] = useState();
  const [refresh, setrefresh] = useState(false);

  const [userdata, setUserdata] = useState({
    first_name: "Avatar ",
    last_name: " ",
    profileImage: "uploads/1634108597644defaultPicture.png",
  });

  // get method called
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      console.log("User has changed");
      return userdata;
    }, [userdata]),
  });
  useEffect(() => {
    console.log("Reset");
    reset(userdata);
  }, [userdata]);

  // useform started

  useEffect(() => {
    HttpCall(`${GetUserUrl}`,"GET")
      .then((response) => {
        setUserdata(response.data.data);
       
        setRemovebutton(
          response.data.data.profileImage !==
            "uploads/1633780506772defaultImage.jpg"
        );
      })
      .catch((error) => {
        
        handleError(error);
      });
  }, [refresh,token]);

  // submit function defined
  const onSubmit = (data) => {
    HttpCall(`${updateProfileUrl}`,"PUT", data)
      .then((response) => {})
      .catch((error) => {
        handleError(error);
      });
    setrefresh(!refresh);
  };

  const enableedit = () => {
    setEditprofile(!editprofile);
    let divs = document.querySelectorAll(".form-control");
    for (var i = 0; i < divs.length; i++) {
      if (editprofile) {
        divs[i].classList.add("mystyle");
      } else {
        divs[i].classList.remove("mystyle");
      }
    }
  };

  props.onchangheaderuser(userdata);
  // on submit password

  const [modelbox, setmodelbox] = useState(true);
  const [previewbox, setpreviewbox] = useState(false);
  const [cropbox, setcropbox] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);
  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const image = reader.result;
        setImageToCrop(image);
        setmodelbox(true);
        setcropbox(true);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onremoveimage = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure Want to remove Profile Image?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Succesfully Removed!", "", "success");
        let data = new FormData();
        data.append("attachments", null);
        HttpCall(`${UploadImage}`, "PUT", data)
          .then((response) => {
            setProfileimage(response.data.data.profileImage);
            setrefresh(!refresh);
          })
          .catch((error) => {});
      }
    });
  };
  const onSubmitfile = (e) => {
    e.preventDefault();
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "ALi.png", { type: "image/png" });
        let data = new FormData();
        data.append("attachments", file);
        HttpCall(`${UploadImage}`, "PUT", data)
          .then((response) => {
            setProfileimage(response.data.data.profileImage);
            setpreviewbox(false);
            setcropbox(false);
            setrefresh(!refresh);
          })
          .catch((error) => {});
      });
  };

  const showPreview = () => {
    setcropbox(false);
    setpreviewbox(true);
  };
  const cancelmodel = () => {
    setcropbox(false);
    setpreviewbox(false);
  };
  const backPreview = () => {
    setcropbox(true);
  };
  return (
    <>
      <div className="container profile-container ml-2">
        <div className="row position-relative">
          <div className="col-12 ">
            <h3 className="text-left">
              {userdata.first_name + " " + userdata.last_name || "Avatar"}
            </h3>
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
          {removebutton && (
            <span
              onClick={onremoveimage}
              className="col-4 text-danger remove-image text-left"
            >
              Remove image
            </span>
          )}{" "}
          <div className="col-12 d-flex mt-4">
            <div className="">Personal Information</div>
            {editprofile && (
              <div onClick={enableedit} className="ml-auto edit-button ">
                <i className="fa fa-pencil text-light"></i>
              </div>
            )}
            {!editprofile && (
              <div onClick={enableedit} className="ml-auto edit-button">
                <i className="fa fa-times text-light" aria-hidden="true"></i>
              </div>
            )}
          </div>
          <label
            className="select-image"
            htmlFor="imagefile"
            style={{ margin: "2px 6px 0px", width: "20px", cursor: "pointer" }}
          >
            {removebutton ? (
              <i id="image-fa-pen" className="fas fa-pen image-fa-icon"></i>
            ) : (
              <i id="image-fa-plus" className="fa fa-plus image-fa-icon"></i>
            )}
          </label>
          <div className="col-12">
            {/* image form started */}
            {modelbox && (
              <div className="col-8 model-box">
                <form
                  className="row position-relative"
                  method="POST"
                  action="#"
                  id="#"
                  onSubmit={onSubmitfile}
                >
                  <input
                    type="file"
                    id="imagefile"
                    style={{ visibility: "hidden" }}
                    accept="image/*"
                    onChange={onUploadFile}
                  />
                  {cropbox && (
                    <div className="app crop-box">
                      <h4>Adjust the image</h4>
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
                  )}

                  {previewbox && (
                    <div className="preview-box" id="preview-box">
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
                          <button className="bg-success rounded mt-1 save-button d-flex mx-auto justify-content-center">
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </div>
            )}

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
                  disabled={editprofile}
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
                  disabled={editprofile}
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
              <div className="col-6 form-group"></div>

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
                  disabled={editprofile}
                />
                {errors.number && (
                  <p className="error-messege">mobile Number is Required</p>
                )}
              </div>

              {!editprofile && (
                <button type="submit" className="submitButton ">
                  <i className="fas fa-check fa-sm text-light"></i>
                </button>
              )}
            </form>

            <Changepassword />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
