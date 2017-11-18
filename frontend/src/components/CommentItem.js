import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import VoteUpIcon from 'material-ui-icons/ThumbUp';
import VoteDownIcon from 'material-ui-icons/ThumbDown';

import Time from './Time';

const CommentItem = (props) => {
    const { comment } = props;

    return (
        <Paper>
            <Card key={comment.id} className="comment-card">
                <CardHeader
                    avatar={<Avatar>{comment.voteScore}</Avatar>}
                    title={`Written by ${comment.author}`}
                    subheader={<Time timestamp={comment.timestamp} />} />
                <CardContent>
                    {comment.body}
                </CardContent>
                <CardActions disableActionSpacing={true}>
                    <IconButton>
                        <VoteUpIcon />
                    </IconButton>
                    <IconButton>
                        <VoteDownIcon />
                    </IconButton>
                    <div className="flex-spacer" />
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Paper>
	);
}

export default CommentItem;
