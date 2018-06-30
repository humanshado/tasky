import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';


//PasswordForget Component
const PasswordForget = () => {
    return (
        <div>
            <h1>Reset your password</h1>
            <PasswordForgetForm />
        </div>
    )
}

//PasswordForget Form
class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            error: null
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { email, error } = this.state;
       
        auth.doPasswordReset(email)
            .then(() => {
                this.setState({ email: '' })
            }).catch(error => this.setState({ error }))
    }

    render () {
        const { email, error } = this.state;
        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    value={email}
                    onChange={this.handleInput}
                    placeholder="Email Address"
                />
                <button type="submit" disabled={isInvalid}>
                    Reset Password
                 </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

//PasswordForget Link
const PasswordForgetLink = () => {
    return (
        <p>
            <Link to="/pw-forget">Forgot Password?</Link>
        </p>
    );
}


export { PasswordForgetForm, PasswordForgetLink };
export default PasswordForget;