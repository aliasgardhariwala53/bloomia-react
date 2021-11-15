import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { putEmailReminderUrl } from "../../services/Network";
import { HttpCall } from "../../services/UseHttps";
import { emailActions } from "../../store";
import useAvoidFirstExecution from '../../CustomHooks/useAvoidFirstExecution'
import "./EmailNotification.css";
const EmailNotification = () => {
const dispatch = useDispatch()
const showEmail = useSelector(state => state.email.email);
const reminderTime = useSelector(state => state.email.time);
console.log("show email  ",JSON.stringify(showEmail),"showEmailshowEmailshowEmailshowEmailshowEmail");
console.log("show email  ",reminderTime,"initialEmailStateinitialEmailStateinitialEmailState");
const [emaildata, setEmaildata] = useState({
  subject:"testing email",
  text:"hello user",
  timezone:"Asia/Kolkata",
  reminderTime:reminderTime,
  dailyReminder:JSON.stringify(showEmail)
})

useAvoidFirstExecution(() => {
  HttpCall(`${putEmailReminderUrl}`, "PUT", emaildata)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {});
 }, [emaildata])
    
    
  
  return (
    <div className="py-3 border-top border-bottom m-3 ">
      <div className="row m-0 align-items-center my-2">
        <span className="h5 m-0 pl-0 w-auto">Email Reminder</span>
        <span className="ml-auto w-auto position-relative top-1">
          <div className=" form-check form-switch">
            <input
              className="form-check-input mt-1"
              type="checkbox"
              id="flexSwitchCheckDefault"
             
              onClick={()=>dispatch(emailActions.emailHandler(!showEmail))}
              onChange={()=>setEmaildata({
                ...emaildata,
                reminderTime,
                dailyReminder:JSON.stringify(!showEmail),
              })}
              checked={showEmail}
            />
          </div>
        </span>
      </div>

    { showEmail && <><div className="mb-2 text-left">
        Set a time to receive email reminders for your Kegel workout. Bloomia
        will email you if workout has not been completed by your desired time.
        The timezone is your local time
      </div>
      <div className="row m-0 ">
        <div className="col-sm-6 col-12 pl-0">
          <input
            type="time"
            style={{background:"#ebebeb"}}
            id=""
            defaultValue={reminderTime}
            className="timeSlot form-control "
            onChange={(e)=>setEmaildata({
              ...emaildata,
              reminderTime:e.target.value,
            })}
            // onSubmit={EmailApiHandler}
          />

          
        </div>
      </div></>
      }
    </div>
  );
};

export default EmailNotification;
