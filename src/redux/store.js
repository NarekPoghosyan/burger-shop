import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

// rootReducer
import rootReducer from './reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk),
))

export default store;