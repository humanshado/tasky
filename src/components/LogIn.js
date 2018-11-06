import React, { Component } from 'react';
import { auth } from '../firebase';
import { AuthUserContext } from '../App';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import * as routes from '../constants/routes';

//Login component
class LogIn extends Component {

    render(){
        console.log('props in LogIn', this.props);
        const { history, match, location } = this.props;
        return (<AuthUserContext.Consumer>
                { authUser =>
                    authUser
                    ? history.push(routes.USER_HOME)
                    : <div className='login-page'>
                        <div className='login-form'>
                            <LogInForm
                                history={history}
                                match={match}
                                location={location}
                            />
                        </div>
                        <SignUpLink />
                    </div>
                }
            </AuthUserContext.Consumer>
        );
    }
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

    handleRedirect = () => {
        this.props.toggleRedirect();
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        auth.doLogInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    email: '',
                    password: ''
                });
            }).catch(error => this.setState({ error }))
    }

    render() {
        console.log('props in LogInForm ', this.props);

        const { email, password, error } = this.state;
        const isInvalid = email === '' || password === '';

        return (
            <div>
                <h3>Log In</h3>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleInput}
                            placeholder="user email" />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleInput}
                            placeholder="password" />
                    </div>
                    <button type="submit" disabled={isInvalid}>Log In</button>
                    <button type="cancel">Cancel</button>
                </form>
                {error && <p>{error.message}</p>}
                <PasswordForgetLink />
            </div>
        )
    }
}

//exports
export { LogInForm };
export default LogIn;