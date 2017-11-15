import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import VoteUpIcon from 'material-ui-icons/ThumbUp';
import VoteDownIcon from 'material-ui-icons/ThumbDown';
import CommentIcon from 'material-ui-icons/Comment';

import Time from './Time';

const PostItem = (props) => {
    const { post } = props;

    return (
        <Card key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`}>
                <CardHeader
                    avatar={<Avatar>{post.voteScore}</Avatar>}
                    title={post.title}
                    subheader={<Time timestamp={post.timestamp} />} />
            </Link>
            <CardContent>
                {post.body}
            </CardContent>
            <CardActions disableActionSpacing={true}>
                <IconButton>
                    <VoteUpIcon />
                </IconButton>
                <IconButton>
                    <VoteDownIcon />
                </IconButton>
                <div className="flex-spacer" />
                <CommentIcon />{post.commentCount}
            </CardActions>
        </Card>
	);
}

export default PostItem;
