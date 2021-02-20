import React, { Component } from 'react';
import wifiImage from "../images/wifi.png"


class NoInternet extends Component {
    render() {
        return (
            <div className="no-internet">
               <img src={wifiImage} alt="Logo" />
               <br></br>
               <h3 style={{textAlign: 'center'}}>Kindly check your internet connection <span>&#128542;</span></h3>
            </div>
            );
    }
}

export default NoInternet;