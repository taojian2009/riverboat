import React from 'react';
import Finance from "./pages";
import Login from "./pages/login";
import SqlBuffet from './pages/sqlbuffet'
import PrivateRoute from "./pages/auth"
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
                <Route path="/query/query_result/query_id/?:" exact component={SqlBuffet}/>
            </Switch>
        </Router>
    )
}

export default App;
