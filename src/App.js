import React, { useState } from 'react';

import './App.css';
import Signup from './componets/Auth/Signup';
import Login from './componets/Auth/Login';
import Forgetpassword from './componets/Auth/Forgetpassword';
import Resetpassword from './componets/Auth/Resetpassword';
// import { GuardProvider, GuardedRoute } from 'react-router-guards';
import Home from './componets/Home/Home';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  const[isAutheticated, setisAutheticated] = useState(false);

  console.log("auth is ......",isAutheticated);
  return (
    <div className="App">
    <Router>
    <Switch>
         <Route path="/login">
          <Login  authcheck={setisAutheticated}/>
        </Route>
        <Route path="/sign-up">
          <Signup/>
        </Route> 
        <Route path="/home">
          <Home profileView={isAutheticated}/>
          </Route>
         
          <Route path="/Forgetpassword">
          <Forgetpassword/>
        </Route>
         <Route path={"/Resetpassword/:id"}>
          <Resetpassword/>
        </Route>
   {/* {/* <Switch>
        <Route exact path='/home' component={Home}/>
        <Route path='/sign-up' component={Signup} />
        <Route path='/Forgetpassword' component={Forgetpassword} />
      <Route path={"/Resetpassword/:id"} component={Resetpassword} /> */}

      
      </Switch> 
    </Router>
    </div>
  );
}

export default App;
