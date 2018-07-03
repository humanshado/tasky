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
                    : <div>
                        <h3>Login Page</h3>
                        <LogInForm
                            history={history}
                            match={match}
                            location={location}
                        />
                        <PasswordForgetLink />
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
export default LogIn;