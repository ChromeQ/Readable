import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import VoteUpIcon from 'material-ui-icons/ThumbUp';
import VoteDownIcon from 'material-ui-icons/ThumbDown';
import CommentIcon from 'material-ui-icons/Comment';

import { makeVote } from '../actions';
import Time from './Time';

const PostItem = (props) => {
    const { post, match: { params: { postId } } } = props;
    const isPostDetailsView = !!postId;

    const handleVoting = (voteDirection) => () => {
        props.dispatch(makeVote(voteDirection, 'posts', postId || props.post.id))
    }

    return (
        <Card key={post.id} className="post-card">
            {isPostDetailsView
                ? <CardHeader
                    avatar={<Avatar>{post.voteScore || '0'}</Avatar>}
                    title={`Written by ${post.author}`}
                    subheader={<Time timestamp={post.timestamp} />} />
                : (<Link to={`/posts/${post.id}`}>
                    <CardHeader
                        avatar={<Avatar>{post.voteScore || '0'}</Avatar>}
                        title={post.title}
                        subheader={<Time timestamp={post.timestamp} />} />
                </Link>)
            }
            <CardContent>
                {post.body}
            </CardContent>
            <CardActions disableActionSpacing={true}>
                <IconButton>
                    <VoteUpIcon onClick={handleVoting('upVote')} />
                </IconButton>
                <IconButton>
                    <VoteDownIcon onClick={handleVoting('downVote')}/>
                </IconButton>
                <div className="flex-spacer" />
                <CommentIcon />{post.commentCount}
            </CardActions>
        </Card>
	);
}

export default withRouter(connect()(PostItem));
