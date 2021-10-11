
import './App.css';
import Signup from './componets/Auth/Signup';
import Login from './componets/Auth/Login';
import Forgetpassword from './componets/Auth/Forgetpassword';
import Resetpassword from './componets/Auth/Resetpassword';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import Home from './componets/Home/Home';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { getIsLoggedIn } from 'react-utils';

function App() {
  var url = window.location.href;
  console.log(url);
  // const userid= "6161485af551b10acc001212";
  // console.log(userid);
  const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
      if (getIsLoggedIn()) {
        console.log(getIsLoggedIn());
        next();
      }
      next.redirect('/login');
    } else {
      next();
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
         {/* <Route path="/login">
          <Login/>
        </Route>
        <Route path="/sign-up">
          <Signup/>
        </Route> 
         <Route path="/home">
          <Home/>
        </Route> */}
         {/* <Route path="/Forgetpassword">
          <Forgetpassword/>
        </Route>
         <Route path={"/Resetpassword/:id"}>
          <Resetpassword/>
        </Route> */}
        <GuardProvider guards={[requireLogin]} >
      <Switch>
        <GuardedRoute path="/login" exact component={Login} />
        <GuardedRoute path="/home"  component={Home} meta={{ auth: false }} />
        {/* <GuardedRoute path="/about" exact component={About} meta={{ auth: true }} /> */}
        {/* <GuardedRoute path="*" component={NotFound} /> */}
      </Switch>
    </GuardProvider>

      </BrowserRouter>
    </div>
  );
}

export default App;
