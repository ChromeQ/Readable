import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';

import PostItem from './PostItem';
import CommentList from './CommentList';
import PostAddEditModalForm from './PostAddEditModalForm';
import { getPost, removePost } from '../actions';

class PostDetailPage extends Component {

    state  = {
        isEditing: false
    }

    componentWillMount() {
        this.props.dispatch(getPost(this.props.match.params.postId));
    }

    handleEditPost = () => {
        this.setState({ isEditing: true });
    }

    handleDeletePost = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            this.props.dispatch(removePost(this.props.post.id));
        }
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <ReactLoading className="loading-spinner" type="spin" color="#555" />;
        }

        if (post.deleted) {
            this.props.history.push('/');
            return null;
        }

        return (
            <div className="post-details">
                <div className="post-details-header">
                    <h2>{post.title}</h2>

                    <Button raised={true} color="primary" onClick={this.handleEditPost}>Edit Post</Button>
                    <Button raised={true} color="accent" onClick={this.handleDeletePost}>Delete Post</Button>
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
