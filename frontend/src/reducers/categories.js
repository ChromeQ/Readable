import {
    SET_CATEGORIES
} from '../actions/types';

export default function categories (state = [], action) {
    switch (action.type) {
        case SET_CATEGORIES:
            // Simply return the categories, no need to merge as it is a static list called once
            return action.categories;
        default:
            return state;
    }
}
