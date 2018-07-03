import React, { Component } from 'react';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChangeForm';
import * as routes from '../constants/routes';

class UserAccount extends Component {

    componentDidMount = () => {
        console.log('props in UserAccount', this.props);
        const { user, history } = this.props;
        if (!user) {
            history.push(routes.LOG_IN)
        }
    }

    render(){
        const { user } = this.props;
        return (
            <div>
                <h1>Account: {user && user.email || null }</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        );
    }
};

export default UserAccount;