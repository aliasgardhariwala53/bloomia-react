import React from 'react'
import './Play.css';
import Logo from "../../assets/images/Logov1.png";
import LightMode from '../../video/LightMode.mp4'



const Play = () => {
    return (
        <div className="play-container">
            <video autoPlay loop muted controls id="myVideo">
                <source src={LightMode} type="video/mp4"/>
                    Your browser does not support HTML5 video.
                    </video>
           <div className="logo-play">
             <img src={Logo} alt="hello" width="200px" />
           </div>
        </div>
    )
}

export default Play
