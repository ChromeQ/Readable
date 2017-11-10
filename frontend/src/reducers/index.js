import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
    SET_CATEGORIES,
    SET_POSTS,
    ADD_POST,
    REMOVE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions';

function categories (state = [], action) {
    switch (action.type) {
        case SET_CATEGORIES:
            // Simply return the categories, no need to merge as it is a static list called once
            return action.categories;
        default:
            return state;
    }
}

function posts (state = {}, action) {
    switch (action.type) {
        case SET_POSTS:
            const posts = action.posts.filter(post => {
                // Only return it if it was not found in the current state
                return state.findIndex(p => p.id === post.id) === -1;
            });
            return state.concat(posts);
        case ADD_POST:
            return state;
        case REMOVE_POST:
            return state;
        default:
            return state;
    }
}

function comments (state = {}, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return state;
        case REMOVE_COMMENT:
            return state;
        default:
            return state;
    }
}

export default combineReducers({
    categories,
    posts,
    comments,
    router: routerReducer
});
