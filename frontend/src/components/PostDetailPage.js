import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';

import PostItem from './PostItem';
import CommentList from './CommentList';
import PostAddEditModalForm from './PostAddEditModalForm';
import NotFound from './NotFound';
import { getPost, removePost } from '../actions';

class PostDetailPage extends Component {

    state  = {
        isFetching: true,
        isEditing: false
    }

    componentWillMount() {
        this.props.dispatch(getPost(this.props.match.params.postId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post.deleted) {
            this.props.history.push('/');
        }

        // Also part of the server bug workaround: Default isFetching is true and is not loading when...
        // We have a post in the props (navigating to this page from another)
        // We don't have a post and the nextState does (refreshing on the page)
        // This works whether the nextProps.post is a real post or an error post
        if (this.props.post || (!this.props.post && nextProps.post)) {
            this.setState({ isFetching: false });
        }
    }

    handleEdit = () => {
        this.setState({ isEditing: true });
    }

    handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            this.props.dispatch(removePost(this.props.post.id));
        }
    }

    render() {
        const { post } = this.props;

        // Not ideal, this must go first as pressing back after deleting the post reveals the
        // post exists but state never changes so stays in loading state. Part of the server bug
        if (post && (post.error || post.deleted)) {
            return <NotFound />;
        }

        if (!post || this.state.isFetching) {
            return <ReactLoading className="loading-spinner" type="spin" color="#555" />;
        }

        return (
            <div className="post-details">
                <div className="post-details-header">
                    <h2>{post.title}</h2>

                    <Button raised={true} color="primary" onClick={this.handleEdit}>Edit Post</Button>
                    <Button raised={true} color="accent" onClick={this.handleDelete}>Delete Post</Button>
                </div>

                <div className="post-container">
                    <PostItem post={post} />
                </div>

                <CommentList post={post} />

                <PostAddEditModalForm post={post} isOpen={this.state.isEditing} onClose={() => this.setState({ isEditing: false })} />
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
