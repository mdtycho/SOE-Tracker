import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChartComponent from '../ChartComponent/ChartComponent';
import HomePage from '../Home/Home';

function ChartRouter(props) {
    return (
        <Router>
            <Switch>
                <Route path='/charts/:cid' component={ChartComponent} />
                <Route path='/*' component={HomePage} />
            </Switch>
        </Router>
    );
};

export default ChartRouter;