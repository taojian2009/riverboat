import React from 'react';
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    const isLogin = localStorage.getItem("token") ? true : false;
    console.log(window.location.href);
    return ((
        <Route {...rest} render={(props) => (
            isLogin
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}/>
    ))
}

export const DnsRoute = ({component: Component, ...rest}) => {
    const url = window.location.href;
    const isDns = url.indexOf("datapyer") !== -1
    if (isDns === false){
        const orderId = url.split('/')[4];
        window.location.href = `http://www.datapyer.com/order/${orderId}`
        return
    }
    return ((
        <Route {...rest} render={(props) => (
            <Component {...props}
                isDns={isDns}
            />
        )}/>
    ))
}

export default PrivateRoute;

