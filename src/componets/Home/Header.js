import { fas } from "@fortawesome/free-solid-svg-icons";
import {React,useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import "./Header.css";

const Header = (props) => { 
  const context = useContext(AuthContext)
  
  const logOut = () => {
    localStorage.removeItem("token");
    context.isAutheticated= false;
    window.location.assign("../login");
  };
  
  return (
    
    <div className="container header-container">
      
      { !context.isAutheticated && <div className="row mt-3 ml-3 mr-3">
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
      { context.isAutheticated && <div className="row mt-3 ml-3 mr-3">
        <div className="col-9 mt-3 backbutton text-right pr-0">
     { window.location.href==="http://localhost:3000/profile"  &&   <Link to="/">
              <i className="fa fa-arrow-left float-left "></i>
            </Link>}
         
          Welcome,
          <span>
            <br />

            <h4>
              {props.username.first_name + " " + props.username.last_name ||
                "avatar"}
            </h4>
          </span>
        </div>
        <div className="col-3 px-0">
          <div className="dropdown show px-0">
            <div
              className="btn  dropdown-toggle px-0"
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
