import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import users from './users';
import user from './sessions';
import reservations from './reservations';

const reducer = combineReducers({ user, users, reservations })

const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducer, middleware);

export default store;
export * from './users';
export * from './sessions';
export * from './reservations';