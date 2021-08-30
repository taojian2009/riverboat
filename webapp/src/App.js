import React from 'react';
import Finance from "./pages";
import Login from "./pages/login";
import PrivateRoute from "./pages/auth"
import Membership from "./pages/membership";
import OrderDetail from './pages/membership/order';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";

const App = () => {

    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact component={Finance}/>
                <PrivateRoute path="/membership" exact component={Membership}/>
                <Route path="/order/:order_id" exact component={OrderDetail}/>
                <Route path="/login" exact component={Login}/>
            </Switch>
        </Router>
    )
}

export default App;
