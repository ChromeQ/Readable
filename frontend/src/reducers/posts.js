import {
    SET_POSTS,
    ADD_POST,
    UPDATE_POSTS,
    REMOVE_POST,
    ERROR_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions/types';

export default function posts (state = [], action) {
    switch (action.type) {
        case SET_POSTS:
            const posts = action.posts.filter(post => {
                // Only return it if it was not found in the current state
                return state.findIndex(p => p.id === post.id) === -1;
            });

            return state.concat(posts);
        case ADD_POST:
            const post = action.post;
            const index = state.findIndex(p => p.id === post.id);

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
            return state.map(post => {
                // If it isn't a match simply return the post unchanged
                if (post.id !== action.post.id) {
                    return post;
                }

                // Otherwise returned the removed/updated post from the action
                return action.post;
            });
        case ERROR_POST:
            // Part of the server bug, add an error state post with matching id so the mapStateToProps
            // can find this post and check the error flag
            const errorPost = {
                id: action.id,
                error: true
            };

            return state.concat([errorPost]);
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
