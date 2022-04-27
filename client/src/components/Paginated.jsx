import React from "react";
import style from "./Styles/Paginated.module.css"

export default function Paginated({ recipesPage, showedRecipes, paged }) {

    const pages = [];

    for (let i = 1; i <= Math.ceil(showedRecipes / recipesPage); i++) {
        pages.push(i)
    };

    return (
        <div className={style.general}>
            {
                <nav>
                    <ul className={style.ul}>
                        {pages?.map((p) => (
                            <li className={style.list} key={p}>
                                <button className={style.btn} onClick={() => paged(p)}>{p}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            }
        </div>
    )
}
