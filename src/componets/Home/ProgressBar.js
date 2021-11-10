import React,{useEffect,useState} from "react";
import { HttpCall } from "../../services/UseHttps";
import { getGoalData } from "../../services/Network";
import "./ProgressBar.css";
import CompleteGoalNotify from "./CompleteGoalNotify";
const ProgressBar = (props) => {
  const [disable, setDisable] = useState(true)
  const HandleNotification=()=>{
    setDisable(false);
  }
  let taskdone =props.taskdone;
  let totaltask =props.totaltask;
 
  const progressPercentage=Math.floor((taskdone/totaltask)*100);
  let i=0;
  if ((progressPercentage%100)===0 && (progressPercentage>100)) {
   i++;
   }
   
  useEffect(() => {
  
    setDisable(true);
   
  }, [props.taskdone])
  return (
    <>
   
    <div className="progress-wrapper text-light">
      <div className="row m-0 justify-content-center w-100 progressBarPosition ng-star-inserted">
        <div className="row m-0 w-75 mb-2">
          <span className="mx-auto">Your Progress</span>
        </div>
        <div className="progress-bar-wrapper p-0">
          <div className="progress w-75 m-auto">
              <div className="progress-bar" style={{width:`${progressPercentage}%`}}>
              </div>
          </div>
          <div className="d-flex w-75 m-auto justify-content-between progress-dots-wrapper">
              <span className="round-bottons progress-dots bg-pink"></span>
              <span className="round-bottons progress-dots bg-pink"></span>
              
          </div>
        </div>
        <div className="mt-2 w-75">
            <div className="text-center">
           { progressPercentage>=100?"Goal Achieved!":`${progressPercentage} % Completed `}
            </div>
        </div>
      </div>
    </div>
 { disable && <CompleteGoalNotify TotalGoalTIme={100} CompletedGoalTime={props.taskdone}  onClick={HandleNotification}/>}
    </>
  );
};

export default ProgressBar;
