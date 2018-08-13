import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import users from './users';

const reducer = combineReducers({ users })

const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducer, middleware);

export default store;
export * from './users';