import { combineReducers } from 'redux'

import usersReducer from './usersReducer'
import recipesReducer from './recipesReducer'
const mainReducer = combineReducers({
    usersReducer, recipesReducer
})

export default mainReducer