import React, { useState, useEffect } from "react";
import Play from "./Play";
import Profile from "./Profile";
import Header from "./Header";
import { Route } from "react-router-dom";
import { handleError, HttpCall } from "../../services/UseHttps";
import { GetUserUrl } from "../../services/Network";
import GuardedRoute from "../Auth/GuardedRoute";
import "./Home.css";
import Settings from "./settings";
import Offcanvas from "react-bootstrap/Offcanvas";

import { getGoalData } from "../../services/Network";
import { useDispatch } from "react-redux";
import { emailActions } from "../../store";
const Home = (props) => {
 const dispatch = useDispatch()
  const [passtime, setPasstime] = useState({});
  const [setchange, setSetschanges] = useState();
  const [totalGoaltime, settotalGoaltime] = useState();
  const [showCanvas, setShowCanvas] = useState(false);
  useEffect(() => {
    HttpCall(`${GetUserUrl}`, "GET")
      .then((response) => {
        setUserdata(response.data.data);
        dispatch(emailActions.emailHandler(true))  
        console.log(response, "response aiiiiiiiiiiiiiii  profile ");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          window.location.assign("../login");
        }
        handleError(error);
      });
  }, []);

  useEffect(() => {
    HttpCall(`${getGoalData}`, "GET")
      .then((response) => {
        // setTotalsettime(response)
        console.log(
          "helloooooooooooooo response from set golass",
          response.data.data[0].totalTime
        );
        settotalGoaltime(response.data.data[0].totalTime);
      })
      .catch((error) => {});
  }, [setchange]);
  // console.log("auth in home",props.profileView);
  const [userdata, setUserdata] = useState({
    first_name: "",
    last_name: "",
    profileImage: "",
    totalGoalTime: "",
  });

  const changeusername = (change) => {
    setUserdata(change);
  };

  const submitFormHandler = (value) => {
    
    setPasstime(value);
    return value;
  };
  const setchangeHandler = (value) => {
    setSetschanges(value);
  };
  // console.log(passtime);
  const handleClose = () => setShowCanvas(true);
  const handleShow = () => setShowCanvas(false);
  return (
    <div className="container-fluid home-container p-0">
      <div className="row m-0 p-0">
        <div className="col-12 col-lg-8 m-0 p-0 video-overflow">
          <Play time={passtime}  totalGoaltime={totalGoaltime} />
        </div>
        
        <div className="canvas-button">
        
        <i className="fa fa-bars h1" aria-hidden="true" variant="primary btn" onClick={handleShow} ></i>
        
        </div>
        <Offcanvas className={showCanvas?'cnavas-new':'canvas-new-remove'} show={true}  onHide={handleClose}  {...props} placement="end">
          <Offcanvas.Header closeButton>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
          </Offcanvas.Body>
        </Offcanvas>
        
      </div>
    </div>
  );
};

export default Home;
