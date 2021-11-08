import {React,useContext } from 'react';
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../store/auth-context";

const GuardedRoute = ({ component: Component,authVerify, ...rest }) => {
    const context = useContext(AuthContext)
   
// console.log("auth:9587878758718787" ,context)
    return(
        <Route {...rest} render={(props) => (
            context.isAutheticated 
                ? <Component {...props} onchangheaderuser={authVerify}/>
                : <Redirect to='/' />
        )} />
    )
}

export default GuardedRoute;

//redux example 
// import {React,useContext } from 'react';
// import { Route, Redirect } from "react-router-dom";
// // import AuthContext from "../../store/auth-context";
// import { useSelector } from 'react-redux';
// const GuardedRoute = ({ component: Component,authVerify, ...rest }) => {
//     const auth = useSelector(state => state.auth.auth)
//     // const context = useContext(AuthContext)
   
// // console.log("auth:9587878758718787" ,context)
//     return(
//         <Route {...rest} render={(props) => (
//             auth
//                 ? <Component {...props} onchangheaderuser={authVerify}/>
//                 : <Redirect to='/' />
//         )} />
//     )
// }

// export default GuardedRoute;