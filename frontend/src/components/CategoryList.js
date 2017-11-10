import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List, { ListItem, ListSubheader, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

import { getCategories } from '../actions';

class CategoryList extends Component {

    componentWillMount() {
        // Only try to fetch the categories if we don't have any yet
        if (!this.props.categories.length) {
            this.props.dispatch(getCategories());
        }
    }

    render() {
        const { categories, router: { location: { pathname }}} = this.props;

        return (
            <Paper className="category-list">
                <List>
                    <Link to="/">
                        <ListItem button={true}>
                            <ListItemText className={pathname === '/' ? 'active' : ''} primary="Home" />
                        </ListItem>
                    </Link>
                    <ListSubheader>Categories</ListSubheader>
                    {categories.map(category => (
                        <Link key={category.path} to={`/category/${category.path}`}>
                            <ListItem button={true}>
                                <ListItemText className={pathname === `/category/${category.path}` ? 'nested active' : 'nested'} primary={category.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Paper>
        );
    }
}

function mapStateToProps (state) {
    return {
        categories: state.categories,
        router: state.router
    };
}

export default connect(mapStateToProps)(CategoryList);
