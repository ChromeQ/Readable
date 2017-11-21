import {
    SET_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENTS,
    REMOVE_COMMENT
} from '../actions/types';

export default function comments (state = {}, action) {
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
            const parentId = action.comment.parentId;

            return {
                ...state,
                [parentId]: [
                    ...state[parentId],
                    action.comment
                ]
            };
        case UPDATE_COMMENTS:
        case REMOVE_COMMENT:
            const postId = action.comment.parentId;
            const comments = state[postId].map(comment => {
                if (comment.id !== action.comment.id) {
                    return comment;
                }

                return action.comment;
            });

            return {
                ...state,
                [postId]: comments
            };
        default:
            return state;
    }
}
