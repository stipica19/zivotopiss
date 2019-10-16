import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { Redirect } from 'react-router-dom';

import Select from "react-select";


export class create_profesors extends Component {
    constructor(props) {
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
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      
        this.onChangeSlika = this.onChangeSlika.bind(this);
        this.routeChange = this.routeChange.bind(this);

        this.state = {
            ime: '',
            prezime: '',
            mail: '',
            spol:'',
            ustanovaZaposlenja: '',
            datumZadnjegIzboraUZvanje: new Date(),
            akademskiStupanj: '',
            predmetiKojeIzvodi: [{ naziv: "" }],
            studijNaKojimaPredaje: [],
            kratkiZivotopis: '',
            RadoviITakoTo: '',
            popisRadova: '',
            fakultets: [],
            studiji :[],
            selectedItems: [],//faxovi na kojima radi
            isAdmin :true,
            file : null
         }
    }
   
       
    
    componentDidMount() {
      
        Promise.all([
         
          axios.get('http://localhost:5000/profesor/add', {withCredentials: true}), //dohvaća sve faxove
          axios.get('http://localhost:5000/fakulteti/studiji',  {withCredentials: true}), //dohvaća sve studije

        ])
      
        .then(([faxResponse, studiResponse]) => {
            if(faxResponse.data.isAdmin !== undefined){
            this.setState({
            isAdmin:faxResponse.data.isAdmin
        });
    }
            if(this.state.isAdmin){
                this.setState({
                     fakultets : faxResponse.data,
                     studiji : studiResponse.data,
                     ustanovaZaposlenja: faxResponse.data[0]._id
                    });}
                    else{
                        console.log(this.state.isAdmin);
                    }
            });
      }
   
    onChangeUstanovaZaposlenja(e) {
        this.setState({
            ustanovaZaposlenja: e.target.value
        })
    }
    
    onChangeSlika(e) {
        this.setState({file:e.target.files[0]});
    }

   
    onChangeStudijNaKojimaPredaje(StudijNaKojimaPredaje) {
        this.setState({
            studijNaKojimaPredaje:  StudijNaKojimaPredaje
        })
    }
    onChangeKratkiZivotopis(e) {
        this.setState({
            kratkiZivotopis: e.target.value
        })
    }
    onChangeRadoviITakoTo(e) {
        this.setState({
            RadoviITakoTo: e.target.value
        })
    }
    onChangePopisRadova(e) {
        this.setState({
            popisRadova: e.target.value
        })
    }
    onChangeIme(e) {
        this.setState({
            ime: e.target.value
        })
    }

    onChangePrezime(e) {
        this.setState({
            prezime: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            mail: e.target.value
        })
    }
    onChangeDate(date) {
         this.setState({
            datumZadnjegIzboraUZvanje: date
        })

    }

    onChangeAkademskiStupanj(e) {
        this.setState({
            akademskiStupanj: e.target.value
        })
    }
    onChangePredmetiKojeIzvodi(e) {
        this.setState({
            predmetiKojeIzvodi: e.target.value
        })
    }

    handleShareholderNameChange = idx => evt => {
        const newShareholders = this.state.predmetiKojeIzvodi.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, naziv: evt.target.value };
        });

        this.setState({ predmetiKojeIzvodi: newShareholders });
    };

    handleAddShareholder = () => {
        this.setState({
            predmetiKojeIzvodi: this.state.predmetiKojeIzvodi.concat([{ naziv: "" }])
        });
    };

    onChangeSpol= (event) => {
        this.setState({
          spol: event.target.value
        });
      }

    handleRemoveShareholder = idx => () => {
        this.setState({
            predmetiKojeIzvodi: this.state.predmetiKojeIzvodi.filter((s, sidx) => idx !== sidx)
        });
    };
    handleChange(selectedItems) {
        this.setState({
            selectedItems:  selectedItems
        })
    }
    routeChange() {
        let path = `/`;
        this.props.history.push(path);
      }
    
    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
       // formData.append('myImage',this.state.slika);
        const profesor = {
            ime: this.state.ime,
            prezime: this.state.prezime,
            mail: this.state.mail,
            selectedItems:this.state.selectedItems, 
            ustanovaZaposlenja: this.state.ustanovaZaposlenja,
            datumZadnjegIzboraUZvanje: this.state.datumZadnjegIzboraUZvanje,
            akademskiStupanj: this.state.akademskiStupanj,
            predmetiKojeIzvodi: this.state.predmetiKojeIzvodi,
            studijNaKojimaPredaje: this.state.studijNaKojimaPredaje,
            kratkiZivotopis: this.state.kratkiZivotopis,
            RadoviITakoTo: this.state.RadoviITakoTo,
            popisRadova: this.state.popisRadova
          ///  slika : this.state.slika
        }
        
      
        console.log(this.state.selectedItems);
       
       axios.post('http://localhost:5000/profesor', profesor, {withCredentials: true})
            .then(res => console.log(res.data));
            let path = `/`;
            this.props.history.push(path);
    }
   render() {
       console.log("safsafsaf");
    if (!this.state.isAdmin) return <Redirect to="/" />
         return (
             
            <div >

              
                <h3>Unosenje novog profesora</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group  ">
                        <label>Ime: </label>
                        <input type="text"
                            style={{width: "370px"}}
                            required
                            className="form-control"
                            value={this.state.ime}
                            onChange={this.onChangeIme}
                        />
                    </div>
                    <div className="form-group">
                        <label>Prezime: </label>
                        <input
                        style={{width: "370px"}}
                            type="text"
                            className="form-control"
                            value={this.state.prezime}
                        onChange={this.onChangePrezime}
                        />
                    </div>

                    <div className="form-group">
                        <label>E-mail: </label>
                        <input
                        style={{width: "370px"}}
                            type="text"
                            className="form-control"
                            value={this.state.mail}
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
                                value={this.state.selectedItems}
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
                    <div className="form-group">
                        <label>Datum zadnjeg uzvanja: </label>
                        <div>
                            <DatePicker
                                selected={this.state.datumZadnjegIzboraUZvanje}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="radio">
                                <label >
                                    <input type="radio" value="docent"  className="circle"
                                                checked={this.state.akademskiStupanj === 'docent'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                Docent
                                </label>

                                <label>
                                    <input type="radio" value="asistent"  className="ml-3"
                                                checked={this.state.akademskiStupanj === 'asistent'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                Asistent
                                </label>

                                <label>
                                    <input type="radio" value="visiAsisten" className="ml-3"
                                                checked={this.state.akademskiStupanj === 'visiAsisten'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                Visi Asisten
                                </label>

                                <label>
                                    <input type="radio" value="predavac" className="ml-3"
                                                checked={this.state.akademskiStupanj === 'predavac'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                Predavac
                                </label>

                                <label>
                                    <input type="radio" value="izvProf" className="ml-3"
                                                checked={this.state.akademskiStupanj === 'izvProf'} 
                                                onChange={this.onChangeAkademskiStupanj} />
                                izv. Prof
                                </label>

                                <label>
                                    <input type="radio" value="redProf" className="ml-3"
                                                checked={this.state.akademskiStupanj === 'redProf'} 
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
                                    value={shareholder.name}
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
                                value={this.state.studijNaKojimaPredaje}
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
                            value={this.state.kratkiZivotopis}
                            onChange={this.onChangeKratkiZivotopis}
                        />
                    </div>

                    <div className="form-group">
                        <label>RadoviITakoTo: </label>
                        <input
                        style={{width: "370px"}}
                            type="text"
                            className="form-control"
                            value={this.state.RadoviITakoTo}
                            onChange={this.onChangeRadoviITakoTo}
                        />
                    </div>

                    <div className="form-group">
                        <label>Popis radova: </label>
                        <input
                        style={{width: "370px"}}
                            type="text"
                            className="form-control"
                            value={this.state.popisRadova}
                            onChange={this.onChangePopisRadova}
                        />
                    </div>
                  {/*   <input type="file" name="myImage" onChange= {this.onChangeSlika} />
                <button type="submit">Upload</button> */}
                    <div className="form-group">
                        <input type="submit"   value="Dodajte profesora" className="btn btn-primary" />
                    </div>
                </form>
          
            </div >
        )
    }
}

export default create_profesors

