import React, { Component } from 'react';
import * as routes from '../constants/routes';

class UserHome extends Component {
    
    componentDidMount = () => {
        console.log('props in Home', this.props);
        const { user, history } = this.props;
        if(!user){
            history.push(routes.LOG_IN)
        }
    }
    
    render(){
        const { user } = this.props;
        return (
            <div>
                <h1>Welcome to your Home Page of {user && user.email || null }</h1>
            </div>
        );
    }
}

export default UserHome;