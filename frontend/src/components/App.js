import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import CategoryList from './CategoryList';

import '../css/App.css';
import logo from '../images/logo.svg';

const theme = createMuiTheme({
    palette: {
        type: 'light'
    }
});

const App = (props) => {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Readable</h1>
                </header>
                <div className="app-content">
                    <CategoryList />
                    {props.children}
                </div>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
