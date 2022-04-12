import React from "react";

export default function Home() {

    return (
        <div>
            <h1> ¿Tenes hambre? Acá unas recetas más buena que la puta de tu hermana!!!!!!!!</h1>
            <div>
                <button>Refresh</button>
            </div>
            <input placeholder="Find recipe by name..."></input>

            <div>
                <label>Sort:</label>
                <select name="diets">
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

            <div>
                <label>Sort:</label>
                <select name="alphabetical">
                    <option value="A - Z">A to Z</option>
                    <option value="Z - A">Z to A</option>
                </select>

            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <h1> --- RECETAS --- </h1>
                <h3>Imagen</h3>
                <h3>Nombre</h3>
                <h3>Tipo de dieta</h3>
            </div>
        </div>
    )
}

