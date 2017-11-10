import React from 'react';

const Time = (props) => {
    const date = `Posted on ${new Date(props.timestamp).toLocaleString()}`;

    return (
        <time>{date}</time>
    );
}

export default Time;
