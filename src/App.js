import React, { Component } from 'react';
import Main from './components/Main';
import { getDefaultData } from './data';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: getDefaultData()
    }
  }
  
  render() {
    return (
      <div className="App">
        <Main data={this.state.data}/>
      </div>
    );
  }
}

export default App;
