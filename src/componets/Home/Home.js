import React from "react";
import Play from "./Play";
import Profile from "./Profile";
import Formtest from "./formtest"

import "./Home.css";

const Home = () => {
  return (
    <div className="container-fluid home-container p-0">
      <div className="row m-0 p-0">
        <div className="col-8 m-0 p-0">
            
          <Play />
        </div>
        <div className="col-4 m-0 p-0 action-container">
          <Formtest />
          <Profile />
        
        </div>
      </div>
    </div>
  );
};

export default Home;
