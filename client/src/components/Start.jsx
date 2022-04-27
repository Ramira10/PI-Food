import React, { Component } from "react";
import video from "./Styles/Video.mp4"
// import img from "./Styles/Start.jpg"
import plato from "./Styles/Plato.png"
import style from "./Styles/Start.module.css"
import { Link } from "react-router-dom"

export default class Start extends Component {

    render() {
        return (
            <div>
                <div>
                    <video className={style.video} autoPlay loop muted>
                        <source src={video} type='video/mp4'></source>
                    </video>
                    {/* <img className={style.video} src={img} alt='Img NOT FOUND'></img> */}
                    <div className={style.overlay}></div>
                    <div className={style.absolute}>
                        <h1 className={style.text}> PI Food </h1>
                    </div>
                    <div>
                        <Link to='/home'>
                            <img className={style.imag} src={plato} alt="Platito"></img>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}

