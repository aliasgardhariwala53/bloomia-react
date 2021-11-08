import React, { useState, useEffect } from "react";
import Play from "./Play";
import Profile from "./Profile";
import Header from "./Header";
import { Route, useRouteMatch } from "react-router-dom";
import { handleError, HttpCall } from "../../services/UseHttps";
import { GetUserUrl } from "../../services/Network";
import GuardedRoute from "../Auth/GuardedRoute";
import "./Home.css";
import Settings from "./settings";

import { getGoalData } from "../../services/Network";
const Home = (props) => {
  const [passtime, setPasstime] = useState({});
  const [setchange, setSetschanges] = useState();
  const [totaltask, settotaltask] = useState();
  useEffect(() => {
    HttpCall(`${GetUserUrl}`, "GET")
      .then((response) => {
        setUserdata(response.data.data);
        console.log(response,"response aiiiiiiiiiiiiiii  profile ");
      })
      .catch((error) => {
        if (error.response.status===401) {
          localStorage.removeItem("token");
          window.location.assign("../login");
        }
        handleError(error);
      });
  }, []);

  useEffect(() => {
    HttpCall(`${getGoalData}`,"GET")
      .then((response) => {
        // setTotalsettime(response)
        console.log("helloooooooooooooo response from set golass",response.data.data[0].set);
        settotaltask(response.data.data[0].set)
      })
      .catch((error) => {
        
      });
  }, [setchange]);
  // console.log("auth in home",props.profileView);
  const [userdata, setUserdata] = useState({
    first_name: "",
    last_name: "",
    profileImage: "",
    totalGoalTime:"",
  });

  const changeusername = (change) => {
    setUserdata(change);
  };


  const submitFormHandler = (value) => {
    setPasstime(value);
    return value;
  };
  const setchangeHandler = (value) => {
    setSetschanges(value)
  };
  // console.log(passtime);

  return (
    <div className="container-fluid home-container p-0">
      <div className="row m-0 p-0">
        <div className="col-8  m-0 p-0 video-overflow">
          <Play time={passtime} time2={passtime} totaltask={totaltask} />
        </div>
        <div className="col-4  m-0 p-0 action-container" >
          <Header username={userdata} />

          <GuardedRoute
            path="/profile"
            component={Profile}
            authVerify={changeusername}
          />

          <Route exact path="/">
            <Settings
              selected={submitFormHandler}
              onSubmitForm={submitFormHandler}
              setchange={setchangeHandler}
            />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default Home;
