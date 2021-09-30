
import './App.css';
import Signup from './componets/Auth/Signup';
import Login from './componets/Auth/Login';
import Home from './componets/Home/Home';
import {BrowserRouter,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/sign-up">
          <Signup/>
        </Route> 
         <Route path="/login">
          <Login/>
        </Route>
         <Route path="/home">
          <Home/>
        </Route>

      </BrowserRouter>
    </div>
  );
}

export default App;
