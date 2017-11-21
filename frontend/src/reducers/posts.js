import {
    SET_POSTS,
    ADD_POST,
    UPDATE_POSTS,
    REMOVE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions/types';

export default function posts (state = [], action) {
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
            index = state.findIndex(p => p.id === action.post.id);

            return [
                ...state.slice(0, index),
                action.post,
                ...state.slice(index + 1)
            ];
        case ADD_COMMENT:
            return state.map(post => {
                if (post.id !== action.comment.parentId) {
                    return post;
                }

                return { ...post, commentCount: post.commentCount + 1 };
            });
        case REMOVE_COMMENT:
            return state.map(post => {
                if (post.id !== action.comment.parentId) {
                    return post;
                }

                return { ...post, commentCount: post.commentCount - 1 };
            });
        default:
            return state;
    }
}
