import React, { Component } from 'react';
import SideNav from './SideNav';
import CardList from './CardList';

class Main extends Component {

    handleRemoveCard = (cardId) => {
        console.log('cardId in handleRemoveCard ', cardId);
        this.props.removeCard(cardId);
    }
    
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
                    handleRemoveCard={this.handleRemoveCard.bind(this)}/>
                <CardList
                    listId="on-going"
                    title="On Going"
                    cards={this.props.data.filter(card => card.status === "on-going")}
                    handleRemoveCard={ this.handleRemoveCard.bind(this) }/>
                <CardList
                    listId="completed"
                    title="Completed"
                    cards={this.props.data.filter(card => card.status === "completed")}
                    handleRemoveCard={this.handleRemoveCard.bind(this)}/>
            </div>
        )
    }
}

export default Main;