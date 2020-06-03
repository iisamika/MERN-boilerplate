import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            editInformation: false
        }

        this.getUserInfo = this.getUserInfo.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.changeToInputBox = this.changeToInputBox.bind(this);
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        axios.get('/posts/user-info').then(res => {
            console.log("user-info", res.data);
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName
            });
            console.log('state:', this.state)
        });
    }

    changeToInputBox = () => {

        this.setState({
            editInformation: !this.state.editInformation,
        });

        console.log("Trying to edit!");
    }

    renderInfoEditor = () => {
        return <div>
            <div>
                <input type="text" defaultValue={this.state.firstName} ref="updateFirstName"></input>
            </div>
            <div>
                <input type="text" defaultValue={this.state.lastName} ref="updateLastName"></input>
            </div>
            <div>
                <input type="button" value="Update User Information!" onClick={this.updateUserInfo}></input>
            </div>
        </div>
    }

    renderDefaultInfo = () => {
        return <div>
            <h4>Firstname: </h4>
            <div>{this.state.firstName}</div>
            <h4>Lastname:</h4>
            <div>{this.state.lastName}</div>
            <div>
                <input type="button" value="Edit Button" onClick={this.changeToInputBox}></input>
            </div>
        </div>
    }

    updateUserInfo = () => {

        this.setState({
            editInformation: false,
            firstName: this.refs.updateFirstName.value,
            lastName: this.refs.updateLastName.value
        })

        console.log("Current state!", this.state);

        const updatedUserInfo = {
            firstName:  this.refs.updateFirstName.value,
            lastName: this.refs.updateLastName.value
        }

        axios.post('/posts/update-user-info', updatedUserInfo).then(res => {
            console.log("HELLO")
            if (res.status === 200) {
                this.setState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                });
            }
        }).catch(error => {
            console.log('Something went wrong!', error);
        });
    }

    render() {
        return this.state.editInformation ?
            this.renderInfoEditor() :
            this.renderDefaultInfo()
    }
}