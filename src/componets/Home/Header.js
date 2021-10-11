import React from "react";
import avatar from "../../assets/avatar.jpg";
import "./Header.css";

const Header = (props) => {
  const logOut = () => {
    localStorage.removeItem('token');
    window.location.assign('./login');

 }
  return (
    <div className="container header-container">
      <div className="row mt-3 ml-3 mr-3">
        <div className="col-1 mt-3 backbutton">
          <a href="./home">
            <i className="fa fa-arrow-left "></i>
          </a>
        </div>
        <div className="col-5 offset-4 text-right">
          Welcome,
          <span>
            <br />
           
            <h4>{(props.username.first_name +" " +props.username.last_name)|| "avatar"}</h4>
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
              <img src={"https://bloomia.herokuapp.com/" + props.username.profileImage} alt="" width="50px" className="rounded-circle"/>
            </div>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" href="/profile">
                <i className="far fa-user-circle">  </i>
                 Profile
              </a>
              <div className="dropdown-item" onClick={logOut}>
              <i className="fas fa-sign-out-alt"></i>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
