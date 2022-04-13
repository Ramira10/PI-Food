import React from "react";
import style from "./Styles/Recipe.module.css"

let prevId = 1;

export default function Recipe(props) {
    const { name, image, diets } = props;

    return (
        <div className={style.general}>

            <div>
                <img className={style.img} src={image} alt="Not Found."></img>
            </div>
            <div className={style.name}>
                <h2>{name}</h2>
            </div>
            <div>
                {
                    diets.map(d => {
                        return (
                            <h5 key={prevId++}>- {d} </h5>
                        )
                    })
                }
            </div>

        </div>
    )
}