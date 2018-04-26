import React, { Component } from 'react';
import _ from 'lodash';
import base from './base';
import Main from './components/Main';
//import AddCardForm from './components/AddCardForm';
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
      state: 'data'
    })
  }

  componentWillUnmount(){
    console.log('Unmounting...');
    base.removeBinding(this.actionsRef);
  }

  removeCard(id) {
    console.log('cardId in removeCard ', id);
    var newData = _.values(this.state.data);
    newData.splice(id, 1);
    this.setState({
      data: newData
    });
  }

  
  render() {
    return (
      <div className="App">
        <Main 
          data={_.values(this.state.data)}
          removeCard={this.removeCard.bind(this)}/>
      </div>
    );
  }
}

export default App;
