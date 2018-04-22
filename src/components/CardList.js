import React, { Component } from 'react'
import Card from './Card';

class CardList extends Component {
    render () {
        console.log('props in cardlist ', this.props);
        let cards = this.props.cards.map((card) => {
            return <Card id={card.id}
                title={<strong>{card.title}</strong>}
                description={card.description}
                tasks={card.tasks}
                key={card.id} 
                listId={this.props.listId} />
        });
        return (
            <div className="list" style={this.props.listId === 'completed' ? { backgroundColor: '#003459', borderColor: '#7390A4' } : null }>
                <div>
                    <h2 style={this.props.listId === 'completed' ? { color: '#7390A4'} : null}>{this.props.title}</h2>
                    {cards}
                </div> <br />
                {this.props.listId === "todo" && 
                    <span id="add-icon">
                        <i className="fas fa-plus-circle"></i>
                    </span>
                }
            </div>
        )
    }
}

export default CardList;