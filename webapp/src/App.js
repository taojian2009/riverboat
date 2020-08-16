import React from 'react';
import Finance from "./pages";
import Login from "./pages/login";
import PrivateRoute from "./pages/auth"
import history from "./utils/history.js"
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
                <Route path="/login" exact component={Login}/>
            </Switch>
        </Router>
    )
}

export default App;
