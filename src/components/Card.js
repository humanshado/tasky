import React, { Component } from 'react';
import Tasks from './Tasks';

class Card extends Component {
    render () {
        console.log('props in card ', this.props);
        return (
            <div className="card">
                <h3>{this.props.title}</h3>
                <hr />
                <div className="card-details">
                    {this.props.description}
                    <Tasks cardId={this.props.id} tasks={this.props.tasks || []}/>
                </div>
            </div>
        )
    }
}

export default Card;