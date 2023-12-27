import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import {createBrowserRouter, RouteProvider} from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Dashboard></Dashboard>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
