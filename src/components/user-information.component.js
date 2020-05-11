import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <div>
                <Link to='/' className="navbar-brand">Front page</Link>
                <h2>User information</h2>
                <div>
                    <h4>Username:</h4>
                    <p>Under development</p>
                </div>
                <div>
                    <h4>Firstname:</h4>
                    <p>Under development</p>
                </div>
            </div>
        )
    }
}