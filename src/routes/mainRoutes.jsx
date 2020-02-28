import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Home from '../pages/home'
import Detail from '../pages/detail'

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/:id' component={Detail} />
            </Switch>
        </BrowserRouter>
    )
}

export default MainRoutes;