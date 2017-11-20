import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import uuid from 'uuid/v1';

import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import CommentItem from './CommentItem';
import { getComments, addComment } from '../actions';

class PostCommentsList extends Component {

    state = {
        isAdding: false,
        title: '',
        body: '',
        author: '',
        category: ''
    }

    componentWillMount() {
        // Only try to fetch the comments if we don't have any yet
        if (!this.props.comments.length) {
            this.props.dispatch(getComments(this.props.post.id));
        }
    }

    handleFormChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
    }

    handleAddComment = () => {
        this.setState({
            isAdding: true
        });
    }

    handleAddCommentCancel = () => {
        this.setState({
            isAdding: false,
            title: '',
            body: '',
            author: '',
            category: ''
        });
    }

    handleAddCommentSubmit = (event) => {
        event.preventDefault();

        this.props.dispatch(addComment({
            id: uuid(),
            timestamp: Date.now(),
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
            category: this.state.category
        }));
    }

    render() {
        let { comments } = this.props;

        comments = comments.filter(comment => {
            return !comment.deleted;
        }).sort((a, b) => {
            return a.voteScore > b.voteScore ? -1 : 1;
        });

        return (
            <div className="comments-list">
                <div className="comments-details-header">
                    <h2>Comments</h2>
                    <Button raised={true} color="primary" onClick={this.handleAddComment}>Add Comment</Button>
                </div>

                {comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}

                <Modal className="modal" overlayClassName="modal-overlay" isOpen={this.state.isAdding} onRequestClose={this.handleAddCommentCancel}>
                    <Paper className="modal-form">
                        <h3>Adding a new comment</h3>
                        <form noValidate autoComplete="off">
                            <TextField fullWidth={true} required={true} id="title" label="Title" value={this.state.title} onChange={this.handleFormChange('title')} />
                            <TextField fullWidth={true} required={true} id="body" label="Body" multiline={true} value={this.state.body} onChange={this.handleFormChange('body')} />
                            <TextField fullWidth={true} required={true} id="author" label="Author" value={this.state.author} onChange={this.handleFormChange('author')} />
                            <TextField fullWidth={true} required={true} id="category" label="Category" select={true} value={this.state.category} onChange={this.handleFormChange('category')}>
                                {this.props.categories.map(category => (
                                    <MenuItem key={category.name} value={category.name}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button raised={true} color="primary" onClick={this.handleAddCommentSubmit}>Save</Button>
                            <Button raised={true} onClick={this.handleAddCommentCancel}>Cancel</Button>
                        </form>
                    </Paper>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps (state, ownProps) {
    const { post: { id }} = ownProps;
    const comments = state.comments[id] || [];

    return {
        categories: state.categories,
        comments
    };
}

export default connect(mapStateToProps)(PostCommentsList);
