import React, { Component } from 'react';
import { auth } from '../firebase';

class PasswordChangeForm extends Component {
    constructor (props) {
        super(props);

         this.state = {
             password1:'',
             password2: '',
             error: null
         }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { password1, password2, error } = this.state;

        auth.doPasswordUpdate(password1)
            .then(() => {
                this.setState({
                    password1: '',
                    password2: ''
                })
            }).catch(error => this.setState({ error }))
    }

    render(){
        const { password1, password2, error } = this.state;
        const isInvalid = password1 !== password2 || password1 === '' || password2 === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="password"
                    value={password1}
                    onChange={this.handleInput}
                    placeholder="New Password"
                />
                <input
                    type="password"
                    value={password2}
                    onChange={this.handleInput}
                    placeholder="Confirm New Password"
                />
                <button type="submit" disabled={isInvalid} >
                    Reset Password
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default PasswordChangeForm;