const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY, URL_SPOONACULAR } = process.env;

// RE-VER
const get_ApiID = async (id) => {
    const apiID = await axios.get(`${URL_SPOONACULAR}/recipes/${id}/information?apiKey=${API_KEY}`)
    const detail = apiID.data;
    // if(detail.id){
    let recipeDetail = {
        id,
        name: detail.title,
        summary: detail.summary,
        score: detail.spoonacularScore,
        healthScore: detail.healthScore,
        image: detail.image,
        steps: detail.analyzedInstructions[0]?.steps.map(s => {
            return {
                number: s.number,
                step: s.step,
            }
        }),
        dish: detail.dishTypes,
        diets: detail.diets,
        // dishTypes: detail.dishTypes,
    }
    // }
    return recipeDetail;

}

const get_DataBaseID = async (id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const get_Api = async () => {
    const resApi = await axios.get(`${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const { results } = resApi.data;

    const infoApi = await results?.map((r) => {
        return {
            id: r.id,
            name: r.title,
            summary: r.summary,
            score: r.spoonacularScore,
            healthScore: r.healthScore,
            image: r.image,
            steps: r.analyzedInstructions[0]?.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step,
                }
            }),
            diets: r.diets, 
            dish: r.dishTypes,
        }
    })
    return infoApi;
};

const get_DataBase = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }

        }
    });
}

const get_AllRecipes = async () => {
    const getApi = await get_Api();
    const getDataBase = await get_DataBase();
    const all = getApi.concat(getDataBase);

    return all;
}

module.exports = { 
    get_AllRecipes,
    get_DataBase,
    get_Api,
    get_DataBaseID,
    get_ApiID,
}