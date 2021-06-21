import { combineReducers } from 'redux'

// reducers
import filters from './filters'
import pizzas from './pizzas'
import basket from './basket'

const rootReducer = combineReducers({
    filters,
    pizzas,
    basket
})

export default rootReducer;