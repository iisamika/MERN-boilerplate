import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const loggedIn = this.props.loggedIn;
        return (
            <div>
                {loggedIn ? (
                    <h3>Login successful!</h3>
                ) : (
                        <h3>Logout successful!</h3>
                    )}
            </div>
        )
    }
}