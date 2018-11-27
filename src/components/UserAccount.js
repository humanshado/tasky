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
            <div className='user-account-page'>
                <h1>Account: {user && user.email || null }</h1>
                <div className='password-change-form'>
                    <PasswordChangeForm />
                </div>
                <div className='password-forget-form'>
                    <PasswordForgetForm />
                </div>

            </div>
        );
    }
};

export default UserAccount;