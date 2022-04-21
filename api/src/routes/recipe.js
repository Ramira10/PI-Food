const { Router } = require('express');
const { Recipe, Diet } = require('../db');

const router = Router();

// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
router.post('/', async (req, res, next) => {
    const { name, summary, score, healthScore, image, steps, diets } = req.body;
    try {
        const newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            image,
            steps,
        })

        // console.log(diets)
        // diets.map(async d => {
        let dietDB = await Diet.findAll({
            where: {
                name: diets/* .map(d => d) */
            }
        })
        newRecipe.addDiet(dietDB);
        // })



        res.status(200).send(newRecipe);
    } catch (err) {
        next(err);
    }
});

module.exports = router;