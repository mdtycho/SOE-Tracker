import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Navigation from '../Navigation/Navigation';
import SignUpPage from "../Signup/Signup";
import HomePage from '../Home/Home';
import ChartRouter from '../ChartRouter/ChartRouter';


import * as ROUTES from '../../constants/routes';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00BCD4'
        },
        secondary: {
            main: '#607D8B',
        },
        success: {
            main: '#4CAF50',
        },
        warning: {
            main: '#FF9800',
        },
        error: {
            main: '#E91E63',
        },
        type: 'dark',
    },
});


function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <CssBaseline />

                <Router>
                    <div>
                        <Navigation />

                        <Route exact path={ROUTES.LANDING} component={HomePage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />

                        <Route path={ROUTES.CHART} component={ChartRouter} />
                    </div>
                </Router>
            </React.Fragment>
        </ThemeProvider>
    )
};

export default App;