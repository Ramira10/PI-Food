import React from "react";
import style from "./Styles/Recipe.module.css"
import { Link } from 'react-router-dom';

let prevId = 1;

export default function Recipe(props) {
    const { name, image, diets, id } = props;


    return (
        <div className={style.general}>


            <Link to={`/home/${id}`}>
                {
                    image ?  <img className={style.img} src={image} alt="Img Not Found."></img>
                    :
                    <img className={style.img} src={"https://agencias.assist1.com.co/assets/images/no-image.png"} alt="Img Not Found."></img>
                }
            </Link>


            <h1 className={style.name}>{name}</h1>


            <div>
                <h3>Types of diets: </h3>
                {
                    diets?.map(d => {
                        if(d.hasOwnProperty('name')) {
                            return (
                                <p key={prevId++}>- {d.name[0].toUpperCase() + d.name.slice(1)} </p>
                            )
                        } else {
                            return (
                                <p key={prevId++}>- {d[0].toUpperCase() + d.slice(1)} </p>
                            )
                        }
                    })
                }
            </div>

            </div>
        )
};