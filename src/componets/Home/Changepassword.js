import {React,useState} from 'react'
import {HttpCall} from "../../services/UseHttps";
  import {updatePassworurl} from "../../services/Network";
const Changepassword = () => {
    const [errorspassword, setErrorspassword] = useState({});
    // const [editprofile, setEditprofile] = useState(true);
    const [editpassword, seteditpassword] = useState(false);
    // const [call, setcall] = useState(initialState)
    const [userpassword, setUserpassword] = useState({
        newPassword: "",
        password: "",
        confirmpassword: "",
      });
      const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserpassword({ ...userpassword, [name]: value });
        
      };
      const submitFormPassword = (e) => {
        e.preventDefault();
        let errorlogin = {};
        if (!userpassword.newPassword) {
          errorlogin.newPassword = "new password required";
        }
        if (!userpassword.confirmpassword) {
          errorlogin.confirmpassword = "confirm password required";
        }
        if (!(userpassword.confirmpassword === userpassword.newpassword)) {
          errorlogin.matchpassword = "confirm password Does not match";
        }
        if (!userpassword.password) {
          errorlogin.password = "current password required";
        }
    const token = localStorage.getItem("token")
        if (true) {
          setErrorspassword(errorlogin);
          HttpCall(`${updatePassworurl}`,"PUT", userpassword,token)
            .then((response) => {}) 
            .catch((error) => {});
        }
      };
      const enableeditpassword = () => {
        seteditpassword(!editpassword);
        let divs = document.querySelectorAll(".form-control");
        for (var i = 0; i < divs.length; i++) {
          if (editpassword) {
            divs[i].classList.add("mystyle");
          } else {
            divs[i].classList.remove("mystyle");
          }
        }
      };
    return (
        <div>
                      <form className="row mb-5" onSubmit={submitFormPassword}>
              <div className="col-12">
                <hr />

                <h5 className="text-left">Password Settings
                {!editpassword && (
              <div onClick={enableeditpassword} className="ml-auto edit-button ">
                <i className="fa fa-pencil text-light"></i>
              </div>
            )}
            {editpassword && (
              <div onClick={enableeditpassword} className="ml-auto edit-button">
                <i className="fa fa-times text-light" aria-hidden="true"></i>
              </div>
            )}</h5>
              </div>
              <div className="col-12 col-sm-6  form-group ">
                <label htmlFor="exampleInputPassword2">Current Password</label>
                <input
                  type="password"
                  style={{ cursor: "auto" }}
                  className="form-control authinput profile-input"
                  id="exampleInputPassword0"
                  onChange={handleChange}
                  placeholder="Current Password"
                  name="password"
                />
                {errorspassword.password && (
                  <p className="error-messege">Current password is Required</p>
                )}
              </div>
              <div className="d-none d-sm-block col-6 form-group"></div>
              {editpassword &&<><div className="col-12 col-sm-6 form-group ">
                <label htmlFor="exampleInputPassword1">new Password</label>
                <input
                  type="password"
                  style={{ cursor: "auto" }}
                  className="form-control authinput profile-input"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={handleChange}
                  name="newPassword"
                />
                {errorspassword.newPassword && (
                  <p className="error-messege">password is Required</p>
                )}
              </div>

              <div className="col-12 col-sm-6 form-group ">
                <label htmlFor="exampleInputPassword2">confirm Password</label>
                <input
                  type="password"
                  style={{ cursor: "auto" }}
                  className="form-control authinput profile-input"
                  id="exampleInputPassword2"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  name="confirmpassword"
                />
              
                {errorspassword.confirmpassword && (
                  <p className="error-messege">confirm password is Required</p>
                )}
              </div>
              <div className="col-12 col-sm-4 ">
                <button type="submit" className="change-password px-2 py-2">
                change password
                </button>
              </div></>}
            </form>
        </div>
    )
}

export default Changepassword
