import React from 'react';
import jwt_decode from 'jwt-decode';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={({ props, location }) => (
        /*TODO: change after securing token*/
        /*TODO: fix check token validity*/
        (localStorage.getItem("token") && jwt_decode(localStorage.getItem("token")).exp >= Math.floor(Date.now() / 1000))
            ? <Component {...props} />
            : <Redirect to={{
                pathname: "/login",
                state: { from: location }
            }} />
    )} />
);

export default GuardedRoute;
