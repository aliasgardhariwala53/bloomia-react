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
            { props.CompletedGoalTime<props.TotalGoalTIme &&<p>You have completed {props.CompletedGoalTime} secs out of {props.TotalGoalTIme} goal secs.</p>}
            { props.CompletedGoalTime>=props.TotalGoalTIme &&<p>You have completed your daily goal, you can take rest now.</p>}
            </div>
            <span onClick={props.onClick} class="custom-button-sign-up px-4 py-2 text-light">Ok</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteGoalNotify;
