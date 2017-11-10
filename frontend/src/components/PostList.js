import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import VoteUpIcon from 'material-ui-icons/ThumbUp';
import VoteDownIcon from 'material-ui-icons/ThumbDown';
import CommentIcon from 'material-ui-icons/Comment';

import Time from './Time';

class PostList extends Component {

    state = {
        orderBy: 'voteScore'
    }

    render() {
        const { posts } = this.props;
        const { orderBy } = this.state;

        posts.sort((a, b) => {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        });

        return (
            <div className="post-list">
                <h2>{this.props.category} Posts</h2>

                <div className="post-container">
                    {posts.map(post => (
                        <Card key={post.id} className="post-card">
                            <Link to={`/posts/${post.id}`}>
                                <CardHeader
                                    avatar={<Avatar>{post.voteScore}</Avatar>}
                                    title={post.title}
                                    subheader={<Time timestamp={post.timestamp} />} />
                            </Link>
                            <CardContent>
                                {post.body}
                            </CardContent>
                            <CardActions disableActionSpacing={true}>
                                <IconButton>
                                    <VoteUpIcon />
                                </IconButton>
                                <IconButton>
                                    <VoteDownIcon />
                                </IconButton>
                                <div className="flex-spacer" />
                                <CommentIcon />{post.commentCount}
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}

export default PostList;
