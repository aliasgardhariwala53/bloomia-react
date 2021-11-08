import React from "react";
import Logo from "../../assets/Popup.png";
import "./CompleteGoalNotify.css"
import Swal from "sweetalert2";  
const CompleteGoalNotify = (props) => { 
  return (
    <div class="p-4 bg-white alertBox popupModal ">
      <div class="w-100 pb-3 row m-0 text-center">
        <span class="h4 m-0 mx-auto">Set Completed</span>
      </div>
      <div class="w-100">
        <div class="row m-0 align-items-center justify-content-center text-center">
          <div class="col-12">
            <img src={Logo} alt="hello" class="roundFinishPopImage" />
            <div class="w-100 py-4 m-0">
              You have completed 10 secs out of 20 goal secs.
            </div>
            <span onClick={props.onClick} class="custom-button-sign-up px-4 py-2 text-light">Ok</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteGoalNotify;
