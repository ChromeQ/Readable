import React from 'react';

import CategoryList from './CategoryList';
import PostList from './PostList';

const Time = (props) => {
    const date = new Date(props.timestamp);
    const display = `Posted on ${date.toLocaleString()}`;

    return (
        <time>{display}</time>
    );
}

export default Time;
