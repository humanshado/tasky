import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import { SignUpLink } from './SignUp';
import * as routes from '../constants/routes';

//Login component
const LogIn = ({ history }) => {
    return (
        <div>
            <h3>Login Page</h3>
            <LogInForm history={history} />
            <SignUpLink />
        </div>
    )
}

//Login Form
class LogInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
        const { email, password, error } = this.state;
        const { history } = this.props;

        auth.doLogInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    email: '',
                    password: ''
                })
                history.push(routes.HOME);
            }).catch(error => this.setState({ error }))
    }

    render() {
        const { email, password, error } = this.state;
        const isInvalid = email === '' || password === '';
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleInput}
                        placeholder="user email" />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleInput}
                        placeholder="password" />
                    <hr />
                    <button type="submit" disabled={isInvalid}>Sign Up</button>
                    {error && <p>{error.message}</p>}
                </form>
            </div>
        )
    }
}

//exports
export { LogInForm };
export default withRouter(LogIn);