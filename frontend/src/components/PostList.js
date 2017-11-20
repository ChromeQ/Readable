import React, { Component } from 'react';

import Button from 'material-ui/Button';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Switch from 'material-ui/Switch';

import PostAddEditModalForm from './PostAddEditModalForm';
import PostItem from './PostItem';

class PostList extends Component {

    state = {
        orderBy: 'voteScore',
        sortASC: true,
        isAdding: false
    }

    orderByOptions = [
        { value: 'voteScore', label: 'Vote Score' },
        { value: 'timestamp', label: 'Date'},
        { value: 'commentCount', label: 'Comments'}
    ]

    handleSelectChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleSwitchChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    }

    render() {
        let { posts } = this.props;
        const { orderBy } = this.state;

        posts = posts.filter(post => {
            return !post.deleted;
        }).sort((a, b) => {
            if (this.state.sortASC) {
                return a[orderBy] > b[orderBy] ? -1 : 1;
            } else {
                return a[orderBy] > b[orderBy] ? 1 : -1;
            }
        });

        return (
            <div className="post-list">
                <div className="post-list-header">
                    <h2>{this.props.category} Posts</h2>

                    <FormControl className="post-order">
                        <InputLabel htmlFor="orderBy">Order By</InputLabel>
                        <Select
                            value={orderBy}
                            onChange={this.handleSelectChange('orderBy')}
                            input={<Input id="orderBy" />}
                        >
                            {this.orderByOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        className="post-sorter"
                        control={
                            <Switch
                                checked={this.state.sortASC}
                                onChange={this.handleSwitchChange('sortASC')}
                            />
                        }
                        label="Sort Ascending"
                    />

                    <Button raised={true} color="primary" onClick={() => this.setState({ isAdding: true })}>Add Post</Button>
                </div>

                <div className="post-container">
                    {posts.map(post => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </div>

                <PostAddEditModalForm post={{ category: this.props.category }} isOpen={this.state.isAdding} onClose={() => this.setState({ isAdding: false })} />
            </div>
        );
    }
}

export default PostList;
