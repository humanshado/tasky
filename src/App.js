import React, { Component } from 'react';
import _ from 'lodash';
import base from './base';
import SideNav from './components/SideNav';
import CardList from './components/CardList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.actionsRef = base.syncState(`actions`, {
      context: this,
      state: 'data',
      asArray: true
    })
  }

  componentWillUnmount(){
    console.log('Unmounting...');
    base.removeBinding(this.actionsRef);
  }

  removeCard = (cardId) => {
    base.fetch('actions', {
      context: this,
      asArray: true
    }).then((res) => {
      res = res.filter((d) => d.id !== cardId );
      this.setState({ data: res });
    }).catch(error => console.log(error));
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <div className="main">
          <SideNav />
          <CardList
            listId="todo"
            title="To Do"
            cards={data.filter(card => card.status === "todo")}
            removeCard={this.removeCard} />
          <CardList
            listId="on-going"
            title="On Going"
            cards={data.filter(card => card.status === "on-going")}
            removeCard={this.removeCard} />
          <CardList
            listId="completed"
            title="Completed"
            cards={data.filter(card => card.status === "completed")}
            removeCard={this.removeCard} />
        </div>
      </div>
    );
  }
}

export default App;
