import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';

import PostItem from './PostItem';
import PostCommentsList from './PostCommentsList';
import { getPost } from '../actions';

class PostDetailPage extends Component {

    componentWillMount() {
        this.props.dispatch(getPost(this.props.match.params.postId));
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <ReactLoading className="loading-spinner" type="spin" color="#555" />;
        }

        return (
            <div className="post-details">
                <div className="post-details-header">
                    <h2>{post.title}</h2>

                    <Button raised={true} color="primary">Edit Post</Button>
                    <Button raised={true} color="accent">Delete Post</Button>
                </div>

                <div className="post-container">
                    <PostItem post={post} />
                </div>

                <PostCommentsList post={post} />
            </div>
        );
    }
}

function mapStateToProps (state, ownProps) {
    const { posts } = state;
    const { match: { params: { postId }}} = ownProps;
    const post = posts.find(post => post.id === postId);

    return {
        post: post || null
    };
}

export default connect(mapStateToProps)(PostDetailPage);
