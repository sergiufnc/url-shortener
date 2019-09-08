import React from 'react';

import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import Home from "./components/home";
import Shortened from "./components/shortened";

import './App.css';

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/shortened/:code" component={Shortened} />
          </Switch>
      </Router>
  );
}

export default App;
