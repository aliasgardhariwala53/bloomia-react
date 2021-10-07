import React,{ useState,useEffect} from "react";
import Play from "./Play";
import Profile from "./Profile"
import Header from "./Header";
import { handleError, HttpCallGet } from "../../services/UseHttps";
import { GetUserUrl } from "../../services/Network";

import "./Home.css";
import Settings from "./settings";

const Home = () => {
  const [userdata, setUserdata] = useState()

  const changeusername=(change)=>{
    setUserdata(change)
  }
  const [passtime, setPasstime] = useState("")
  const submitFormHandler = (...value) => {
   
    setPasstime(...value)
    return value
  };
  // console.log(passtime);
  
 
  return (
    <div className="container-fluid home-container p-0">
      <div className="row m-0 p-0">
        <div className="col-8 m-0 p-0">
            
          <Play time={passtime}/>
        </div>
        <div className="col-4 m-0 p-0 action-container">
        <Header username={userdata}/>
        {/* <h1>{userdata.first_name}</h1> */}
          <Profile onchangheaderuser={changeusername} />
          {/* <Settings selected={submitFormHandler}
          
          onSubmitForm={submitFormHandler}
          />
         */}
        </div>
      </div>
    </div>
  );
};

export default Home;
