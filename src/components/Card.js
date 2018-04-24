import React, { Component } from 'react';
import Tasks from './Tasks';


class Card extends Component {
    
    render () {
        console.log('props in card ', this.props);
        return (
            <div className="card" style={this.props.listId === 'completed' ? { backgroundColor: '#B9C7D1' } : null}>
                <h3>{this.props.title}</h3>
                <hr />
                <div className="card-details">
                    {this.props.description}
                <Tasks
                    listId={this.props.listId}
                    cardId={this.props.id}
                    tasks={this.props.tasks || []} />
                </div>
                    <hr />
                <p>Card Move Options ...</p> 
            </div>
        )
    }
}

export default Card;