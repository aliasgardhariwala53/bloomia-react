import React, { useState } from "react";
import "./App.css";
import Signup from "./componets/Auth/Signup";
import Login from "./componets/Auth/Login";
import Forgetpassword from "./componets/Auth/Forgetpassword";
import Resetpassword from "./componets/Auth/Resetpassword";
// import { GuardProvider, GuardedRoute } from 'react-router-guards';
import Home from "./componets/Home/Home";

import AuthContext from "./store/auth-context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  
  const token = localStorage.getItem("token");
  const [isAutheticated, setisAutheticated] = useState(token);

 

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login authcheck={setisAutheticated} />
          </Route>
          <Route path="/sign-up">
            <Signup />
          </Route>
          <Route path="/Forgetpassword">
            <Forgetpassword />
          </Route>
          <Route path={"/Resetpassword/:id"}>
          <Resetpassword/>
          </Route>
          
          <AuthContext.Provider value={{
            isAutheticated:isAutheticated
          }}>
            <Route path="/">
              <Home  />
            </Route>
          </AuthContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
