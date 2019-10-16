import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import create_profesors from "./components/create_profesors";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import lista_profesora from "./components/lista_profesora";
import profesor from "./components/profesor";
import Navbar from "./components/Navbar";
import register from "./components/register";
import login from "./components/login";
import edit_profesor from "./components/edit_profesor";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/profesors/:id" component={profesor} />
          <Route path="/create" component={create_profesors} />
          <Route exact path="/" component={lista_profesora} />
          <Route path="/register" component={register} />
          <Route path="/login" component={login} />
          <Route path="/:id/edit" component={edit_profesor} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
