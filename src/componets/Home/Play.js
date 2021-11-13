import React, { useState, useEffect, useRef } from "react";
import "./Play.css";
import LightMode from "../../video/LightMode.mp4";
import DarkMode from "../../video/Dark Mode.mp4";
import ProgressBar from "./ProgressBar";
import { useSelector } from 'react-redux'
import { HttpCall } from "../../services/UseHttps";
import { updateReportUrl ,getReportDateUrl} from "../../services/Network";
import CalendarModal from "./CalendarModal";
import BloomiaLogo from "../../assets/BloomiaLogo";
const Play = (props) => {
  const Theme = useSelector(state => state.modal.theme)
  const [newTime, setnewTime] = useState({});
  const [leftTime, setLeftTime] = useState({});
  const [setDone, setsetDone] = useState(0);
  const [taskdone, settaskdone] = useState(props.taskdone);
  const [saveProgress, setsaveProgress] = useState({
    setTime:0,
    setCount:0
})
  const settingTime = {
    a1: props.time.a1,
    a2: props.time.a2,
    a3: props.time.a3,
    b1: props.time.b1,
    b2: props.time.b2,
    c1: props.time.c1,
    c2: props.time.c2,
    c3: props.time.c3,
    b3: props.time.b3,
  };
  console.log("settingTimesettingTimesettingTimesettingTime", settingTime);

  useEffect(() => {
    HttpCall(`${getReportDateUrl}`,"POST", date)
    .then((response) => {
      console.log("geeeeeeeeeeeeeeeeetttttttttttttt report",response.data.sucess);
      if (response.data.sucess===true) {
        setsaveProgress((previous)=>{
          return {...previous,setTime:response.data.data[0].setTime,setCount:response.data.data[0].setCount}
        })
      }

    })
    .catch((error) => {
      // handleError(error);
    });
  }, [])



  useEffect(() => {
    setLeftTime(settingTime);
    setnewTime(settingTime);
  }, [props.time,taskdone]);


  let TotalSetTime =((settingTime.a1+settingTime.a2)*settingTime.a3+(settingTime.b1+settingTime.b2)*settingTime.b3)
  // // const [totaltask, settotaltask] = useState();
  useEffect(() => {
    setTimeout(() => {
      
      HttpCall(`${updateReportUrl}`,"PUT", saveProgress)
      .then((response) => {})
      .catch((error) => {
        // handleError(error);
      });
    }, 1000);
    
  }, [saveProgress])

  const date={
    creatTime:new Date().toISOString().slice(0, 10)
  }
  


  const [resumebutton, setResumebutton] = useState(0);
  const [Squeeze, setSqueeze] = useState(0);
  console.log("newwwwwwwwwwwwwwwwwwwwwwwwwwwww", leftTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const incrementa1 = useRef(null);
  const incrementa2 = useRef(null);
  const incrementb1 = useRef(null);
  const incrementb2 = useRef(null);
  const settimeouta1 = useRef(null);
  const settimeouta2 = useRef(null);
  const settimeoutb1 = useRef(null);
  const settimeoutb2 = useRef(null);

  let i = newTime.a3;
  let j = newTime.b3;
  var k = newTime.a1;
  var l = newTime.a2;
  var m = newTime.b1;
  var n = newTime.b2;
  console.log("iiiiiiii", i, j);

  const long = (value) => {
    setResumebutton(1);
    setSqueeze(1);
    l = settingTime.a2;
    console.log("new new vaaaaaaaaaallmmmmmmmmm new new ", value);
    clearInterval(settimeouta2.current);
    console.log("entered long");

    document.getElementById(
      "shape"
    ).style.animationDuration = `${settingTime.a1}s`;
    document.getElementById("shape").classList.remove("shape-two");
    document.getElementById("shape").classList.add("shape-one");

    incrementa1.current = setInterval(() => {
      setLeftTime((previous) => {
        if (previous.a1 < 1) {
          return { ...previous, a1: settingTime.a1 };
        }
        return {
          ...previous,
          a1: previous.a1 - 1,
        };
      });
    }, 1000);

    settimeouta1.current = setTimeout(() => {
      clearInterval(incrementa1.current);
      console.log("settimeout cleared long");
      Restlong(value);
    }, k * 1000);
  };

  const Restlong = (value) => {
    setResumebutton(2);
    setSqueeze(2);
    clearInterval(settimeouta1.current);
    k = 0;

    console.log("entered Rest");
    document.getElementById(
      "shape"
    ).style.animationDuration = `${settingTime.a2}s`;
    document.getElementById("shape").classList.remove("shape-one");
    document.getElementById("shape").classList.add("shape-two");
    incrementa2.current = setInterval(() => {
      setLeftTime((previous) => {
        if (previous.a2 < 1) {
          return { ...previous, a2: settingTime.a2 };
        }
        return {
          ...previous,
          a2: previous.a2 - 1,
        };
      });
    }, 1000);

    //reps decrease

    settimeouta2.current = setTimeout(() => {
      k = settingTime.a1;
      clearInterval(incrementa2.current);
      --i;

      console.log("settimeout cleared longrest");

      setLeftTime((previous) => {
        return {
          ...previous,
          a3: previous.a3 - 1,
        };
      });
      console.log("leftTime.a3", leftTime.a3);
      if (i === 0) {
        short(value);
        return;
      } else {
        long(value);
      }
    }, l * 1000);
  };

  const short = (value) => {
    setResumebutton(3);
    setSqueeze(3);
    n = settingTime.b2;
    clearInterval(settimeouta2.current); // when call from rest long first time
    clearInterval(settimeoutb2.current); //when call from rest short
    setSqueeze(3);
    console.log("entered short");
    document.getElementById(
      "shape"
    ).style.animationDuration = `${settingTime.b1}s`;
    document.getElementById(
      "innercircle"
    ).style.animationDuration = `${settingTime.b1}s`;
    document.getElementById("shape").classList.remove("shape-two");
    document.getElementById("shape").classList.add("shape-one");
    document.getElementById("innercircle").classList.add("innercircle-two");

    incrementb1.current = setInterval(() => {
      setLeftTime((previous) => {
        if (previous.b1 < 1) {
          return { ...previous, b1: settingTime.b1 };
        }
        return {
          ...previous,
          b1: previous.b1 - 1,
        };
      });
    }, 1000);

    settimeoutb1.current = setTimeout(() => {
      clearInterval(incrementb1.current);
      console.log("settimeout cleared RestShort");
      Restshort(value);
    }, m * 1000);
  };

  const Restshort = (value) => {
    setResumebutton(4);
    setSqueeze(4);
    m = 0;
    clearInterval(settimeoutb1.current);
    console.log("entered RestShort");
    document.getElementById(
      "shape"
    ).style.animationDuration = `${settingTime.b2}s`;
    document.getElementById(
      "innercircle"
    ).style.animationDuration = `${settingTime.b2}s`;
    document.getElementById("shape").classList.remove("shape-one");
    document.getElementById("shape").classList.add("shape-two");
    document.getElementById("innercircle").classList.add("innercircle-two");
    incrementb2.current = setInterval(() => {
      setLeftTime((previous) => {
        if (previous.b2 < 1) {
          return { ...previous, b2: settingTime.b2 };
        }
        return {
          ...previous,
          b2: previous.b2 - 1,
        };
      });
    }, 1000);

    settimeoutb2.current = setTimeout(() => {
      m = settingTime.b1;
      clearInterval(incrementb2.current);
      --j;
      console.log("settimeout cleared Short");
      setLeftTime((previous) => {
        return {
          ...previous,
          b3: previous.b3 - 1,
        };
      });

      if (j === 0) {
        document.getElementById("shape").style.animationDuration = `${0}s`;
        document.getElementById(
          "innercircle"
        ).style.animationDuration = `${0}s`;
        clearInterval(settimeoutb2.current);
        handleReset()
        setIsActive(false);
        setIsPaused(false);
        settaskdone(taskdone+1)
        setsetDone(setDone+1)    
        setSqueeze(0);
        setsaveProgress((previous)=>{
          return {...previous,setTime:previous.setTime+TotalSetTime,setCount:previous.setCount+1}
        })
      } else {
        short(value);
      }
    }, n * 1000);
  };
  const handleStart = () => {
    console.log("start ke andar",settingTime);
    long(settingTime);
    setIsActive(true);
    setIsPaused(true);
  };

  const handlePause = () => {
    document.getElementById("shape").style.animationPlayState = "paused";
    document.getElementById("innercircle").style.animationPlayState = "paused";
    clearInterval(incrementa1.current);
    clearInterval(incrementa2.current);
    clearInterval(incrementb1.current);
    clearInterval(incrementb2.current);
    clearInterval(settimeouta1.current);
    clearInterval(settimeouta2.current);
    clearInterval(settimeoutb1.current);
    clearInterval(settimeoutb2.current);
    setnewTime(leftTime);
    setIsPaused(false);
  };

  const handleResume1 = () => {
    document.getElementById("shape").style.animationPlayState = "running";
    document.getElementById("innercircle").style.animationPlayState = "running";
    long(newTime);
    setIsPaused(true);
  };
  const handleResume2 = () => {
    document.getElementById("shape").style.animationPlayState = "running";
    document.getElementById("innercircle").style.animationPlayState = "running";
    Restlong(newTime);
    setIsPaused(true);
  };
  const handleResume3 = () => {
    document.getElementById("shape").style.animationPlayState = "running";
    document.getElementById("innercircle").style.animationPlayState = "running";
    short(newTime);
    setIsPaused(true);
  };
  const handleResume4 = () => {
    document.getElementById("shape").style.animationPlayState = "running";
    document.getElementById("innercircle").style.animationPlayState = "running";
    Restshort(newTime);
    setIsPaused(true);
  };

  const handleReset = () => {
    document.getElementById("shape").style.animationDuration = `${0}s`;
    document.getElementById("innercircle").style.animationDuration = `${0}s`;
    document.getElementById("shape").classList.remove("shape-one");
    document.getElementById("shape").classList.remove("shape-two");

    document.getElementById("innercircle").classList.remove("innercircle-two");
    setLeftTime(settingTime);
    setnewTime(settingTime);
    clearInterval(incrementa1.current);
    clearInterval(incrementa2.current);
    clearInterval(incrementb1.current);
    clearInterval(incrementb2.current);
    clearInterval(settimeouta1.current);
    clearInterval(settimeouta2.current);
    clearInterval(settimeoutb1.current);
    clearInterval(settimeoutb2.current);
    setIsActive(false);
    setIsPaused(false);
    setSqueeze(0);
  };

  return (
    <>
      {/* <CompleteGoalNotify/> */}
      <div className="play-container">
    {Theme && <video autoPlay loop muted id="myVideo">
          <source src={LightMode} type="video/mp4" />
          Your browser does not support HTML 5 video.
        </video> }
    { !Theme &&   <video autoPlay loop muted id="myVideo">
          <source src={DarkMode} type="video/mp4" />
          Your browser does not support HTML 5 video.
        </video>}
        <div className="timer" id="demo">
          {Squeeze === 1 && <div>{leftTime.a1}s</div>}
          {Squeeze === 2 && <div>{leftTime.a2}s</div>}
          {Squeeze === 3 && <div>{leftTime.b1}s</div>}
          {Squeeze === 4 && <div>{leftTime.b2}s</div>}
        </div>
        <div className="display-time">
          <div className="play-button">
            {!isActive && !isPaused ? (
              <i
                id="play-icon"
                onClick={handleStart}
                className="fas fa-play text-light"
              ></i>
            ) : isPaused ? (
              <i
                id="paused-icon"
                onClick={handlePause}
                className="fas fa-pause text-light"
              ></i>
            ) : resumebutton === 1 ? (
              <i
                id="play-icon"
                onClick={handleResume1}
                className="fas fa-play text-light"
              ></i>
            ) : resumebutton === 2 ? (
              <i
                id="play-icon"
                onClick={handleResume2}
                className="fas fa-play text-light"
              ></i>
            ) : resumebutton === 3 ? (
              <i
                id="play-icon"
                onClick={handleResume3}
                className="fas fa-play text-light"
              ></i>
            ) : (
              <i
                id="play-icon"
                onClick={handleResume4}
                className="fas fa-play text-light"
              ></i>
            )}
          </div>
          {Squeeze === 1 && <div className="timer-type">Long Squeeze</div>}
          {Squeeze === 2 && (
            <div className="timer-type " style={{ padding: "0 37px" }}>
              Rest
            </div>
          )}
          {Squeeze === 3 && <div className="timer-type">Short Squeeze</div>}
          {Squeeze === 4 && (
            <div className="timer-type " style={{ padding: "0 37px" }}>
              Rest
            </div>
          )}
          <svg
            className="button svgcircle"
            expanded="true"
            height="500px"
            
          >
            <circle
              id="shape"
              strokeLinecap="round"
              strokeDasharray="1256"
              animationDelay="0"
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
        <div className="start-over-section">
          {isActive && (
            <button
              className="start-over btn bg-pink text-light rounded-xl btn-sm "
              onClick={handleReset}
            >
              START OVER
            </button>
          )}
          {isActive && (
            <div className="Reps-count text-light h5 mt-1">
              {Squeeze === 1 &&
                `${leftTime.a3} Reps more to go of Long Squeeze`}
              {Squeeze === 2 &&
                `${leftTime.a3} Reps more to go of Long Squeeze`}
              {Squeeze === 3 &&
                `${leftTime.b3} Reps more to go of Short Squeeze`}
              {Squeeze === 4 &&
                `${leftTime.b3} Reps more to go of  Short Squeeze`}
            </div>
          )}
        </div>

        <div className="logo-play">
          <BloomiaLogo/>
        </div>
      </div>
      <ProgressBar taskdone={saveProgress.setTime} totalGoaltime={props.totalGoaltime} />
      <CalendarModal/>
    </>
  );
};

export default Play;
