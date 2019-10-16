import React, { Component } from "react";
import logo from "./sum.png";
import axios from "axios";
import "../App.css";
import { Redirect, Link } from "react-router-dom";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logiran: false
    };
    this.odjava = this.odjava.bind(this);
    this.prijava = this.prijava.bind(this);
  }
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
  odjava(e) {
    e.preventDefault();

    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            logiran: false
          });
        }
      });
  }
  prijava = () => {};
  render() {
    return (
      <nav className="nav-wrapper blue darken-3">
        <div className="container">
          <div class="header">
            <div class="title-holder">
              <img src={logo} />
            </div>
            {this.state.logiran ? (
              <div className="desno">
                <button className="btn btn-secondary" onClick={this.odjava}>
                  Odjava
                </button>
              </div>
            ) : (
              <div className="desno">
                <span className="btn btn-info">
                  <Link to="/login">Prijava </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
