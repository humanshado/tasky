import React, { Component } from 'react';
import { db } from './base';
import _ from 'lodash';
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
    let newDatacards = [];
     db.collection('cards').get().then(snapshot => {
       snapshot.docs.map(doc => {
          let item = doc.data();
          item.id = doc.id;
          item.timestamp = Date.now();
          db.collection('cards').doc(item.id).update({
              id: item.id,
              timestamp: item.timestamp
          });
          newDatacards.push(item);
       });

       this.setState({ datacards: newDatacards });
     });     
  }

  addCard = () => {
    console.log('Adding new card to the list ...');
    db.collection('cards').add({
          id: '',
          title: '',
          description: '',
          status: 'todo',
          tasks: [],
          timestamp: Date.now()
    }).then(res => {
        console.log('newcard from firestore ', res.id);
        db.collection('cards').doc(res.id).update({id: res.id}).then(() =>{
        const { datacards } = this.state;
        this.setState({
            datacards: datacards.concat({ 
              id: res.id, 
              title: '', 
              description: '', 
              status: 'todo', 
              tasks: []})
        }) 
      });
    })
  }

  updateCard = (id, title, description ) => {
    console.log('update card in App.js', id);
    const { datacards } = this.state;
    datacards.map(c => {
        if(c.id === id){
            this.setState({ title, description })
        }
    })
  }

  removeCard = (cardId) => {
    const { datacards } = this.state;
    console.log('cardId to remove in App.js ', cardId);
    db.collection('cards').doc(cardId).delete()
      .then(() => {
        let newDatacards = datacards.filter(c => c.id !== cardId);
        this.setState({ datacards: newDatacards });
      })
  }

  updateTasksList = (cardId, newCard) => {
    console.log('newCard', newCard);
    console.log('id newCard', cardId);

    // base.fetch('actions', {
    //   context: this,
    // }).then((res) => {
    //   let newData = Object.assign({}, res, _.mapKeys((newCard), 'id'));  
    //   this.setState({ data: newData  });
    // }).catch(error => console.log(error));
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
