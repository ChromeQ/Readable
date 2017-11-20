import React, { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import VoteUpIcon from 'material-ui-icons/ThumbUp';
import VoteDownIcon from 'material-ui-icons/ThumbDown';

import CommentAddEditModalForm from './CommentAddEditModalForm';
import { makeVote, removeComment } from '../actions';
import Time from './Time';

class CommentItem extends Component {

    state  = {
        isEditing: false
    }

    handleVoting = (voteDirection) => () => {
        this.props.dispatch(makeVote(voteDirection, 'comments', this.props.comment.id))
    }

    handleEdit = () => {
        this.setState({ isEditing: true });
    }

    handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            this.props.dispatch(removeComment(this.props.comment.id))
        }
    }

    render() {
        const { comment } = this.props;

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
                            <VoteUpIcon onClick={this.handleVoting('upVote')} />
                        </IconButton>
                        <IconButton>
                            <VoteDownIcon onClick={this.handleVoting('downVote')} />
                        </IconButton>
                        <div className="flex-spacer" />
                        <IconButton>
                            <EditIcon onClick={this.handleEdit} />
                        </IconButton>
                        <IconButton color="accent">
                            <DeleteIcon onClick={this.handleDelete} />
                        </IconButton>
                    </CardActions>
                </Card>

                <CommentAddEditModalForm comment={comment} isOpen={this.state.isEditing} onClose={() => this.setState({ isEditing: false })} />
            </Paper>
    	);
    }
}

export default connect()(CommentItem);
