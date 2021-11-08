import React from "react";
import "./Subscription.css";
const Subscription = () => {
    
  return (
    <div className="mt-4 mx-3 ng-star-inserted">
      <div className="p-3 subscriptionEndDate">
        <div className="row m-0 align-items-center text-left">
          <span className="col-6 p-0">
            <div className="font-weight-600 text-light">Subscribed User</div>
            <div className="text-light resizeForSmall">Valid till </div>
          </span>
          <span className="ml-auto w-auto">
            <span className="subscribeButton text-center px-4 py-2 text-light mt-3 bg-danger">
              Unsubscribe
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
