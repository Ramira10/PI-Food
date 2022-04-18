import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, /* Redirect */ useHistory } from "react-router-dom"
import { useState } from "react"
import { createRecipe, getDiets } from "../redux/actions"
import style from "./Styles/CreateRecipe.module.css"

// Funcion para validar una URL
let validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

let validate = (input) => {
    let errors = {};

    // Name obligatorio.
    if (!input.name) {
        errors.name = "Name cannot be null."
    }
    // Summary obligatorio.
    if (!input.summary) {
        errors.summary = "Summary cannot be null."
    }
    // El score tiene que ser de 1 a 100, puede ser nulo.
    if (input.score < 1 || input.score > 100) {
        errors.score = "The score is 1 - 100."
    }
    // El healthScore tiene que ser de 1 a 100, puede ser nulo.
    if (input.healthScore < 1 || input.healthScore > 100) {
        errors.healthScore = "The health score is 1 - 100."
    }
    // La imagen puede no ingresarse, si se ingresa tiene que pasar la validación.
    if (input.image && !validURL(input.image)) {
        errors.image = "Invalid URL."
    }
    // Obligatorio los pasos.
    if (!input.steps) {
        errors.steps = "Enter the recipe steps."
    }
    // Obligatorio tipo de dieta.
    if (!input.diets.length) {
        errors.diets = "Select at least one diet."
    }

    return errors;

}

function CreateRecipe(props) {
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        summary: "",
        score: "",
        healthScore: "",
        image: "",
        steps: "",
        diets: [],
    })

    useEffect(() => {
        props.getDiets();
        // La siguiente línea es para quitar un warning molesto de la consola.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let handleChange = (e) => {
        e.preventDefault();
        setInput((prevInput) => {
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value,
            }
            setErrors(validate(newInput));
            return newInput;
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0 && input.name !== "" && input.summary !== "") {
            props.createRecipe(input);
            setInput({
                name: "",
                summary: "",
                score: "",
                healthScore: "",
                image: "",
                steps: "",
                diets: [],
            })
            history.push('/home')
        } else {
            alert("Check the fields.")
        }

    }

    let handleCheck = (e) => {
        let newArray = input.diets;
        let find = newArray.indexOf(e.target.value);

        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }

        setInput({
            ...input,
            diets: newArray
        });

        setErrors(validate(input));
    }

    return (
        <div className={style.div}>

            <div>
                <h1 className={style.title}>
                    Create Recipe
                </h1>
            </div>

            <div className={style.form}>

                <form onSubmit={handleSubmit}>

                    <div><label>Name: </label></div>
                    <input
                        className={style.textboxclass}
                        type={"text"}
                        name={"name"}
                        value={input.name}
                        onChange={e => handleChange(e)}
                    ></input>
                    {errors.name && <p className={style.err}>{errors.name}</p>}



                    <div className={style.txt}><label>Summary: </label></div>
                    <textarea
                        className={style.inputext}
                        type={"text"}
                        name={"summary"}
                        value={input.summary}
                        onChange={e => handleChange(e)}
                    ></textarea>
                    {errors.summary && <p className={style.err}>{errors.summary}</p>}


                    <div className={style.txt}><label>Score: </label></div>
                    <input
                        className={style.inputScore}
                        type={"number"}
                        name={"score"}
                        value={input.score}
                        onChange={e => handleChange(e)}
                    ></input>
                    {errors.score && <p className={style.err}>{errors.score}</p>}


                    <div className={style.txt}><label>Health Score: </label></div>
                    <input
                        className={style.inputScore}
                        type={"number"}
                        name={"healthScore"}
                        value={input.healthScore}
                        onChange={e => handleChange(e)}
                    ></input>
                    {errors.healthScore && <p className={style.err}>{errors.healthScore}</p>}



                    <div className={style.txt}><label>URL Image: </label></div>
                    <input
                        className={style.input}
                        type={"url"}
                        name={"image"}
                        value={input.image}
                        onChange={e => handleChange(e)}
                    ></input>
                    {errors.image && <p className={style.err}>{errors.image}</p>}



                    <div className={style.txt}><label>Steps: </label></div>
                    <textarea
                        className={style.inputext}
                        type={"text"}
                        name={"steps"}
                        value={input.steps}
                        onChange={e => handleChange(e)}
                    ></textarea>
                    {errors.steps && <p className={style.err}>{errors.steps}</p>}



                    <div className={style.txt}><label>Types of diet: </label></div>
                    <br></br>
                    {props.diets.map(d => {
                        return (
                            <div key={d} >
                                <label> {d[0].toUpperCase() + d.slice(1)}</label>
                                <input type="checkbox" name={d} value={d} selected={input.diets.includes(d)} onChange={e => handleCheck(e)} />
                            </div>
                        )
                    })}
                    {errors.diets && <p className={style.err}>{errors.diets}</p>}



        
                    <button type="submit" >CREATE RECIPE </button>
                    <Link to="/home"><button>GO BACK</button></Link>

                </form>

            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        diets: state.diets,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createRecipe: (payload) => dispatch(createRecipe(payload)),
        getDiets: () => dispatch(getDiets()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);