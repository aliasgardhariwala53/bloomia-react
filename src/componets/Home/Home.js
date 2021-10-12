import React, { useState, useEffect } from "react";
import Play from "./Play";
import Profile from "./Profile";
import Header from "./Header";
import { Route, useRouteMatch } from "react-router-dom";

import GuardedRoute from '../Auth/GuardedRoute';
import "./Home.css";
import Settings from "./settings";

const Home = (props) => {
  console.log("auth in home",props.profileView);
  const [userdata, setUserdata] = useState({
    first_name: "",
    last_name: "",
    profileImage: "",
  });

  const changeusername = (change) => {
    setUserdata(change);
  };
 
  const [passtime, setPasstime] = useState("");
  const submitFormHandler = (...value) => {
    setPasstime(...value);
    return value;
  };
  // console.log(passtime);

  let { path } = useRouteMatch();
  return (
    <div className="container-fluid home-container p-0">
      <div className="row m-0 p-0">
        <div className="col-8 m-0 p-0">
          <Play time={passtime} />
        </div>
        <div className="col-4 m-0 p-0 action-container">
          <Header username={userdata} onloggedincheck={props.profileView}/>
        
          <GuardedRoute path={`${path}/profile`} component={Profile} authVerify={changeusername} auth={!props.profileView} />
          {/* <Route path={`${path}/profile`}>
            <Profile onchangheaderuser={changeusername} />
          </Route> */}
          <Route exact path={`${path}`}>
            <Settings
              selected={submitFormHandler}
              onSubmitForm={submitFormHandler}
            />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default Home;
