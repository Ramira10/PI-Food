import React from "react";
import style from "./Styles/Recipe.module.css"

let prevId = 1;

export default function Recipe(props) {
    const { name, image, diets } = props;


    return (
        <div className={style.general}>
            <img className={style.img} src={image} alt="Not Found."></img>
            
            
          <h1 className={style.name}>{name}</h1>
           

            
            <h3>Types of diets: </h3>
            {
                diets.map(d => {
                    return (
                        <h5 key={prevId++}>- {d} </h5>
                    )
                })
            }
        </div>
    )
}