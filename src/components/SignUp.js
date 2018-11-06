import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

//signup component
const SignUp = ({ history, changeName }) => {
        return (
            <div className='signup-page'>
                <div className="signup-form">
                    <SignUpForm history={history} changeName={changeName}/>
                </div>
            </div>
        );
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

    handleChangeUsername = (username) => {
        console.log('username in handle', username)
        this.props.changeName(username);
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password1, password2 } = this.state;

        //update username in App.js
        await this.handleChangeUsername(username)

        auth.doCreateUserWithEmailAndPassword(email, password1).then(() => {
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
        console.log('Props in signup', this.props);
        const { username, password1, password2, email, error } = this.state;
        const isInvalid = password1 !== password2 || password1 === '' || password2 === '' || email === '';

        if (this.state.toHome === true) {
            this.props.history.push(routes.HOME);
        }

        return (
            <div>
                <h3>Sign Up</h3>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleInput}
                            placeholder="full name"
                            autoFocus={true} />
                    </div>
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
                            name="password1"
                            value={password1}
                            onChange={this.handleInput}
                            placeholder="password" />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={this.handleInput}
                            placeholder="confirm password" />
                    </div>
                    <button type="submit" disabled={isInvalid}>Sign Up</button>
                    <button type="cancel">Cancel</button>
                </form>
                {error && <p>{error.message}</p>}
            </div>
        )
    }
}

//signup Link
const SignUpLink = () => {
    return (
        <p className='signup-link'>
           Create an account, if you don't have one
            <Link to={routes.SIGN_UP}> Sign Up</Link>
        </p>
    )
}

//exports
export { SignUpForm, SignUpLink };
export default SignUp;