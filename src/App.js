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
  
  render() {
    return (
      <div className="App">
        <Main data={_.values(this.state.data)}/>
      </div>
    );
  }
}

export default App;
