import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { putEmailReminderUrl } from "../../services/Network";
import { HttpCall } from "../../services/UseHttps";
import { emailActions } from "../../store";
import "./EmailNotification.css";
const EmailNotification = () => {
const dispatch = useDispatch()
const showEmail = useSelector(state => state.email.email)
const [emaildata, setEmaildata] = useState({
  subject:"testing email",
  text:"hello user",
  timezone:"Asia/Kolkata",
  reminderTime:"00:00",
  dailyReminder:showEmail,
})
 useEffect(() => {
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
                dailyReminder:!emaildata.dailyReminder,
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
