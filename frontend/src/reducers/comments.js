import {
    SET_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENTS,
    REMOVE_COMMENT
} from '../actions/types';

export default function comments (state = [], action) {
    switch (action.type) {
        case SET_COMMENTS:
            const comments = action.comments.filter(comment => {
                // Filter out the comments which are already in the state
                return state.findIndex(c => c.id === comment.id) === -1;
            });

            return state.concat(comments);
        case ADD_COMMENT:
            return state.concat([action.comment]);
        case UPDATE_COMMENTS:
        case REMOVE_COMMENT:
            return state.map(comment => {
                // If it isn't a match simply return the comment unchanged
                if (comment.id !== action.comment.id) {
                    return comment;
                }

                // Otherwise returned the removed/updated comment from the action
                return action.comment;
            });
        default:
            return state;
    }
}
