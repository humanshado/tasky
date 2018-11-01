import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../App';
import LogOut from './LogOut';
import * as routes from '../constants/routes';

const SideNav = () => {
        return (
            <div className="side-nav">
                    <img src="#" alt="user"/>
                    <h3>User Name</h3>
                    <br />
                <AuthUserContext.Consumer >
                    {authUser =>
                        authUser
                        ? <NavAuth />
                        : <NavNonAuth />
                    }
                </AuthUserContext.Consumer >
                    <hr />
                    <h3>Analytics</h3>
                </div>
        )
}

const NavAuth = () => {
    return (
        <ul>
            <li><Link to={routes.HOME}>Home</Link></li>
            <li><Link to={routes.USER_HOME}>User Home</Link></li>
            <li><Link to={routes.USER_ACCOUNT}>User Account</Link></li>
            <br />
            <li><LogOut /></li>
        </ul>
    )
}

const NavNonAuth = () => {
    return (
        <ul>
            <li><Link to={routes.LOG_IN}>Log In</Link></li>
            <li><Link to={routes.HOME}>Home</Link></li>
        </ul>
    )
}

export default SideNav;