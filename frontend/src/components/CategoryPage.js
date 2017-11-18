import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostList from './PostList';
import { getPosts } from '../actions';

class CategoryPage extends Component {

    componentWillMount() {
        this.props.dispatch(getPosts(this.props.match.params.category));
    }

    componentWillReceiveProps(nextProps) {
        // Only get new posts for the category if the urls are not the same (navigating one category to another)
        if (this.props.match.url !== nextProps.match.url) {
            this.props.dispatch(getPosts(nextProps.match.params.category));
        }
    }

    render() {
        const { posts, match: { params: { category }}} = this.props;
        const filteredPosts = category ? posts.filter(post => post.category === category) : posts

        return (
            <PostList category={category} posts={filteredPosts} />
        );
    }
}

function mapStateToProps (state) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps)(CategoryPage);
