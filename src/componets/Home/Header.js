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
      <div className="row m-3">
        <div className="col-1 mt-3">
          <a href="./home">
            <i className="fa fa-arrow-left "></i>
          </a>
        </div>
        <div className="col-4 offset-5">
          Welcome,
          <span>
            <br />
            <h3>{props.username}</h3>
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
              <img src={avatar} alt="" width="50px" />
            </div>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" href="./profile">
                Profile
              </a>
              <div className="dropdown-item" onClick={logOut}>
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
