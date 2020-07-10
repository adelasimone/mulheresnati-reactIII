import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main/index';
import Biography from './pages/Biography/Biography';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={() => <Main/>}/>
            <Route path="/biography/:id" component={Biography}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;