const initialState = {
    recipes: [], //all cities
    recipesFilter: [], //filtered cities by input 
    oneRecipe: {},
    recipesByCategory: [],
    recipeByChef: {}
}

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                recipesFilter: action.payload
            }
        case 'FILTER_RECIPES':
            let filter = state.recipes.filter((recipe=> recipe.name.toLowerCase().startsWith(action.payload.toLowerCase())))
            return {
                ...state,
                recipesFilter: filter
            }
        case 'GET_ONE_RECIPE':
            return {
                ...state,
                oneRecipe: action.payload
            }
        case 'GET_RECIPE_BY_CATEGORY':
            return{
                ...state,
                recipesByCategory: action.payload
            }
        case 'GET_RECIPE_BY_CHEF':
            return{
                ...state,
                recipeByChef: action.payload
            }
        default:
            return state
    }
}

export default recipesReducer