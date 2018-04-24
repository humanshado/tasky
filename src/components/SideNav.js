import React, { Component } from 'react';

class SideNav extends Component {
    render () {
        return (
            <div className="side-nav">
                <h3>Profile</h3>
                <br />
                <img src="#" alt="user image"/>
                <h3>User Name</h3>
                <br />
                <ul>
                    <li>Log In</li>
                    <li>Log Out</li>
                    <li>Sign Up</li>
                </ul>
                <hr />
                <h3>Analytics</h3>
                
            </div>
        )
    }
}

export default SideNav;