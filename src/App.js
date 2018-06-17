import React, { Component } from 'react';
import { db } from './base';
//import _ from 'lodash';
import SideNav from './components/SideNav';
import CardList from './components/CardList';
import './App.css';

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
      </div>
    );
  }
}

export default App;
