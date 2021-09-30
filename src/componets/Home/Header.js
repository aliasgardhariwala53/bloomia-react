import React from "react";
import avatar from "../../assets/avatar.jpg";
import "./Header.css";

const Header = () => {
  return (
    <div className="container header-container">
      <div className="row">
        <div className="col-1 mt-3">
          <a href="./home">
            <i className="fa fa-arrow-left "></i>
          </a>
        </div>
        <div className="col-3 offset-6">
          Welcome,
          <span>
            <br />
            <h3>Username</h3>
          </span>
        </div>
        <div className="col-2">
          <div class="dropdown show">
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
              <a className="dropdown-item" href="./home">
                Profile
              </a>
              <a className="dropdown-item" href="./Profile.js">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
