import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
    SET_CATEGORIES,
    SET_POSTS,
    ADD_POST,
    UPDATE_POSTS,
    REMOVE_POST,
    SET_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENTS,
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

function posts (state = [], action) {
    let index,
        post;

    switch (action.type) {
        case SET_POSTS:
            const posts = action.posts.filter(post => {
                // Only return it if it was not found in the current state
                return state.findIndex(p => p.id === post.id) === -1;
            });
            return state.concat(posts);
        case ADD_POST:
            post = action.post;
            index = state.findIndex(p => p.id === post.id);

            if (index === -1) {
                // Just simply add the new post to the end of the current posts array
                return state.concat(post);
            } else {
                // Ensure only the matching post is replaced with this new one
                return [
                    ...state.slice(0, index),
                    action.post,
                    ...state.slice(index + 1)
                ];
            }
        case UPDATE_POSTS:
        case REMOVE_POST:
            index = state.findIndex(p => p.id === action.data.id);

            return [
                ...state.slice(0, index),
                action.data,
                ...state.slice(index + 1)
            ];
        case REMOVE_COMMENT:
            return state.map(post => {
                if (post.id !== action.data.parentId) {
                    return post;
                }

                return { ...post, commentCount: post.commentCount - 1 };
            })
        default:
            return state;
    }
}

function comments (state = {}, action) {
    switch (action.type) {
        case SET_COMMENTS:
            const matchingComments = state[action.postId];

            if (!matchingComments) {
                return {
                    ...state,
                    [action.postId]: action.comments
                };
            } else {
                return state;
            }
        case ADD_COMMENT:
            return state;
        case UPDATE_COMMENTS:
        case REMOVE_COMMENT:
            const postId = action.data.parentId;
            const comments = state[postId].map(comment => {
                if (comment.id !== action.data.id) {
                    return comment;
                }

                return action.data;
            });

            return {
                ...state,
                [postId]: comments
            };
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
