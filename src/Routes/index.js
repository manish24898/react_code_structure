import React, { Component } from 'react';

import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RouterService } from '../Services';
import { Routes } from '../Config';

import { CustomDrawer } from '../Components/Cell';
/**
 * Routes
 */
import HomePage from './Home';

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter ref={ref => {
                if (ref) {
                    RouterService.setHistoryRef(ref.history)
                }
            }}>
                <Switch>
                    <Route exact path={Routes.HOME} component={HomePage} />
                </Switch>
                {<CustomDrawer />}
            </BrowserRouter >
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
})


export default connect(mapStateToProps)(AppRouter);
