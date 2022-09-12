import React, { useState, useEffect } from 'react';
import '../styles/HomeScreen.css';
import { useLongPress } from 'use-long-press';
import {FaPaperPlane, FaUser} from 'react-icons/fa'
import { Map, Marker } from "pigeon-maps"



const HomeScreen = (props) => {
    

    var textAreas = document.getElementsByTagName('textarea');


    Array.prototype.forEach.call(textAreas, function(elem) {
        elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });

    const [Animate, setAnimate] = useState(false);
    const [Position, setPosition] = useState({
        latitude: 22.572,
        longitude: 88.363,
    })

    useEffect(() => {
        return () => {
          if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                });
          } else {
              alert("GEOLOCATION NOT SUPPORTED BY YOUR BROWSER 😞!")
          }
        };
    }, [])

    const callback = React.useCallback(() => {
        console.log("Long pressed!");
    }, []);


    const bind = useLongPress(callback, {
      onStart: () => setAnimate(true),
      onFinish: () => setAnimate(false),
      onCancel: () => setAnimate(false),
      threshold: 400,
      captureEvent: true,
      cancelOnMovement: false,
    });



    return(
        <div id="home">
            <div className="profile_area">
                
            </div>
            <div className="content_main">
            <Map height="100%" defaultCenter={[Position.latitude, Position.longitude]} defaultZoom={5}>
                <Marker width={30} anchor={[Position.latitude, Position.longitude]} />
            </Map>
            </div>
            <div className="form_area">
                <div className="form_box">
                    <div className='form_lead'>Customize Your Message</div>

                    <textarea placeholder='YOUR CUSTOM MESSAGE GOES HERE... \n\nBY DEFAULT WE WILL SEND A DISTRESS EMAIL TO YOUR MAIL LIST WITH YOUR 🌏LOCATION AND 📞CONTACT NUMBER. IF YOU WANT TO ADD SOME MESSAGE, THEN TYPE IT HERE.' className='form_input'></textarea>
                </div>
                <div className="form_buttons">
                    <div className="button_left"><FaUser /></div>
                    <div className={Animate === true ? "form_button__container animate" : "form_button__container"}>
                        <button className="animated_button" {...bind()}>
                            <FaPaperPlane />
                        </button>
                    </div>
                    <div className="button_right"><FaUser /></div>
                </div>
            </div>
        </div>
    );
}


export default HomeScreen;