import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux'
import thunkMiddleware from 'redux-thunk'

import monitorReducersEnhancer from '../enhancers/monitorReducers'
import middleware from '../middleware';
import { rootReducer } from './root'

export default function configureStore(preloadedState?: {}) {
  const middlewares: Array<any> = [
    middleware.readyStatePromiseMiddleware, 
    middleware.vanillaPromiseMiddleware, 
    middleware.apiMiddleware,
    thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers: StoreEnhancer<unknown, {}> = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}