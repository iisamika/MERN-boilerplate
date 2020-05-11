import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeErrorMessage = this.onChangeErrorMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName: '',
            passWord: '',
            errorMessage: ''
        }
    }

    onChangeUserName(event) {
        this.setState({
            userName: event.target.value
        });
    }

    onChangePassword(event) {
        this.setState({
            passWord: event.target.value
        });
    }

    onChangeErrorMessage(event) {
        this.setState({
            errorMessage: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const loginData = {
            userName: this.state.userName,
            passWord: this.state.passWord
        }

        axios.post('http://localhost:5000/posts/login', loginData)
            .then(res => {

                console.log('login response: ', res);
                console.log(this.props.updateUser);
                if(res.status === 200) {
                    this.props.updateUser({
                        loggedIn: true,
                        userName: res.data.userName
                    })

                    this.setState({
                        redirectTo: '/login-successful'
                    })
                    console.log('res.data', res.data);
                }

                console.log('res.data.userName', res.data.userName);
            })
            .catch(error => {this.setState({
                errorMessage: error.response.data.message
            });
        });

        this.setState({
            userName: this.state.userName,
            passWord: ''
        })
    }

    render() {
        if(this.state.redirectTo)   {
            return <Redirect to={{pathname: this.state.redirectTo}} />
        }else{
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <div className="form-group">
                                <label>Username: </label>
                                <input type="text" required className="form-control" value={this.state.userName} onChange={this.onChangeUserName}></input>
                            </div>
                            <div>
                                <label>Password: </label>
                                <input type="password" required className="form-control" value={this.state.passWord} onChange={this.onChangePassword}></input>
                            </div>
                            <div>
                                <input type="submit" value="Log in!" className="btn" onClick = {this.onSubmit}></input>
                            </div>
                            <div>
                                <p>{this.state.errorMessage}</p>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }
}