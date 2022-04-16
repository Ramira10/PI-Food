const { Router } = require('express');
const axios = require('axios');
const {
    get_AllRecipes,
    get_DataBase,
    get_Api,
    get_DataBaseID,
    get_ApiID,
} = require('../controllers/recipe');
const { Recipe, Diet } = require('../db');
const { API_KEY, URL_SPOONACULAR } = process.env;

const router = Router();

// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        let AllRecipes = await get_AllRecipes(); // Me devuelve un arreglo concatenado con las respuestas encontradas en
        // la base de datos y en la API.

        if (name) {
            let recipeByName = await AllRecipes.filter(r => r.name.toLowerCase().includes(name.toString().toLowerCase())); // Utilizo LowerCase para evitar problemas con la comparación.
            if(recipeByName.length) {
                let recipes = recipeByName.map(r => {
                    return { 
                        id: r.id,
                        name: r.name,
                        summary: r.summary,
                        score: r.score,
                        healthScore: r.healthScore,
                        image: r.image,
                        steps: r.steps,
                        diets: r.diets,
                    }
                })
                return res.status(200).send(recipes);
            }
            return res.status(400).send('Recipe not found.');
        } else {
            // Si no tengo nombre, devuelvo todas las recetas.
            let recipes = AllRecipes.map(r => {
                return { 
                    id: r.id,
                    name: r.name,
                    summary: r.summary,
                    score: r.score,
                    healthScore: r.healthScore,
                    image: r.image,
                    steps: r.steps,
                    diets: r.diets,
                }
            })
            return res.status(200).send(recipes)
        }

    } catch (err) {
        next(err);
    }
});



// GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    let validate = id.includes("-"); // Si tiene el guion es pq se encuentra en base de datos.
    try {
        if (validate) {
            let recipeDB = await get_DataBaseID(id);
            return res.status(200).send(recipeDB);
        } else { // Se encuentra en la API
            let recipeAPI = await get_ApiID(id);
            return res.status(200).send(recipeAPI);
        }
    } catch (err) {
        console.log("Error: ")
        next(err);
    }
});

module.exports = router;