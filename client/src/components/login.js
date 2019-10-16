import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";

export class login extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: "",
      password: "",
      logiran: false,
      redirectTo: null,
      loggedIn: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  updateUser(userObject) {
    this.setState({ userObject });
  }
  //spremi response u varijablu i onda je proslijedi kao state/props isti kurac
  componentDidMount() {
    axios
      .get("http://localhost:5000/login", { withCredentials: true })
      .then(response => {
        console.log(response.data);
        this.setState({ logiran: response.data.logiran });
      })

      .catch(error => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    console.log(this.state.redirect);
    console.log(this.state.username);

    axios
      .post(
        "http://localhost:5000/login",
        {
          username: this.state.username,
          password: this.state.password
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          console.log("login response:sass ");

          this.setState({
            logiran: true,
            username: response.data.username
          });
          console.log(this.state.logiran, this.state.username);
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  }
  renderRedirect = () => {
    if (this.state.logiran) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}

        <form onSubmit={this.onSubmit}>
          <input
            type="email"
            name="username"
            placeholder="email"
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
          <button type="submit">Prijava</button>
        </form>
      </div>
    );
  }
}

export default login;
