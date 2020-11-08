import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={({ props, location }) => (
        /*TODO: change after securing token*/
        localStorage.getItem("token")
            ? <Component {...props} />
            : <Redirect to={{
                pathname: "/login",
                state: { from: location }
            }} />
    )} />
);

export default GuardedRoute;
