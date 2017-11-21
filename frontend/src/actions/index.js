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
} from './types';


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

export function addPost(postData) {
    return (dispatch) => {
        const url = `/posts`;

        return retrieve(url, postData, 'POST')
            .then(res => res.json())
            .then(post => dispatch({
                type: ADD_POST,
                post
            }));
    }
}

export function editPost(postData) {
    return (dispatch) => {
        const url = `/posts/${postData.id}`;

        return retrieve(url, postData, 'PUT')
            .then(res => res.json())
            .then(post => dispatch({
                type: UPDATE_POSTS,
                post
            }));
    }
}

export function removePost(postId) {
    return (dispatch) => {
        const url = `/posts/${postId}`;

        return retrieve(url, null, 'DELETE')
            .then(res => res.json())
            .then(post => dispatch({
                type: REMOVE_POST,
                post
            }));
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

export function addComment(commentData) {
    return (dispatch) => {
        const url = `/comments`;

        return retrieve(url, commentData, 'POST')
            .then(res => res.json())
            .then(comment => dispatch({
                type: ADD_COMMENT,
                comment
            }));
    }
}

export function editComment(commentData) {
    return (dispatch) => {
        const url = `/comments/${commentData.id}`;

        return retrieve(url, commentData, 'PUT')
            .then(res => res.json())
            .then(comment => dispatch({
                type: UPDATE_COMMENTS,
                comment
            }));
    }
}

export function removeComment(commentId) {
    return (dispatch) => {
        const url = `/comments/${commentId}`;

        return retrieve(url, null, 'DELETE')
            .then(res => res.json())
            .then(comment => dispatch({
                type: REMOVE_COMMENT,
                comment
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
                [type === 'posts' ? 'post' : 'comment']: data
            }));
    }
}
