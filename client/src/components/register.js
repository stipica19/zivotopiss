import React, { Component } from 'react';
import axios from 'axios';

export default class register extends Component {
    constructor(props){
        super(props);
        this.state={
            username:''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
    }
    onChangeUsername (e){
        this.setState({
            username:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
            const username = {
                username:this.state.username
            }
            console.log(this.state.username);
        axios.post('http://localhost:5000/register', username)
            .then(res => console.log(res.data));
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="email" name="username" placeholder="email"  value={this.state.username}  onChange={this.onChangeUsername} />
                    <button type="submit" >Register</button>
                </form>
            </div>
        )
    }
}
