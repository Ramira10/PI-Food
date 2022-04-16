import React from "react";
import style from "./Styles/Recipe.module.css"
import { Link } from 'react-router-dom';



let prevId = 1;

export default function Recipe(props) {
    const { name, image, diets, id } = props;


    return (
        <div className={style.general}>


            <Link to={`/home/${id}`}>
                <img className={style.img} src={image} alt="Not Found."></img>
            </Link>


            <h1 className={style.name}>{name}</h1>

        {diets.length ?
            <div>
                <h3>Types of diets: </h3>
            {
                diets.map(d => {
                    return (
                        <h5 key={prevId++}>- {d.charAt(0).toUpperCase() + d.slice(1)} </h5>
                        )
                    })
                }
                </div> :
                <h5>It does not have a defined type of diet.</h5>
            }

        </div>
    )
}