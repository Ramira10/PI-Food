import React from "react";
// import { Link } from "react-router-dom"
import Recipe from "./Recipe"
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";
import style from "./Styles/Home.module.css"


import { useState, useEffect } from "react";
import { connect, /* useDispatch */ /* useSelector */ } from "react-redux";
import {
    getRecipes,
    // getRecipeByName,
    // getRecipeDetails,
    // getDiets,
    // addRecipe,
    filterByTypeDiet,
    orderByAlphabet,
    orderByScore
} from "../redux/actions"

let prevId = 1;

function Home(props) {

    const [/* order */, setOrder] = useState('')

    // Lógica para mostrar 9 recetas por página
    const [page, setPage] = useState(1);
    const [recipesPage, /* setRecipesPage */] = useState(9);
    const quantityRecipes = page * recipesPage;
    const firstRecipe = quantityRecipes - recipesPage;
    const showRecipes = props.showedRecipes.slice(firstRecipe, quantityRecipes);

    const paged = function (pageNumber) {
        setPage(pageNumber)
    };

    useEffect(() => {
        props.getRecipes();
        // La siguiente línea es para quitar un warning molesto de la consola.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.getRecipes]);

    let handleClick = (e) => {
        e.preventDefault();
        props.getRecipes();
        setPage(1);
    }

    let handleFilterByTypeDiet = (e) => {
        e.preventDefault();
        props.filterByTypeDiet(e.target.value);
        setPage(1);
    }

    let handleOrderByAlphabet = (e) => {
        e.preventDefault();
        props.orderByAlphabet(e.target.value);
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    let handleOrderByScore = (e) => {
        e.preventDefault();
        props.orderByScore(e.target.value);
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }


    return (
        <div className={style.home}>
            {/* NAVBAR (PENDIENTE) */}
            <SearchBar />
            <hr></hr>


            <div className={style.btnYfilt}>

                {/* BOTON PARA REFRESCAR */}
                <div>
                    <button onClick={handleClick}>REFRESH</button>
                </div>

                {/* BOTON PARA CREAR UNA RECETA  */}
                <div>
                    <button>Create Recipe</button>
                </div>

                {/* FILTRADO POR TIPO DE DIETA */}
                <div>
                    <label>Filter by Type Diets: </label>
                    <select name="diets" onChange={e => handleFilterByTypeDiet(e)}>
                        <option disabled selected>Select...</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="ketogenic">Keto</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="lacto vegetarian">Lacto-Vegetarian</option>
                        <option value="ovo vegetarian">Ovo-Vegetarian</option>
                        <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescetarian">Pescetarian</option>
                        <option value="paleolithic">Paleo</option>
                        <option value="primal">Primal</option>
                        <option value="low fodmap">Low FODMAP</option>
                        <option value="whole 30">Whole30</option>
                        <option value="dairy free">Dairy Free</option>
                    </select>
                </div>

                {/* ORDEN ALFABÉTICO  */}
                <div>
                    <label>Order alphabetically: </label>
                    <select name="alphabetical" onChange={e => handleOrderByAlphabet(e)}>
                        <option disabled selected>Select...</option>
                        <option value="atoz">A to Z</option>
                        <option value="ztoa">Z to A</option>
                    </select>
                </div>

                {/* ORDEN DE MIN A MAX - MAX A MIN  */}
                <div>
                    <label>Order by Score: </label>
                    <select name="numerical" onChange={e => handleOrderByScore(e)}>
                        <option disabled selected>Select...</option>
                        <option value="asc">From Min to Max</option>
                        <option value="desc">From Max to Min</option>
                    </select>
                </div>

            </div>

            <hr></hr>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            {/* MUESTRO LAS RECETAS */}
            <div className={style.recipes}>
                {
                    showRecipes?.map(e => {
                        return (
                            <div className={style.recipe} key={prevId++}>
                                <Recipe
                                    image={e.image}
                                    name={e.name}
                                    diets={e.diets}
                                    id={e.id}
                                ></Recipe>

                            </div>
                        )
                    })
                }
            </div>

            <hr></hr>

            <div>
                <Paginated recipesPage={recipesPage} showedRecipes={props.showedRecipes.length} paged={paged}></Paginated>
                <span className={style.actual}> {page} of {Math.ceil(props.showedRecipes.length / recipesPage)} </span>
            </div>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        showedRecipes: state.showedRecipes,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipes: () => dispatch(getRecipes()),
        filterByTypeDiet: (payload) => dispatch(filterByTypeDiet(payload)),
        orderByAlphabet: (payload) => dispatch(orderByAlphabet(payload)),
        orderByScore: (payload) => dispatch(orderByScore(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)