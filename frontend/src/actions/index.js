export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const retrieve = (url, data, method) => {
    return fetch(url, {
        method: method || 'GET',
        headers: {
            'Authorization': 'user-foo',
            'Content-Type': 'application/json'
        },
        body: data && JSON.stringify(data)
    });
}

export function getCategories() {
    return (dispatch) => {
        return retrieve('/categories')
            .then(res => res.json())
            .then(data => dispatch({
                type: SET_CATEGORIES,
                categories: data.categories
            }));
    }
}

export function getPosts(category) {
    return (dispatch) => {
        const url = category ? `/${category}/posts` : '/posts';

        return retrieve(url)
            .then(res => res.json())
            .then(posts => dispatch({
                type: SET_POSTS,
                posts
            }));
    }
}

export function getPost(postId) {
    return (dispatch) => {
        const url = `/posts/${postId}`;

        return retrieve(url)
            .then(res => res.json())
            .then(post => dispatch({
                type: ADD_POST,
                post
            }));
    }
}

export function addPost({ timestamp, title, body, author, category }) {
    return {
        type: ADD_POST,
        timestamp,
        title,
        body,
        author,
        category
    }
}

export function removePost(id) {
    return {
        type: REMOVE_POST,
        id
    }
}

export function getComments(postId) {
    return (dispatch) => {
        const url = `/posts/${postId}/comments`;

        return retrieve(url)
            .then(res => res.json())
            .then(comments => dispatch({
                type: SET_COMMENTS,
                comments,
                postId
            }));
    }
}

export function addComment({ timestamp, body, author, parentId }) {
    return {
        type: ADD_COMMENT,
        timestamp,
        body,
        author,
        parentId
    }
}

export function removeComment(commentId) {
    return (dispatch) => {
        const url = `/comments/${commentId}`;

        return retrieve(url, null, 'DELETE')
            .then(res => res.json())
            .then(data => dispatch({
                type: REMOVE_COMMENT,
                data
            }));
    }
}

export function makeVote(voteDirection, type, id) {
    return (dispatch) => {
        const url = `/${type}/${id}`;
        const actionType = `UPDATE_${type.toUpperCase()}`;

        return retrieve(url, { option: voteDirection }, 'POST')
            .then(res => res.json())
            .then(data => dispatch({
                type: actionType,
                data
            }));
    }
}
