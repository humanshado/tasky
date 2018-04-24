import React, { Component } from 'react';
import base from '../base';
import uuidv4 from 'uuid/v4';
import Card from './Card';
import AddCardForm from './AddCardForm';


class CardList extends Component {
    
    addCard = async () => {
        console.log('Adding new card to the list ...');
        let cardId = await uuidv4();
        base.post(`actions/${cardId}`, {
            data: {
                id: cardId,
                title: '',
                description: '',
                status: 'todo',
                tasks: ''
            }
        }).then(res => {
            console.log('New card added ...');
        }).catch(error => console.log(error));
    }

    updateCard = async (cardId, { title, description }) => {
        console.log('Updating card ...');
        base.update(`actions/${cardId}`, {
            data: {
                title,
                description
            }
        }).then(res => {
            console.log('Card updated ...');
        }).catch(error => console.log(error));
    }

    render() {
        console.log('props in cardlist ', this.props);

        return (
            <div className="list" style={this.props.listId === 'completed' ? { backgroundColor: '#003459', borderColor: '#7390A4' } : null}>
                <div>
                    <h2 style={this.props.listId === 'completed' ? { color: '#7390A4' } : null}>{this.props.title}</h2>
                    {this.props.cards.map((card) => {
                        return card.title === '' && card.description === ''
                            ? <AddCardForm 
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                tasks={card.tasks}
                                key={card.id}
                                listId={this.props.listId}
                                updateCard={this.updateCard}/>
                            :<Card 
                                id={card.id}
                                title={<strong>{card.title}</strong>}
                                description={card.description}
                                tasks={card.tasks}
                                key={card.id}
                                listId={this.props.listId} />
                    })}
                </div> 
                <br />
                {this.props.listId === "todo" &&
                    <span id="add-icon" onClick={() => this.addCard()}>
                        <i className="fas fa-plus-circle"></i>
                    </span>
                }
            </div>
        )
    }
}

export default CardList;