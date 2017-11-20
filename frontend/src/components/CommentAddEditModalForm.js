import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import uuid from 'uuid/v1';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import { addComment, editComment } from '../actions';

const emptyComment = {
    id: '',
    timestamp: '',
    body: '',
    author: '',
    parentId: ''
};

class CommentAddEditModalForm extends Component {

    state = {
        isOpen: false,
        ...emptyComment
    }

    componentWillMount() {
        this.setState({
            isOpen: this.props.isOpen,
            ...this.props.comment
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isOpen !== nextProps.isOpen) {
            this.setState({
                isOpen: nextProps.isOpen,
                ...nextProps.comment
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
            ...emptyComment
        });
    }

    handleSubmit = (event) => {
        const comment = {
            id: this.state.id || uuid(),
            timestamp: Date.now(),
            body: this.state.body,
            author: this.state.author,
            parentId: this.state.parentId
        };

        event.preventDefault();

        if (this.state.id) {
            this.props.dispatch(editComment(comment));
        } else {
            this.props.dispatch(addComment(comment));
        }

        this.handleCancel();
    }

    render() {
        return (
            <Modal className="modal" overlayClassName="modal-overlay" isOpen={this.state.isOpen} onRequestClose={this.handleCancel}>
                <Paper className="modal-form">
                    <h3>{!this.state.id ? 'Adding a new comment' : 'Editing a comment'}</h3>
                    <form noValidate autoComplete="off">
                        <TextField fullWidth={true} required={true} id="body" label="Body" multiline={true} value={this.state.body} onChange={this.handleChange('body')} />
                        <TextField fullWidth={true} required={true} id="author" label="Author" value={this.state.author} onChange={this.handleChange('author')} />

                        <Button raised={true} color="primary" onClick={this.handleSubmit}>Save</Button>
                        <Button raised={true} onClick={this.handleCancel}>Cancel</Button>
                    </form>
                </Paper>
            </Modal>
        );
    }
}

export default connect()(CommentAddEditModalForm);
