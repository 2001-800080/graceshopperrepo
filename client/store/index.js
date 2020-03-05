import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import bouquets from './bouquet'
import bouquet from './singlebouquet'
import currentCart from './cart'

const reducer = combineReducers({user, bouquets, bouquet, currentCart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './bouquet'
export * from './singlebouquet'
export * from './cart'
