import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component   {
    constructor(props)  {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName: '',
            passWord: '',
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount() {
        this.setState({

        });
    }

    onChangeUserName(e) {
        this.setState({
            userName: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            passWord: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            userName: this.state.userName,
            passWord: this.state.passWord,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        console.log(userData);

        axios.post('http://localhost:5000/posts/add', userData)
            .then(res => console.log(res.data));

        this.setState({
            userName: '',
            passWord: '',
            firstName: '',
            lastName: ''
        }) 
    }

    render()    {
        return(
            <div>
                <h3>Create new user!</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Username: </label>
                        <input type = "text" required className = "form-control" value = {this.state.userName} onChange = {this.onChangeUserName}></input>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type = "password" required className = "form-control" value = {this.state.passWord} onChange = {this.onChangePassword}></input>
                    </div>
                    <div>
                        <label>First Name</label>
                        <input type = "text" className = "form-control" value = {this.state.firstName} onChange = {this.onChangeFirstName}></input>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type = "text" className = "form-control" value = {this.state.lastName} onChange = {this.onChangeLastName}></input>
                    </div>
                    <div>
                        <input type = "submit" value = "Create User!" className = "btn"></input>
                    </div>
                </form>
            </div>
        )
    }
}