import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import categories from './categories';
import posts from './posts';
import comments from './comments';

export default combineReducers({
    categories,
    posts,
    comments,
    router: routerReducer
});
