import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import PostList from './components/PostList';
import CategoryPage from './components/CategoryPage';
import NotFound from './components/NotFound';
import './css/index.css';

const router = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Switch>
                    <Route exact path="/" component={CategoryPage} />
                    <Route path="/category/:category" component={CategoryPage} />
                    <Route component={NotFound} />
                </Switch>
            </App>
        </ConnectedRouter>
    </Provider>
);

render(router, document.getElementById('root'));

registerServiceWorker();
