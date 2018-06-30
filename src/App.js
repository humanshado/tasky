import React, { Component } from 'react';
import { db, firebase } from './firebase';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
//import _ from 'lodash';
import SideNav from './components/SideNav';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import PasswordForget from './components/PasswordForget';
import Home from './components/Home';
import UserAccount from './components/UserAccount';
import './App.css';
import * as routes from './constants/routes';

//AuthUser context
 export const AuthUserContext = React.createContext(null);
  
//App component
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        datacards: [],
        authUser: null
    }
  }

  componentDidMount = () => {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null })
      });

      db.collection('cards').onSnapshot(snapshot => {
        const datacards = snapshot.docs.map(c => c.data());
        this.setState({ datacards });
      });
  }

  addCard = () => {
    db.collection('cards').add({
          id: '',
          title: '',
          description: '',
          status: 'todo',
          tasks: [],
          timestamp: Date.now()
    }).then(res => {
        db.collection('cards').doc(res.id).update({id: res.id})
    })
  }

  updateCard = (id, title, description ) => {
    const { datacards } = this.state;
    datacards.map(c => {
        if(c.id === id){
            this.setState({ title, description })
        }
    })
  }

  removeCard = (cardId) => {
    const { datacards } = this.state;
    db.collection('cards').doc(cardId).delete()
      .then(() => {
        let newDatacards = datacards.filter(c => c.id !== cardId);
        this.setState({ datacards: newDatacards });
      })
  }

  updateTasksList = (cardId, tasks) => {
    const { datacards } = this.state;
    db.collection('cards').doc(cardId).update({ tasks }).then(() => {
        datacards.map(c => {
            if(c.id === cardId){
                c.tasks = tasks;
            }
        });
    })
  }

  render() {
    const { datacards, authUser }  = this.state;

    console.log('state datacards ', datacards);
    console.log('authUser in App.js ', authUser);

    return (
      <Router>
        <AuthUserContext.Provider value={authUser}>
            <div className="App">
                <SideNav /> 
                <Route exact path={routes.LANDING} 
                        component={() => <Landing 
                                              cards={datacards}
                                              addCard={this.addCard}
                                              updateCard={this.updateCard}
                                              removeCard={this.removeCard}
                                              updateTasksList={this.updateTasksList}/>} 
                                              />

                <Route exact path={routes.SIGN_UP} component={() => <SignUp />} />
                <Route exact path={routes.LOG_IN} component={() => <LogIn />} />
                <Route exact path={routes.HOME} component={() => <Home /> }/>
                <Route exact path={routes.USER_ACCOUNT} component={() => <UserAccount /> } />
                <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForget />} />
            </div>
        </AuthUserContext.Provider>
      </Router>
    );
  }
}

export default App;
