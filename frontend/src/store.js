import { createBrowserHistory as createHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const history = createHistory();
const middleware = routerMiddleware(history)

const defaultState = {
    categories: [],
    posts: [],
    comments: []
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(middleware, thunk)));

export { history };

export default store;
