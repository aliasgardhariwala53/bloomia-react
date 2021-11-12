import React from "react";
import './PremiumPlan.css'
const PremiumPlan = () => {
  return (
    <div>
      <div className="px-3 ">
        <div className="h5 m-0 mb-3">
          Upgrade Your Plan
        </div>
        <div className="upgrade-plan bg-blue text-light p-3">
          <div className="h5 mb-3">
            Premium Plan
          </div>
          <p className="font-weight-bold">
            Bloomia Premium will allow you to:
          </p>
          <ul >
            <li >Set workout goals</li>
            <li >Remember prior workouts</li>
            <li >See graphs/stats of your workouts</li>
            <li >Receive email reminders</li>
          </ul>
          <p >
            Being a premium subscriber is a way to help support Bloomia and to
            commit to your goals!
          </p>
          <div className="row m-0 mb-3 align-items-end">
            <span className="font-weight-bolder pr-0 h1 col-4 plan-price">
              $5.00
            </span>
            <span className="font-weight-bolder pl-0 h2 col-6 plan-time">
              /Month
            </span>
          </div>
          <span
            
           className="subscribeButton text-center px-4 py-2 text-dark mt-3"
          >
            Subscribe
          </span>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlan;
