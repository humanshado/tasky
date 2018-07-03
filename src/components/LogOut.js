import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

class LogOut extends Component {

    componentWillUnmount = () => {
        this.props.history.push(routes.HOME);
    }
    
    render(){
        return (
            <button 
                type="button" 
                onClick={auth.doLogOut}
            >
                Log Out
            </button>
        );
    }
}

export default withRouter(LogOut);
