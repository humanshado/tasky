import React, { Component } from 'react';
import CardList from './CardList';

class Main extends Component {
    
    render () {
        if (this.props) {
            console.log('Props in Main ', this.props);
        }
        return (
            <div className="main">
                <div className="main-nav">
                    <h3>Navigation here ...</h3>
                </div>
                <CardList
                    id='todo'
                    title="To Do"
                    cards={this.props.data.filter(card => card.status === "todo")}
                />
                <CardList
                    id='ongoing'
                    title="On Going"
                    cards={this.props.data.filter(card => card.status === "on-going")}
                />
                <CardList
                    id='completed'
                    title="Completed"
                    cards={this.props.data.filter(card => card.status === "completed")}
                />
            </div>
        )
    }
}

export default Main;