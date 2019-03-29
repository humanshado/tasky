import React, { Component } from 'react';
import { db, auth, firebase } from './firebase';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
//import _ from 'lodash';
import { getDefaultData } from './data';
import SideNav from './components/SideNav';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import PasswordForget from './components/PasswordForget';
import UserHome from './components/UserHome';
import UserAccount from './components/UserAccount';
import NotFound  from './components/NotFound';
import './App.css';
import * as routes from './constants/routes';

//AuthUser context
export const AuthUserContext = React.createContext();

//App component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        datacards: [],
        authUser: null,
        name: ''
    }
  }

  componentDidMount = () => {
    this.authListener = firebase.auth.onAuthStateChanged(authUser => {
        if(authUser){
            console.log('authUser in App.js componentDidMount', authUser)
            try {
                this.setState({ authUser })
                //update user profile
                authUser.updateProfile({
                    displayName: this.state.name,
                    photoURL: authUser.photoURL
                }).then(() => {
                    //create user in firestore collection 'users' with same uid as authUser
                    return db.collection('users').doc(authUser.uid).set({
                        IsAdmin: false,
                        email: authUser.email,
                        emailVerified: authUser.emailVerified,
                        photoURL: authUser.photoURL,
                        userId: authUser.uid,
                        username: authUser.displayName
                    })
                })
            } catch (error) {
                console.log('Oh No! failed to authenticate', error);
            }
        }else{
            this.setState({ authUser: null });
            //this.props.history.push(routes.LOG_IN);
        }
      })

      console.log('App.js mounted', this.authListener);
      //this.authListener && this.authListener();

      db.collection('cards').onSnapshot(snapshot => {
        let datacards = snapshot.docs.map(c => c.data());
        this.setState({ datacards });
      });
  }

  componentWillUnmount = () => {
      console.log('App.js unmounting', this.authListener);
      this.authListener && this.authListener();
  }

  changeName = (newUsername) => {
      this.setState({ name: newUsername });
    }

  toggleRedirect = () => {
      const { redirect } = this.state;
      this.setState({ redirect: redirect ? false : true });
  }

  //add a blank card
  addCard = () => {
    if(this.state.authUser != null){
        db.collection('cards').add({
              id: '',
              title: '',
              description: '',
              status: 'todo',
              tasks: [],
              notes: '',
              ownerId: '',
              timestamp: Date.now()
        }).then(res => {
            db.collection('cards').doc(res.id).update({id: res.id})
            //this.setState here?
        })

    }else{
        this.props.history.push(routes.LOG_IN);
    }
  }

  updateCard = (id, title, description ) => {
    if(this.state.authUser != null) {
        const { datacards } = this.state;
        //update card in firestore, then ...
        datacards.map(c => {
            if(c.id === id){
                this.setState({ title, description })
            }
        })
    }else{
        this.props.history.push(routes.LOG_IN);
    }
  }

  removeCard = (cardId) => {
    if(this.state.authUser != null) {
        const { datacards } = this.state;
        db.collection('cards').doc(cardId).delete()
        .then(() => {
            let newDatacards = datacards.filter(c => c.id !== cardId);
            this.setState({ datacards: newDatacards });
        })
    }else{
        this.props.history.push(routes.LOG_IN);
    }
  }

  toggleCardStatus = (tasks) => {
    if(this.state.authUser != null) {
        let trueCount = 0;
        let falseCount = 0;

        tasks.map(t => {
            if(t.done === true){
                trueCount++;
            }else if (t.done === false){
                falseCount++;
            }
        })
        if((falseCount === tasks.length) && (trueCount === 0)){
            return 'todo';
        }else if ((falseCount >= 1) && (trueCount >= 1)){
            return 'on-going';
        } else if ((falseCount === 0) && (trueCount === tasks.length)){
            return 'completed';
        }
    }else{
        this.props.history.push(routes.LOG_IN);
    }
  }

  updateTasksList = (cardId, tasks) => {
    if(this.state.authUser != null) {
        const { datacards } = this.state;

        let status = this.toggleCardStatus(tasks);

        db.collection('cards').doc(cardId).update({ tasks, status }).then(() => {
            datacards.map(c => {
                if(c.id === cardId){
                    c.tasks = tasks;
                    c.status = status;
                }
            });
        })
    }else{
        this.props.history.push(routes.LOG_IN);
    }
  }

updateNotes = (cardId, notes) => {
    if(this.state.authUser != null) {
        const { datacards } = this.state;
        db.collection('cards').doc(cardId).update({ notes }).then(() => {
            datacards.map(c => {
                if(c.id === cardId){
                    c.notes = notes;
                }
            })
        })
    }else{
        this.props.history.push(routes.LOG_IN);
    }
}

 crudOps = {
    addCard: this.addCard,
    updateCard: this.updateCard,
    removeCard: this.removeCard,
    updateTasksList: this.updateTasksList,
    toggleRedirect: this.toggleRedirect,
    updateNotes: this.updateNotes
  }

  render() {
    const { datacards, authUser, name, changeName }  = this.state;

    return (
        <AuthUserContext.Provider value={authUser}>
            <div className="App">
                <div id='aside'>
                    <SideNav user={authUser}/>
                </div>
                <div id='main'>
                    <Switch>
                        <Route exact path={routes.HOME} render={(props) => <Home cards={datacards} crudOps={this.crudOps} {...props}/>}/>
                        <Route exact path={routes.SIGN_UP} render={(props) => <SignUp changeName={this.changeName} {...props}/>} />
                        <Route exact path={routes.LOG_IN} render={(props) => <LogIn {...props}/>}/>
                        <Route exact path={routes.USER_HOME} render={(props) => <UserHome user={authUser} {...props}/> }/>
                        <Route exact path={routes.USER_ACCOUNT} render={(props) => <UserAccount user={authUser} {...props}/> }/>
                        <Route exact path={routes.PASSWORD_FORGET} render={(props) => <PasswordForget {...props}/>} />
                        <Redirect from="/home" to="/" />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </AuthUserContext.Provider>

    );
  }
}

export default withRouter(App);
