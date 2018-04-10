import React, { Component } from 'react'
import Card from './Card';

class CardList extends Component {
    render () {
        let cards = this.props.cards.map((card) => {
            return <Card id={card.id}
                title={<strong>{card.title}</strong>}
                description={card.description}
                tasks={card.tasks}
                key={card.id} />
        });
        return (
            <div className="list">
                <h2>{this.props.title}</h2>
                {cards}
            </div>
        )
    }
}

export default CardList;