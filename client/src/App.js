import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SignIn from "./Components/SignIn";
import { Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";

class App extends Component {
  render() {
    return (
      <div className="App" style={{backgroundColor: "#fafafa"}}>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  This is the homepage of Certification webpage.
                  <br />
                </p>
              </header>
            )}
          />
          <Route path="/login" render={() => <SignIn />} />
        </Switch>
      </div>
    );
  }
}

export default App;
