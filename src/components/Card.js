import React, { Component } from 'react';

class Card extends Component {
    render () {
        return (
            <div className="card">
                <h3>{this.props.title}</h3>
                <hr />
                <div className="card-details">
                    {this.props.description}
                </div>
            </div>
        )
    }
}

export default Card;