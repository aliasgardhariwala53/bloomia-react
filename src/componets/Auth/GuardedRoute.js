import {React ,useState} from 'react';
import { Route, Redirect } from "react-router-dom";


const GuardedRoute = ({ component: Component,authVerify, auth, ...rest }) => {
const [authrization, setauthrization] = useState(false)
   
// console.log("auth:" + auth)
    return(
        <Route {...rest} render={(props) => (
            auth === authrization
                ? <Component {...props} onchangheaderuser={authVerify}/>
                : <Redirect to='/home' />
        )} />
    )
}

export default GuardedRoute;