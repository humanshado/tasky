import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../App';
import LogOut from './LogOut';
import * as routes from '../constants/routes';
import UserAccount from './UserAccount';

const SideNav = (props) => {
        return (
            <AuthUserContext.Consumer >
                {authUser =>
                    <div className="side-nav">
                        <img src={authUser && authUser.photoURL || require('../utils/images/default-user.png')} alt="user"/>
                        <h3>{authUser ? (authUser.displayName || 'No Name') : 'Not loggged in'}</h3>
                        <br />
                        { authUser ? <NavAuth /> : <NavNonAuth /> }
                        <hr />
                        <h3>Analytics</h3>
                    </div>
                }
            </AuthUserContext.Consumer >
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
        <div>
            <ul>
                <li><Link to={routes.LOG_IN}>Log In</Link></li>
                <li><Link to={routes.HOME}>Home</Link></li>
            </ul>
            <br />
            Create an account, if you don't have one
            <Link to={routes.SIGN_UP}> Sign Up</Link>
        </div>
    )
}

export default SideNav;