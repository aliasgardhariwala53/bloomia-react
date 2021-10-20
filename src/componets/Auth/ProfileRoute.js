import {React ,useState} from 'react';
import { Route, Redirect } from "react-router-dom";


const ProfileRoute = ({ component: Component,authVerify, auth, ...rest }) => {
const [authrization, setauthrization] = useState(false)
    const onhandlecheck=(value)=>{
        setauthrization(value);
        authVerify(value)
    }
// console.log("auth:" + auth)
    return(
        <Route {...rest} render={(props) => (
            auth === authrization
                ? <Component {...props} onchangheaderuser={authVerify}/>
                : <Redirect to='/home/profile' />
        )} />
    )
}

export default ProfileRoute;