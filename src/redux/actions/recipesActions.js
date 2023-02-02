import axios from 'axios'
import urlBack from '../../urlBack'

const recipesActions = {
    getRecipes: ()=>{
        return async(dispatch, getState) => {
            const res = await axios.get(`${urlBack}/api/recipes`)
            dispatch({type: 'GET_RECIPES', payload:res.data.response})
            // console.log(res.data.response)
        }
    },
    filterRecipies: (input)=> {
        return (dispatch, getState) => {
            dispatch({type: 'FILTER_RECIPES', payload: input })
        }
    }, 
    getOneRecipe: (id)=> {
        return async(dispatch, getState) => {
            const res = await axios.get(`${urlBack}/api/oneRecipe/${id}`)
            //console.log(res.data.res)
            dispatch({type: 'GET_ONE_RECIPE', payload: res.data.res})
            return res
        }
    },
    getRecipesByCategory: (categName) => {
        return async(dispatch, getState) => {
            const res = await axios.get(`${urlBack}/api/recipesByCategory/${categName}`)
            dispatch({type: 'GET_RECIPE_BY_CATEGORY', payload: res.data.res})
            
            console.log(res.data.res)
            return res
        }
    },
    getRecipesByChef: (chefId) => {
        return async(dispatch, getState) => {
            const res = await axios.get(`${urlBack}/api/recipesByChef/${chefId}`)
            dispatch({type: 'GET_RECIPE_BY_CHEF', payload: res.data.res})
            
            console.log(res.data.res)
        }
    }
}

export default recipesActions 
