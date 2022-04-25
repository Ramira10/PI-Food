const { Router } = require("express");
const { Diet } = require("../db");
const { types } = require("../controllers/diet")
const router = Router();

// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar 
// la base de datos con los tipos de datos indicados por spoonacular.
router.get('/', async(req, res, next) => {
    try {
        types.forEach(n => {
            Diet.findOrCreate({
                where: {
                    name: n
                }
            })
        });
        const diets = await Diet.findAll();
        res.send(diets);
    } catch (err) {
        next(err);
    }
})


module.exports = router;