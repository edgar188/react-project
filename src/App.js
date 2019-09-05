import './App.css';
import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from './js/routh/history';
import Header from "./js/components/Header";
import Footer from "./js/components/Footer";
import Main from "./js/components/Main";
import Home from "./js/components/Home";
import Admin from './js/components/Admin';

export default function App() {

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        {console.log(history)}
        <Switch> 
          <Route path={process.env.PUBLIC_URL+"/Home"} component={Home} />
          <Route path={process.env.PUBLIC_URL+"/Admin"} component={Admin} />
          <Route path={process.env.PUBLIC_URL+"/"} component={Main} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

