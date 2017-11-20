import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';

import CommentItem from './CommentItem';
import { getComments } from '../actions';

class CommentList extends Component {

    componentWillMount() {
        // Only try to fetch the comments if we don't have any yet
        if (!this.props.comments.length) {
            this.props.dispatch(getComments(this.props.post.id));
        }
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
            </div>
        );
    }
}

function mapStateToProps (state, ownProps) {
    const { post: { id }} = ownProps;
    const comments = state.comments[id] || [];

    return {
        comments
    };
}

export default connect(mapStateToProps)(CommentList);
