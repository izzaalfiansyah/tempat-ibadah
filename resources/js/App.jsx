import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Index from './component/Index.jsx';
import Admin from './component/Admin.jsx';
import Login from './component/Login.jsx';
import Tempat from './component/Tempat.jsx';

export default class App extends React.Component
{
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact={true} path="/">
                        <Index />
                    </Route>
                    <Route path="/tempat/:id">
                        <Tempat />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        )
    }
}