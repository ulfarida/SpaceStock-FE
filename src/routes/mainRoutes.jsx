import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Home from '../pages/home'
import Detail from '../pages/detail'
import NotFound from '../pages/notFound'

const MainRoutes = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/notFound' component={NotFound} />
                    <Route exact path='/:id' component={Detail} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default MainRoutes;