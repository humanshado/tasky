import React, { Component } from 'react';
import base from './base';
import _ from 'lodash';
import update from 'immutability-helper';
import SideNav from './components/SideNav';
import CardList from './components/CardList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: {}
    }

    const dataContext = React.createContext(Object.values(this.state.data));
  }

  componentDidMount() {
    this.actionsRef = base.syncState(`actions`, {
      context: this,
      state: 'data'
    })
  }

  componentWillUnmount(){
    console.log('Unmounting...');
    base.removeBinding(this.actionsRef);
  }

  removeCard = (cardId) => {
    base.fetch('actions', {
      context: this,
    }).then((res) => {
      res = Object.values(res).filter((d) => d.id !== cardId );
      this.setState({ data: res });
    }).catch(error => console.log(error));
  }

  updateTasksList = (cardId, newCard) => {
    console.log('newCard', newCard);
    console.log('id newCard', cardId);

    base.fetch('actions', {
      context: this,
    }).then((res) => {
      let newData = Object.assign({}, res, _.mapKeys((newCard), 'id'));  
      this.setState({ data: newData  });
    }).catch(error => console.log(error));
  }

  render() {
    const data  = Object.values(this.state.data);

    return (
      <div className="App">
          <SideNav />
          <CardList
            listId="todo"
            title="To Do"
            cards={data.filter(card => card.status === "todo")}
            removeCard={this.removeCard}
            updateTasksList={this.updateTasksList} />
          <CardList
            listId="on-going"
            title="On Going"
            cards={data.filter(card => card.status === "on-going")}
            removeCard={this.removeCard}
            updateTasksList={this.updateTasksList} />
          <CardList
            listId="completed"
            title="Completed"
            cards={data.filter(card => card.status === "completed")}
            removeCard={this.removeCard} 
            updateTasksList={this.updateTasksList}/>
      </div>
    );
  }
}

export default App;
