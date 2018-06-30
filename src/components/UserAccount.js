import React from 'react';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChangeForm';

const UserAccount = (props) => {
    return (
        <div>
            <h1>Account: </h1>
            <PasswordForgetForm />
            <PasswordChangeForm />
        </div>
    );
};

export default UserAccount;