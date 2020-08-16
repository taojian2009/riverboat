import React from 'react';
import Finance from "./pages";
import Login from "./pages/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";

const App = () => {

    return (
        <Router>
            <Switch>
                <Route path="/" exact render={() => <Finance/>}/>
                <Route path="/login" exact render={() => <Login/>}/>
            </Switch>
        </Router>
    )
}

export default App;
