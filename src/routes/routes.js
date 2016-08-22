'use strict';

var React = require('react');
import { Router, Route, Link, IndexRedirect } from 'react-router';
import { hashHistory } from 'react-router';
import { browserHistory } from 'react-router';

import { Home } from '../components/home';

var Routes = (
    <Router history={hashHistory}>
        <Route path='/' component={Home} />
        <Route path='/*' component={err} />
    </Router>
);

module.exports = Routes;