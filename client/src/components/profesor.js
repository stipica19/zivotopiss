import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Redirect } from "react-router-dom";
import jsPDF from "jspdf";

import { Container, Row, Col } from "reactstrap";

export class profesor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profesor: null,
      fakultet: null,
      selectedItems: [],
      logiran: true,
      redirect: false,
      tinggi: "11.69",
      lebar: "08.27"
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get("http://localhost:5000/profesor/" + id).then(res => {
      console.log(res.data.pronadjenProfesor._id);
      this.setState({
        profesor: res.data.pronadjenProfesor,
        fakultet: res.data.pronadjenFakultet,
        id: res.data.pronadjenProfesor._id,
        selectedItems: res.data.pronadjenProfesor.selectedItems
      });
    });
  }
  unduhPdf(e) {
    e.preventDefault();

    var doc = new jsPDF("p", "pt");

    doc.text(20, 20, "Ime : " + this.state.profesor.ime);
    doc.text(20, 40, "Prezime : " + this.state.profesor.prezime);
    doc.text(20, 60, "E-mail : " + this.state.profesor.mail);
    doc.text(
      20,
      80,
      "Akademski stupanj : " + this.state.profesor.akademskiStupanj
    );
    doc.text(
      20,
      100,
      "Predmeti koje izvodi : " +
        this.state.profesor.predmetiKojeIzvodi[0].naziv
    );
    doc.text(
      20,
      60,
      "Ustanova zaposlenja : " + this.state.profesor.ustanovaZaposlenja
    );
    doc.text(
      20,
      60,
      "Kratki životopis : " + this.state.profesor.kratkiZivotopis
    );

    doc.save("Generated.pdf");
  }

  onSubmit = (e, profesor) => {
    const id = this.state.profesor._id;
    console.log("Profesor kojeg smo upravo izbrisali " + id);

    axios
      .delete("http://localhost:5000/profesor/" + id)
      .then(() => this.setState({ redirect: true }));
    this.props.history.push(`/`);
  };

  fakulteti() {
    return this.state.selectedItems.map(studi => {
      return (
        <li value={studi} key={studi._id} className="lista-studija">
          {studi.label}
        </li>
      );
    });
  }
  studiji() {
    return this.state.profesor.studijNaKojimaPredaje.map(studi => {
      return (
        <li value={studi} key={studi._id} className="lista-studija">
          {studi.label}
        </li>
      );
    });
  }
  predmeti() {
    return this.state.profesor.predmetiKojeIzvodi.map(predmet => {
      return (
        <li value={predmet} key={predmet._id} className="lista-studija">
          {predmet.naziv}
        </li>
      );
    });
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    console.log("-->   " + this.state.studijNaKojimaPredaje);
    const post = this.state.profesor ? (
      <Container>
        <Row>
          <Col sm={4}>
            <div class="section-left">
              <div class="wrapper">
                <div class="lists">
                  <div className="slika">
                    <img
                      src="data:image/jpeg;base64,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"
                      width="200"
                    />
                  </div>
                  <h2 className="left-h2">
                    {this.state.profesor.ime} {this.state.profesor.prezime}
                  </h2>
                  <h2 className="left-h2">
                    {this.state.profesor.akademskiStupanj + " "}
                  </h2>
                </div>

                <br></br>
                <div class="lists">
                  <h2 className="left-h2">KONTAKT</h2>
                  <p className="left-h2">
                    <i class="fas fa-phone"></i> +387 63 543 324
                  </p>
                  <p className="left-h2">
                    {" "}
                    <i class="fas fa-envelope"></i> {this.state.profesor.mail}
                  </p>
                  <p className="left-h2">
                    {" "}
                    <a href="https://facebook.com/">www</a>
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={8}>
            <div class="wrapper">
              <div class="content">
                <h2>Životpis</h2>
                <p>{this.state.profesor.kratkiZivotopis}</p>
              </div>

              <div class="content">
                <h2>Fakulteti na kojima radi</h2> <ul>{this.fakulteti()} </ul>
                <h2>Studiji na kojima predaje</h2>
                <ul>{this.studiji()}</ul>
                <h2>Predmeti koje izvodi</h2>
                <ul>{this.predmeti()}</ul>
              </div>
            </div>
          </Col>
          <button
            onClick={this.unduhPdf.bind(this)}
            variant="raised"
            color="secondary"
            style={{ margin: "5px" }}
          >
            Preuzmi biografiju
          </button>
          ;
        </Row>
        {!this.state.logiran ? (
          <p>Uredi</p>
        ) : (
          <button type="submit" onClick={e => this.onSubmit(e, profesor)}>
            Izbrisi
          </button>
        )}
      </Container>
    ) : (
      <div className="center">
        <p>Loading post...</p>
      </div>
    );

    return <div className="container">{post}</div>;
  }
}

export default profesor;
