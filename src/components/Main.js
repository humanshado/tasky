import React, { Component } from 'react';
import SideNav from './SideNav';
import CardList from './CardList';

class Main extends Component {
    
    render () {
        if (this.props) {
            console.log('Props in Main ', this.props);
        }
        return (
            <div className="main">
                <SideNav />
                <CardList
                    listId="todo"
                    title="To Do"
                    cards={this.props.data.filter(card => card.status === "todo")}
                />
                <CardList
                    listId="on-going"
                    title="On Going"
                    cards={this.props.data.filter(card => card.status === "on-going")}
                />
                <CardList
                    listId="completed"
                    title="Completed"
                    cards={this.props.data.filter(card => card.status === "completed")}
                />
            </div>
        )
    }
}

export default Main;