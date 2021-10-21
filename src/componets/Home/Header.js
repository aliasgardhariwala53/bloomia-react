import {React} from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = (props) => { 
  
  const logOut = () => {
    localStorage.removeItem("token");
    
    window.location.assign("../login");
  };
  return (
    <div className="container header-container">
      
      { !props.onloggedincheck && <div className="row mt-3 ml-3 mr-3">
                <div className="col-3 offset-5 ">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                
                <div className=" signin-header px-2 py-2 text-dark bg-light cursor-pointer  ">
                 
                 Sign in
                </div>
                </Link>
                </div>
        
                <div className="col-3">
                <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                <div className=" signin-header px-2 py-2 text-light  cursor-pointer ">
                 
                 Sign Up
                </div>
                </Link>
                </div>
        
       
      </div>}
      { props.onloggedincheck && <div className="row mt-3 ml-3 mr-3">
      { window.location.href==="http://localhost:3000/profile"  && <div className="col-1 mt-3 backbutton">
            <Link to="/">
              <i className="fa fa-arrow-left "></i>
            </Link>
          </div>}
        <div className="col-5 offset-4 text-right">
          Welcome,
          <span>
            <br />

            <h4>
              {props.username.first_name + " " + props.username.last_name ||
                "avatar"}
            </h4>
          </span>
        </div>
        <div className="col-2">
          <div className="dropdown show">
            <div
              className="btn  dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={
                  "https://bloomia.herokuapp.com/" + props.username.profileImage
                }
                alt=""
                width="50px"
                className="rounded-circle"
              />
            </div>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <div className="dropdown-item">
                  <i className="far fa-user-circle"> </i>
                  Profile
                </div>
              </Link>
              <div className="dropdown-item " style={{cursor: "pointer"}} onClick={logOut}>
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Header;
