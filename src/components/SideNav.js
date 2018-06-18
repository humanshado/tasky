import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

class SideNav extends Component {
    render () {
        return (
            <div className="side-nav">
                <h3>Profile</h3>
                <br />
                <img src="#" alt="user"/>
                <h3>User Name</h3>
                <br />
                <ul>
                    <li><Link to={routes.LOG_IN}>Log In</Link></li>
                    <li><Link to={routes.LANDING}>Landing</Link></li>
                    <li><Link to={routes.HOME}>Home</Link></li>
                    <li><Link to={routes.USER_ACCOUNT}>User Account</Link></li>
                </ul>
                <hr />
                <h3>Analytics</h3>
                
            </div>
        )
    }
}

export default SideNav;