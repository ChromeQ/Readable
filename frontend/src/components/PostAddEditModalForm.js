import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import uuid from 'uuid/v1';

import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import { addPost, editPost } from '../actions';

const emptyPost = {
    id: '',
    timestamp: '',
    title: '',
    body: '',
    author: '',
    category: ''
};

class PostAddEditModalForm extends Component {

    state = {
        isOpen: false,
        ...emptyPost
    }

    componentWillMount() {
        this.setState({
            isOpen: this.props.isOpen,
            ...this.props.post
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isOpen !== nextProps.isOpen) {
            this.setState({
                isOpen: nextProps.isOpen,
                ...nextProps.post
            });
        }
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
    }

    handleCancel = () => {
        this.props.onClose();
        this.setState({
            isOpen: false,
            ...emptyPost
        });
    }

    handleSubmit = (event) => {
        const post = {
            id: this.state.id || uuid(),
            timestamp: this.state.timestamp || Date.now(),
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
            category: this.state.category
        };

        event.preventDefault();

        if (this.state.id) {
            this.props.dispatch(editPost(post));
        } else {
            this.props.dispatch(addPost(post));
        }

        this.handleCancel();
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="modal-overlay" isOpen={this.state.isOpen} onRequestClose={this.handleCancel}>
                <Paper className="modal-form">
                    <h3>Adding a new post</h3>
                    <form noValidate autoComplete="off">
                        <TextField fullWidth={true} required={true} id="title" label="Title" value={this.state.title} onChange={this.handleChange('title')} />
                        <TextField fullWidth={true} required={true} id="body" label="Body" multiline={true} value={this.state.body} onChange={this.handleChange('body')} />
                        <TextField fullWidth={true} required={true} id="author" label="Author" value={this.state.author} onChange={this.handleChange('author')} />
                        <TextField fullWidth={true} required={true} id="category" label="Category" select={true} value={this.state.category} onChange={this.handleChange('category')}>
                            {this.props.categories.map(category => (
                                <MenuItem key={category.name} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button raised={true} color="primary" onClick={this.handleSubmit}>Save</Button>
                        <Button raised={true} onClick={this.handleCancel}>Cancel</Button>
                    </form>
                </Paper>
            </Modal>
        );
    }
}

function mapStateToProps (state) {
    return {
        categories: state.categories
    };
}

export default connect(mapStateToProps)(PostAddEditModalForm);
