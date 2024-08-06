import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { taskReducer, loadingReducer } from './reducers'

const rootReducer = combineReducers({
	task: taskReducer,
	loading: loadingReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

