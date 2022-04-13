import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../redux/actions";
import style from "./Styles/SearchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    let handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipeByName(input));
        setInput("")
    }


    return (
        <div className={style.general}>
            <div className={style.title}>
                <h1> SearchBar </h1>
            </div>
            <div className={style.ib}>

                <input
                    className={style.input}
                    type="text"
                    placeholder="Search recipe by name..."
                    value={input}
                    onChange={e => handleChange(e)}
                ></input>

                <button
                    className={style.btn}
                    type="submit"
                    onClick={e => handleSubmit(e)}
                >SEARCH</button>

            </div>
        </div>
    )
}