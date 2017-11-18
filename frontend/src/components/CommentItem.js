import React from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import VoteUpIcon from 'material-ui-icons/ThumbUp';
import VoteDownIcon from 'material-ui-icons/ThumbDown';

import { makeVote, removeComment } from '../actions';
import Time from './Time';

const CommentItem = (props) => {
    const { comment } = props;

    const handleVoting = (voteDirection) => () => {
        props.dispatch(makeVote(voteDirection, 'comments', comment.id))
    }
    const handleDelete = () => {
        props.dispatch(removeComment(comment.id))
    }

    return (
        <Paper>
            <Card key={comment.id} className="comment-card">
                <CardHeader
                    avatar={<Avatar>{comment.voteScore || '0'}</Avatar>}
                    title={`Written by ${comment.author}`}
                    subheader={<Time timestamp={comment.timestamp} />} />
                <CardContent>
                    {comment.body}
                </CardContent>
                <CardActions disableActionSpacing={true}>
                    <IconButton>
                        <VoteUpIcon onClick={handleVoting('upVote')} />
                    </IconButton>
                    <IconButton>
                        <VoteDownIcon onClick={handleVoting('downVote')} />
                    </IconButton>
                    <div className="flex-spacer" />
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="accent">
                        <DeleteIcon onClick={handleDelete} />
                    </IconButton>
                </CardActions>
            </Card>
        </Paper>
	);
}

export default connect()(CommentItem);
