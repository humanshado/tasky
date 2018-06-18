import React, { Component } from 'react';
import { db } from './base';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import _ from 'lodash';

import SideNav from './components/SideNav';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import PasswordForget from './components/PasswordForget';
import Home from './components/Home';
import UserAccount from './components/UserAccount';
import CardList from './components/CardList';
import './App.css';

import * as routes from './constants/routes';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      datacards: []
    }
  }

  componentDidMount = () => {
    db.collection('cards').onSnapshot(snapshot => {
      const datacards = snapshot.docs.map(c => c.data());
      this.setState({ datacards });
    })
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
    const cards  = this.state.datacards;
    console.log('state datacards ', cards);

    return (
      <Router>
        <div className="App">
            <SideNav />
            <CardList
              listId="todo"
              title="To Do"
              cards={cards.filter(card => card.status === "todo")}
              addCard={this.addCard}
              updateCard={this.updateCard}
              removeCard={this.removeCard}
              updateTasksList={this.updateTasksList} />
            <CardList
              listId="on-going"
              title="On Going"
              cards={cards.filter(card => card.status === "on-going")}
              updateCard={this.updateCard}
              removeCard={this.removeCard}
              updateTasksList={this.updateTasksList} />
            <CardList
              listId="completed"
              title="Completed"
              cards={cards.filter(card => card.status === "completed")}
              updateCard={this.updateCard}
              removeCard={this.removeCard} 
              updateTasksList={this.updateTasksList}/>

          <Route
            exact path={routes.LANDING}
            component={() => <Landing />}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUp />}
          />
          <Route
            exact path={routes.LOG_IN}
            component={() => <LogIn />}
          />
          <Route
            exact path={routes.HOME}
            component={() => <Home />}
          />
          <Route
            exact path={routes.USER_ACCOUNT}
            component={() => <UserAccount />}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForget />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
