const initialState = {
    allRecipes: [],
    showedRecipes: [],
    diets: [],
    recipeDetails: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case "GET_RECIPES":
            return {
                ...state,
                showedRecipes: action.payload,
                allRecipes: action.payload,
            };

        case "GET_RECIPE_BY_NAME": 
            return {
                ...state,
                showedRecipes: action.payload,
            };

        case "GET_RECIPE_DETAILS":
            return {
                ...state,
                recipeDetails: action.payload,
            };

        case "GET_DIETS":
            return {
                ...state,
                diets: action.payload,
            };

        case "CREATE_RECIPE":
            return {
                ...state,
            };

        case "FILTER_BY_TYPE_DIET": // FILTRO RECETAS EN BASE AL TIPO DE DIETA 
            const recipes = state.allRecipes;
            const filter = recipes.filter(r => r.diets?.some(d => d.toLowerCase() === action.payload.toLowerCase()))
            // const filter = recipes.filter((r) => r.diet.includes(action.payload)); ¿FUNCIONA?
            return {
                ...state,
                showedRecipes: filter,
            }

        case "ORDER_BY_ALPHABET": // PASAR A IF Y PROBAR
            let sortByAlphabet = [...state.showedRecipes];
            sortByAlphabet = action.payload === 'atoz' ?
            state.showedRecipes.sort(function(a, b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            }) :
            state.showedRecipes.sort(function(a, b) {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                return 0
            });
            return {
                ...state,
                showedRecipes: sortByAlphabet,
            }

        case "ORDER_BY_SCORE":
            let sortedByScore = [...state.showedRecipes];
            sortedByScore = action.payload === 'asc' ?
            state.showedRecipes.sort(function(a, b) {
                if (a.score > b.score) return 1;
                if (a.score < b.score) return -1;
                return 0;
              }) :
              state.showedRecipes.sort(function(a, b) {
                if (a.score < b.score) return 1;
                if (a.score > b.score) return -1;
                return 0;
              });
              return {
                ...state,
                showedRecipes: sortedByScore,
              };

        default:
            return state;
    }
}