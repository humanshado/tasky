import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

//signup component
const SignUp = ({ history }) => {
    return (
        <div>
            <h3>SignUp Page</h3>
            <SignUpForm history={history}/>
        </div>
    )
}

//signup Form
class SignUpForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
            error: null,
            toHome: false
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password1, password2, error } = this.state;

        auth.doCreateUserWithEmailAndPassword(email, password1)
            .then((authUser) => {
                console.log('authUser signup ', authUser);
                this.setState({
                    username: '',
                    email: '',
                    password1: '',
                    password2: '',
                    toHome: true
                })
            }).catch(error => this.setState({ error }))
    }
    
    render () {
        const { username, password1, password2, email, error } = this.state;
        const isInvalid = password1 !== password2 || password1 === '' || password2 === '' || email === '';
        
        if (this.state.toHome === true) {
            this.props.history.push(routes.HOME);
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        name="username"
                        value={username}
                        onChange={this.handleInput}
                        placeholder="full name"/>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleInput}
                        placeholder="user email"/>
                    <input 
                        type="password" 
                        name="password1" 
                        value={password1}
                        onChange={this.handleInput}
                        placeholder="password"/>
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={this.handleInput}
                        placeholder="confirm password"/>
                    <hr />
                    <button type="submit" disabled={isInvalid}>Sign Up</button>
                    {error && <p>{error.message}</p>}
                </form>
            </div>
        )
    }
}

//signup Link
const SignUpLink = () => {
    return (
        <p>
           Create an account, if you don't have one
            <Link to={routes.SIGN_UP}> Sign Up</Link>
        </p>
    )
}

//exports
export { SignUpForm, SignUpLink };
export default withRouter(SignUp);