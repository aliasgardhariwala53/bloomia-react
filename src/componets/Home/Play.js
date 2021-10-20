import React, { useState, useEffect } from "react";
import "./Play.css";
import Logo from "../../assets/images/Logov1.png";
import LightMode from "../../video/LightMode.mp4";

const Play = (props) => {
  // let lsqueeze=props.time.a1;
  // let lrest=props.time.a2;
  // let  lreps=props.time.a3;
  // let  ssqueeze=props.time.b1;
  // let  srest=props.time.b2;
  // let  sreps=props.time.b3;
  // let  rsqueeze=props.time.c1;
  // let  rrest=props.time.c2;
  // let  rreps=props.time.c3;
  const [playState, setPlaystate] = useState("running");
  const [Timestate, setTimestate] = useState({});
  function startanimation() {
    // console.log(props.time);
    setTimestate(props.time.a1);
    if (playState === "paused") {
        setPlaystate("running");
        document.getElementById("shape").style.animationPlayState = playState;
        document.getElementById("innercircle").style.animationPlayState = playState;
        document.getElementById("play-icon").classList.add("d-none");
        document.getElementById("paused-icon").classList.remove("d-none");
      } else {
        setPlaystate("paused");
        document.getElementById("paused-icon").classList.add("d-none");
        document.getElementById("play-icon").classList.remove("d-none");
        document.getElementById("shape").style.animationPlayState = playState;
        document.getElementById("innercircle").style.animationPlayState = playState;
      }
     
    longfunction()
    }
// long squeeze started
function longfunction(params) {
    document.getElementById("shape").style.animationDuration = `${Timestate}s`;
    document.getElementById("shape" ).style.animationIterationCount = `${Timestate}s`;
    document.getElementById("shape").classList.add("shape-two");
    document.getElementById("squeezetype").innerHTML="Long Squeeze";
    // console.log("long Squeeze");

    setTimeout(() => {
        shortfunction()
    }, Timestate * Timestate * 1000);
}
// short squeeze started
function shortfunction(params) {
     document.getElementById("shape").style.animationDuration = `${Timestate}s`;
    document.getElementById("shape" ).style.animationIterationCount = `${Timestate}s`;
     document.getElementById("innercircle").style.animationDuration = `${Timestate}s`;
    document.getElementById("innercircle" ).style.animationIterationCount = `${Timestate}s`;
    document.getElementById("innercircle").classList.add("innercircle-two");
    document.getElementById("squeezetype").innerHTML="Short Squeeze";
    console.log("Short Squeeze");
}

  useEffect(() => {
    
    console.log(Timestate);
    
    setTimeout(() => {
      document.getElementById("shape").classList.remove("shape-two");
      document.getElementById("innercircle").classList.remove("innercircle-two");
    }, Timestate * Timestate *Timestate * 1000);
    setPlaystate("");
  }, [Timestate]);

  return (
    <div className="play-container">
      <video autoPlay loop muted controls id="myVideo">
        <source src={LightMode} type="video/mp4" />
        Your browser does not support HTML 5 video.
      </video>
      <div className="timer" id="demo"></div>
      <div className="display-time">
        <div className="play-button" onClick={startanimation}>
          <i id="play-icon" className="fas fa-play text-light"></i>
          <i id="paused-icon" className="fas fa-pause text-light d-none"></i>
        </div>
        <div id="squeezetype"className="timer-type"></div>
        <svg className="button" expanded="true" height="500px" width="500px">
          <circle
            id="shape"
            className="circle1"
            strokeLinecap="round"
            strokeDasharray="1256"
            strokeDashoffset="0"
            cx="50%"
            cy="50%"
            r="30%"
            stroke="#fd7279"
            strokeWidth="3%"
            fill="none"
          />
          <circle
            id="innercircle"
            className="circle innerCircle"
            cx="50%"
            cy="50%"
            r="25%"
            fill="#2f45c5"
          />
        </svg>
      </div>
      <div className="logo-play">
        <img src={Logo} alt="hello" width="200px" />
      </div>
    </div>
  );
};

export default Play;
