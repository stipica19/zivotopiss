import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";


export class edit_profesor extends Component {

    constructor(props){
        super(props);
        this.onChangeIme = this.onChangeIme.bind(this);
        this.onChangePrezime = this.onChangePrezime.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUstanovaZaposlenja = this.onChangeUstanovaZaposlenja.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeAkademskiStupanj = this.onChangeAkademskiStupanj.bind(this);
        this.onChangePredmetiKojeIzvodi = this.onChangePredmetiKojeIzvodi.bind(this);
        this.onChangeStudijNaKojimaPredaje = this.onChangeStudijNaKojimaPredaje.bind(this);
        this.onChangeKratkiZivotopis = this.onChangeKratkiZivotopis.bind(this);
        this.onChangeRadoviITakoTo = this.onChangeRadoviITakoTo.bind(this);
        this.onChangePopisRadova = this.onChangePopisRadova.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //this.routeChange = this.routeChange.bind(this);
        this.state={
            profesor : {},
            fakultets : [],
            studiji :[],
            selectedItems: [],
            predmetiKojeIzvodi: [{ naziv: "" }],
            ime : '',
            ustanovaZaposlenja: '',
        }
    }

      componentDidMount() {
        let id = this.props.match.params.id;
        Promise.all([
         
          axios.get('http://localhost:5000/profesor/add', {withCredentials: true}), //kupi sve faxove
          axios.get('http://localhost:5000/fakulteti/studiji',  {withCredentials: true}),
          axios.get("http://localhost:5000/profesor/" + id +"/edit",{withCredentials: true}) 

        ])
       
        .then(([faxResponse, studiResponse,profResponse]) => {
            
  console.log(profResponse.data.pronadjenProfesor.predmetiKojeIzvodi);
                this.setState({
                     fakultets : faxResponse.data,
                     studiji : studiResponse.data,
                     profesor: profResponse.data.pronadjenProfesor,
                     ustanovaZaposlenja: faxResponse.data[0]._id,
                     predmetiKojeIzvodi: profResponse.data.pronadjenProfesor.predmetiKojeIzvodi
                    });
                   
            });
      }

    handleShareholderNameChange = idx => evt =>{
        const newShareholders = this.state.predmetiKojeIzvodi.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, naziv: evt.target.value };
                });

        this.setState({ predmetiKojeIzvodi: newShareholders });
    };
    handleRemoveShareholder = idx => () => {
        this.setState({
            predmetiKojeIzvodi: this.state.predmetiKojeIzvodi.filter((s, sidx) => idx !== sidx)
        });
    };

    handleAddShareholder = () => {
        this.setState({
            predmetiKojeIzvodi: this.state.predmetiKojeIzvodi.concat([{ naziv: "" }])
        });
    };
    onChangeUstanovaZaposlenja(e) {
        const profesor = this.state.profesor;
        profesor.ustanovaZaposlenja = e.target.value;
        this.setState({ profesor: profesor });
    }
    
    onChangeStudijNaKojimaPredaje(e) {
        const profesor = this.state.profesor;
        profesor.studijNaKojimaPredaje = e.target.value;
        this.setState({ profesor: profesor });
    }
    onChangeKratkiZivotopis(e) {
        const profesor = this.state.profesor;
        profesor.kratkiZivotopis = e.target.value;
        this.setState({ profesor: profesor });
    }
    onChangeRadoviITakoTo(e) {
        const profesor = this.state.profesor;
        profesor.RadoviITakoTo = e.target.value;
        this.setState({ profesor: profesor });
    }
    onChangePopisRadova(e) {
        const profesor = this.state.profesor;
        profesor.popisRadova = e.target.value;
        this.setState({ profesor: profesor });
    }
    onChangeIme(e) {
        const profesor = this.state.profesor;
        profesor.ime = e.target.value;
        this.setState({ profesor: profesor });
    }
  

    onChangePrezime(e) {
        const profesor = this.state.profesor;
        profesor.prezime = e.target.value;
        this.setState({ profesor: profesor });
    }

    onChangeEmail(e) {
        const profesor = this.state.profesor;
        profesor.mail = e.target.value;
        this.setState({ profesor: profesor });
    }
    onChangeDate(date) {
        const profesor = this.state.profesor;
        profesor.datumZadnjeUzvanja = date.target.value;
        this.setState({ profesor: profesor });

    }

    onChangeAkademskiStupanj(e) {
        const profesor = this.state.profesor;
        profesor.akademskiStupanj = e.target.value;
        this.setState({ profesor: profesor });
    }
    onChangePredmetiKojeIzvodi(e) {
        const profesor = this.state.profesor;
        profesor.predmetiKojeIzvodi = e.target.value;
        this.setState({ profesor: profesor });
    }



    onSubmit(e) {
        e.preventDefault();
        let id = this.props.match.params.id;
        console.log(this.state.profesor.ime);
        const profesor = {
            ime: this.state.profesor.ime,
            prezime: this.state.profesor.prezime,
            mail: this.state.profesor.mail,
            selectedItems:this.state.profesor.selectedItems, 
            ustanovaZaposlenja: this.state.profesor.ustanovaZaposlenja,
          //datumZadnjegIzboraUZvanje: this.state.profesor.datumZadnjegIzboraUZvanje,
            akademskiStupanj: this.state.profesor.akademskiStupanj,
            predmetiKojeIzvodi: this.state.profesor.predmetiKojeIzvodi,
            studijNaKojimaPredaje: this.state.profesor.studijNaKojimaPredaje,
            kratkiZivotopis: this.state.profesor.kratkiZivotopis,
            RadoviITakoTo: this.state.profesor.RadoviITakoTo,
            popisRadova: this.state.profesor.popisRadova
        }
        
      
    
       
       axios.put("http://localhost:5000/profesor/" + id , profesor, {withCredentials: true})
            .then(res => console.log(res.data));
            
    }
 render() {
     // console.log(this.state.profesor.profesor);
        return (
            <div>
                     <h3>Editovanje profesora</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group  ">
                        <label>Ime: </label>
                        <input type="text"
                            style={{width: "370px"}}
                            required
                            className="form-control"
                            value={this.state.profesor.ime}
                            onChange={this.onChangeIme}
                        />
                    </div>
                     <div className="form-group">
                        <label>Prezime: </label>
                        <input
                        style={{width: "370px"}}
                            type="text"
                            className="form-control"
                            value={this.state.profesor.prezime}
                        onChange={this.onChangePrezime}
                        />
                    </div>

                    <div className="form-group">
                        <label>E-mail: </label>
                        <input
                        style={{width: "370px"}}
                            type="text"
                            className="form-control"
                            value={this.state.profesor.mail}
                            onChange={this.onChangeEmail}
                        />
                    </div>

                


                    <div className="form-group">
                        <label>Ustanova zaposljenja: </label>
                        <select 
                            
                            style={{width: "370px"}}
                            required
                            className="form-control"
                            value={this.state.ustanovaZaposlenja}
                            onChange={this.onChangeUstanovaZaposlenja}>
                            {
                                this.state.fakultets.map(function (fax,index) {
                                    return <option
                                        key={index}
                                        value={fax._id}>{fax.naziv}
                                    </option>;
                                })
                            }
                        </select>
                        <br/>
                        <label>Fakultete na kojima radite </label>
                        <Select isMulti 
                               
                                placeholder = "Odaberite fakultete na kojima radite"
                                value={this.state.profesor.selectedItems}
                                onChange={this.handleChange}
                                options={this.state.fakultets.map((fax, index) => {
                                    return {
                                        
                                       label: fax.naziv,
                                       value: fax._id,
                                       key: index
                                    }
                                 })
                              } />
                       

                    </div>
             {/*      
                    <div className="form-group">
                        <label>datumZadnjegIzboraUZvanje: </label>
                        <div>
                            <DatePicker
                                selected={this.state.profesor.datumZadnjegIzboraUZvanje}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div> */}

                    <div className="radio">
                                <label >
                                    <input type="radio" value="docent"  className="circle"
                                                checked={this.state.profesor.akademskiStupanj === 'docent'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                Docent
                                </label>

                                <label>
                                    <input type="radio" value="asistent"  className="ml-3"
                                                checked={this.state.profesor.akademskiStupanj === 'asistent'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                Asistent
                                </label>

                                <label>
                                    <input type="radio" value="visiAsisten" className="ml-3"
                                                checked={this.state.profesor.akademskiStupanj === 'visiAsisten'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                Visi Asisten
                                </label>

                                <label>
                                    <input type="radio" value="predavac" className="ml-3"
                                                checked={this.state.profesor.akademskiStupanj === 'predavac'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                Predavac
                                </label>

                                <label>
                                    <input type="radio" value="izvProf" className="ml-3"
                                                checked={this.state.profesor.akademskiStupanj === 'izvProf'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                izv. Prof
                                </label>

                                <label>
                                    <input type="radio" value="redProf" className="ml-3"
                                                checked={this.state.profesor.akademskiStupanj === 'redProf'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                red. Prof
                                </label>
                     </div>

 
                    <div >
                        <label >Predmeti koje izvodi:</label><br />
                        {this.state.predmetiKojeIzvodi.map((shareholder, idx) => (
                            <div className="form-group"  key={idx}>
                                <input
                                    type="text"
                                    style={{width: "370px"}}
                                    placeholder={`Predmet ${idx + 1} `}
                                    value={shareholder.naziv}
                                    onChange={this.handleShareholderNameChange(idx)}
                                />
                                <button
                                    type="button"
                                    onClick={this.handleRemoveShareholder(idx)}
                                    className="small">-</button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={this.handleAddShareholder}
                        className="small"> + </button>

                        <Select isMulti 
                               
                                placeholder = "Odaberite studije"
                                value={this.state.profesor.studijNaKojimaPredaje}
                                onChange={this.onChangeStudijNaKojimaPredaje}
                                options={this.state.studiji.map((studi, index) => {
                                    return {
                                        
                                       label: studi.naziv,
                                       value: studi._id,
                                       key: index
                                    }
                                 })
                              } /> 

                    <div className="form-group">
                        <label>kratkiZivotopis: </label>
                        <input
                        style={{width: "370px"}}
                            type="text"
                            className="form-control"
                            value={this.state.profesor.kratkiZivotopis}
                            onChange={this.onChangeKratkiZivotopis}
                        />
                    </div>

                    <div className="form-group">
                        <label>RadoviITakoTo: </label>
                        <input
                        style={{width: "370px"}}
                            type="text"
                            className="form-control"
                            value={this.state.profesor.RadoviITakoTo}
                            onChange={this.onChangeRadoviITakoTo}
                        />
                    </div>

                    <div className="form-group">
                        <label>popisRadova: </label>
                        <input
                        style={{width: "370px"}}
                            type="text"
                            className="form-control"
                            value={this.state.profesor.popisRadova}
                            onChange={this.onChangePopisRadova}
                        />
                    </div>
 
                    

                    <div className="form-group">
                        <input type="submit"   value="Dodajte profesora" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default edit_profesor
