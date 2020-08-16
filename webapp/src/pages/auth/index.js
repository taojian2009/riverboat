import React from 'react';
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    const isLogin = localStorage.getItem("token") ? true : false;
    return ((
        <Route {...rest} render={(props) => (
            isLogin
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}/>
    ))
}

export default PrivateRoute;

