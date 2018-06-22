import React from 'react';
import { auth } from '../firebase';

const LogOut = () => {
    return (
        <button type="button" onClick={auth.doLogOut}>
            Log Out
        </button>
    )
}

export default LogOut;
