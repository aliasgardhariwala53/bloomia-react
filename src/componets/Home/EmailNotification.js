import React from "react";
import "./EmailNotification.css";
const EmailNotification = () => {
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
            />
          </div>
        </span>
      </div>
      <div className="mb-2 text-left">
        Set a time to receive email reminders for your Kegel workout. Bloomia
        will email you if workout has not been completed by your desired time.
        The timezone is your local time
      </div>
      <div className="row m-0 ">
        <div className="col-sm-6 col-12 pl-0">
          <select
            style={{background:"#ebebeb"}}
            id=""
            className="timeSlot form-control "
          >
            <option value="00">00:00 to 01:00</option>
            <option value="01">01:00 to 02:00</option>
            <option value="02">02:00 to 03:00</option>
            <option value="03">03:00 to 04:00</option>
            <option value="04">04:00 to 05:00</option>
            <option value="05">05:00 to 06:00</option>
            <option value="06">06:00 to 07:00</option>
            <option value="07">07:00 to 08:00</option>
            <option value="08">08:00 to 09:00</option>
            <option value="09">09:00 to 10:00</option>
            <option value="10">10:00 to 11:00</option>
            <option value="11">11:00 to 12:00</option>
            <option value="12">12:00 to 13:00</option>
            <option value="13">13:00 to 14:00</option>
            <option value="14">14:00 to 15:00</option>
            <option value="15">15:00 to 16:00</option>
            <option value="16">16:00 to 17:00</option>
            <option value="17">17:00 to 18:00</option>
            <option value="18">18:00 to 19:00</option>
            <option value="19">19:00 to 20:00</option>
            <option value="20">20:00 to 21:00</option>
            <option value="21">21:00 to 22:00</option>
            <option value="22">22:00 to 23:00</option>
            <option value="23">23:00 to 24:00</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmailNotification;
